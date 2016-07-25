import { AstAnnotation } from '../../ast/src/AstAnnotation';
import { AstCodeElement } from '../../ast/src/AstCodeElement';
import { AstCompilationUnit } from '../../ast/src/AstCompilationUnit';
import { AstContext } from '../../ast/src/AstContext';
import { AstPath } from '../../ast/src/AstPath';
import { AstNamedAnnotation } from '../../ast/src/AstNamedAnnotation';
import { AstSummaryDocAnnotation } from '../../ast/src/AstSummaryDocAnnotation';
import { AstUseDeclaration } from '../../ast/src/AstUseDeclaration';
import { BarlomTokenStream } from './BarlomTokenStream';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { EnumerationTypeParserPlugin } from '../../elements/src/enumerationtype/EnumerationTypeParserPlugin';
import { ICodeElementParserPlugin } from '../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../parserspi/src/ICoreParser';
import { SymbolParserPlugin } from '../../elements/src/symbol/SymbolParserPlugin';


/**
 * Parser for the Barlom language.
 */
export class BarlomParser implements ICoreParser {

  /**
   * Constructs a new parser for the given code that came from the given file.
   * @param code the source code to parse.
   * @param fileName the name of the source file.
   */
  constructor(
      code : string,
      fileName : string
  ) {
    this._tokenStream = new BarlomTokenStream( code, fileName );

    this._codeElementParsers = {};

    this._registerCodeElementParser( new EnumerationTypeParserPlugin() );
    this._registerCodeElementParser( new SymbolParserPlugin() );
  }

  /**
   * Parses one code element. After parsing the leading annotations, chooses the right plugin according to the
   * code element's tag token.
   * @returns {AstCodeElement} the parsed code element.
   */
  public parseCodeElement() : AstCodeElement {

    let leadingAnnotations = this.parseLeadingAnnotations();

    let tagToken = this._tokenStream.consumeExpectedToken( BarlomTokenType.Tag );

    let codeElementParser : ICodeElementParserPlugin = this._codeElementParsers[tagToken.text];

    return codeElementParser.parseCodeElement( this._tokenStream, this, leadingAnnotations, tagToken );

  }

  /**
   * Parses a sequence of code elements terminated by 'end' or EOF.
   * @returns {AstCodeElement[]} the code elements parsed.
   */
  public parseCodeElements() : AstCodeElement[] {

    let result : AstCodeElement[] = [];

    while ( !this._tokenStream.hasLookAhead1Token( BarlomTokenType.END ) &&
            !this._tokenStream.hasLookAhead1Token( BarlomTokenType.EOF ) ) {
      result.push( this.parseCodeElement() );
    }

    return result;
  }

  /**
   * Parses an entire Barlom source file.
   */
  public parseCompilationUnit() : AstCompilationUnit {

    let firstToken = this._tokenStream.lookAhead1Token();

    // use declarations
    let useDeclarations = this._parseUseDeclarations();

    // context
    let context = this._parseContext();

    // code element
    let codeElements = this.parseCodeElements();

    // end of file
    this._tokenStream.consumeExpectedToken( BarlomTokenType.EOF );

    return new AstCompilationUnit( firstToken, useDeclarations, context, codeElements );

  }

  /**
   * Parses annotations coming before the keyword of a code element.
   * @returns {Array<AstAnnotation>}
   * @private
   */
  public parseLeadingAnnotations() : AstAnnotation[] {

    let result : AstAnnotation[] = [];

    while ( true ) {

      let token = this._tokenStream.lookAhead1Token();

      switch ( token.tokenType ) {

        case BarlomTokenType.Documentation:

          // TODO: decide how to distinguish one-line summary from multi-line details
          result.push( new AstSummaryDocAnnotation( this._tokenStream.consumeBufferedToken() ) );
          break;

        case BarlomTokenType.Identifier:

          result.push( new AstNamedAnnotation( this._tokenStream.consumeBufferedToken() ) );

          // TODO: optional arguments

          break;

        default:

          return result;

      }

    }

  }

  /**
   * Parses annotations coming after the keyword of a code element.
   * @returns {Array<AstAnnotation>} the annotations parsed.
   * @private
   */
  public parseTrailingAnnotations() : AstAnnotation[] {

    let result : AstAnnotation[] = [];

    while ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COLON ) ) {

      let token = this._tokenStream.consumeToken();

      switch ( token.tokenType ) {

        case BarlomTokenType.Documentation:
          // TODO: decide how to distinguish one-line summary from multi-line details
          result.push( new AstSummaryDocAnnotation( token ) );
          break;

        case BarlomTokenType.Identifier:
          result.push( new AstNamedAnnotation( token ) );
          // TODO: handle arguments
          break;

        default:
          // TODO: error for unexpected token
          break;

      }

    }

    return result;

  }

  /**
   * Parses an optional context declaration.
   */
  private _parseContext() : AstContext {

    if ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.CONTEXT ) ) {

      let contextToken = this._tokenStream.consumeBufferedToken();
      let path = this._parsePath();

      return new AstContext( contextToken, path );

    }

    return null;

  }

  /**
   * Parses the namespace, name, and arguments of a module path.
   * @private
   */
  private _parsePath() : AstPath {

    let result = new AstPath( this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier ) );

    while ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.DOT ) ) {

      result.extendPath( this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier ) );

      // TODO: arguments in the path

    }

    return result;

  }

  /**
   * Parses a use declaration after the "use" keyword has been seen but not yet consumed.
   */
  private _parseUseDeclaration() : AstUseDeclaration {

    let useToken = this._tokenStream.consumeBufferedToken();
    let path = this._parsePath();
    let synonym = null;

    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.AS ) ) {
      synonym = this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier );
    }

    return new AstUseDeclaration( useToken, path, synonym );

  }

  /**
   * Parses zero or more use declarations.
   */
  private _parseUseDeclarations() : AstUseDeclaration[] {

    let result : AstUseDeclaration[] = [];

    while ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.USE ) ) {
      result.push( this._parseUseDeclaration() );
    }

    return result;

  }

  /**
   * Adds the given plugin to this parser. Registers the plugin's tag for token conversion and plugin activation.
   * @param parserPlugin the plugin to register.
   * @private
   */
  private _registerCodeElementParser( parserPlugin : ICodeElementParserPlugin ) {

    let tagText = parserPlugin.getTagText();

    this._tokenStream.registerTag( tagText );

    this._codeElementParsers[tagText] = parserPlugin;

  }

  private _codeElementParsers : Object;

  private _tokenStream : BarlomTokenStream;

}
