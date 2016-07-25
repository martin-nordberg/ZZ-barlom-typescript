import { BarlomTokenStream } from './BarlomTokenStream';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { AstCompilationUnit } from '../../ast/src/AstCompilationUnit';
import { AstUseDeclaration } from '../../ast/src/AstUseDeclaration';
import { AstPath } from '../../ast/src/AstPath';
import { AstAnnotation } from '../../ast/src/AstAnnotation';
import { AstNamedAnnotation } from '../../ast/src/AstNamedAnnotation';
import { AstSummaryDocAnnotation } from '../../ast/src/AstSummaryDocAnnotation';
import { AstCodeElement } from '../../ast/src/AstCodeElement';
import { AstContext } from '../../ast/src/AstContext';
import { ICoreParser } from '../../parserspi/src/ICoreParser';
import { SymbolParserPlugin } from '../../elements/src/symbol/SymbolParserPlugin';
import { ICodeElementParserPlugin } from '../../parserspi/src/ICodeElementParserPlugin';
import { EnumerationTypeParserPlugin } from '../../elements/src/enumerationtype/EnumerationTypeParserPlugin';


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

  public parseCodeElement() : AstCodeElement {

    let leadingAnnotations = this.parseLeadingAnnotations();

    let tagToken = this._tokenStream.consumeExpectedToken( BarlomTokenType.Tag );

    let codeElementParser : ICodeElementParserPlugin = this._codeElementParsers[tagToken.text];

    return codeElementParser.parseCodeElement( this._tokenStream, this, leadingAnnotations, tagToken );

  }

  public parseCodeElements() : AstCodeElement[] {

    let result : AstCodeElement[] = [];

    while ( !this._tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, '#end' ) &&
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
   * @returns {Array<AstAnnotation>}
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
          break;

        default:
          // TODO: error for unexpected token
          break;

      }

    }

    return result;

  }

  /**
   * Parses a optional context declaration.
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

  private _registerCodeElementParser( parserPlugin : ICodeElementParserPlugin ) {

    let tagText = parserPlugin.getTagText();

    // TODO: register the tag in the lexer (get rid of leading '#')

    this._codeElementParsers[tagText] = parserPlugin;

  }

  private _codeElementParsers : Object;

  private _tokenStream : BarlomTokenStream;

}
