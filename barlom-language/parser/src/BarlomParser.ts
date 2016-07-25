import { AstAnnotation } from '../../ast/src/AstAnnotation';
import { AstCodeElement } from '../../ast/src/AstCodeElement';
import { AstCompilationUnit } from '../../ast/src/AstCompilationUnit';
import { AstCodeElementName } from '../../ast/src/AstCodeElementName';
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
    this._isParsingCodeElements = false;

    // TODO: specify the allowed child elements per code element
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
   * Parses the namespace, name, and arguments of a code element path, or just the identifier for its name.
   */
  public parseCodeElementName() : AstCodeElementName {

    let result = new AstCodeElementName( this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier ) );

    while ( !this._isParsingCodeElements && this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.DOT ) ) {

      result.extendPath( this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier ) );

      // TODO: arguments in the path

    }

    return result;

  }

  /**
   * Parses a sequence of code elements terminated by 'end' or EOF.
   * @returns {AstCodeElement[]} the code elements parsed.
   */
  public parseCodeElements() : AstCodeElement[] {

    let result : AstCodeElement[] = [];

    try {

      // TODO: this is a rather clunky way of making nested code element names not be qualified
      this._isParsingCodeElements = true;

      while ( !this._tokenStream.hasLookAhead1Token( BarlomTokenType.END ) &&
              !this._tokenStream.hasLookAhead1Token( BarlomTokenType.EOF ) ) {
        result.push( this.parseCodeElement() );
      }

    }
    finally {
      this._isParsingCodeElements = false;
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

    // code element
    let codeElement = this.parseCodeElement();

    // end of file
    this._tokenStream.consumeExpectedToken( BarlomTokenType.EOF );

    return new AstCompilationUnit( firstToken, useDeclarations, codeElement );

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
   * Parses a use declaration after the "use" keyword has been seen but not yet consumed.
   */
  private _parseUseDeclaration() : AstUseDeclaration {

    let useToken = this._tokenStream.consumeBufferedToken();
    let codeElementName = this.parseCodeElementName();
    let synonym = null;

    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.AS ) ) {
      synonym = this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier );
    }

    return new AstUseDeclaration( useToken, codeElementName, synonym );

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

  private _isParsingCodeElements : boolean;

  private _tokenStream : BarlomTokenStream;

}
