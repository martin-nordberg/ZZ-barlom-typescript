import { BarlomTokenStream } from './BarlomTokenStream';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { AstCompilationUnit } from '../../ast/src/AstCompilationUnit';
import { AstUseDeclaration } from '../../ast/src/AstUseDeclaration';
import { AstPath } from '../../ast/src/AstPath';
import { AstAnnotation } from '../../ast/src/AstAnnotation';
import { AstNamedAnnotation } from '../../ast/src/AstNamedAnnotation';
import { AstSummaryDocAnnotation } from '../../ast/src/AstSummaryDocAnnotation';
import { AstCodeElement } from '../../ast/src/AstCodeElement';
import { AstEnumerationType } from '../../ast/src/AstEnumerationType';
import { AstContext } from '../../ast/src/AstContext';
import { AstSymbol } from '../../ast/src/AstSymbol';


/**
 * Parser for the Barlom language.
 */
export class BarlomParser {

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
    let codeElement = this._parseCodeElement();   // TODO

    // end of file
    this._tokenStream.consumeExpectedToken( BarlomTokenType.EOF );

    return new AstCompilationUnit( firstToken, useDeclarations, context, codeElement );

  }

  private _parseCodeElement() : AstCodeElement {

    let leadingAnnotations = this._parseLeadingAnnotations();

    // TODO: consume an expression of varying kind depending on the look-ahead
    // let enumerationType = this._parseEnumerationType();
    let enumTypeToken = this._tokenStream.consumeExpectedTokenValue( BarlomTokenType.Tag, '#enumeration_type' );

    let identifier = this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier );

    let trailingAnnotations = this._parseTrailingAnnotations();

    let codeElements = this._parseCodeElements();

    this._tokenStream.consumeExpectedTokenValue( BarlomTokenType.Tag, '#end' );

    return new AstEnumerationType( enumTypeToken, identifier, leadingAnnotations, trailingAnnotations, codeElements );

  }

  private _parseCodeElements() : AstCodeElement[] {

    let result : AstCodeElement[] = [];

    while ( !this._tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, '#end' ) ) {
      // TODO: switch on look ahead token
      result.push( this._parseSymbol() );
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

      return new AstContext( contextToken, path);

    }

    return null;

  }

  /**
   * Parses annotations coming before the keyword of a code element.
   * @returns {Array<AstAnnotation>}
   * @private
   */
  private _parseLeadingAnnotations() : AstAnnotation[] {

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

  private _parseSymbol() : AstSymbol {

    let leadingAnnotations = this._parseLeadingAnnotations();

    let symbolToken = this._tokenStream.consumeExpectedTokenValue( BarlomTokenType.Tag, '#symbol' );

    let identifier = this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier );

    let trailingAnnotations = this._parseTrailingAnnotations();

    return new AstSymbol( symbolToken, identifier, leadingAnnotations, trailingAnnotations );
  }

  /**
   * Parses annotations coming after the keyword of a code element.
   * @returns {Array<AstAnnotation>}
   * @private
   */
  private _parseTrailingAnnotations() : AstAnnotation[] {

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

  private _tokenStream : BarlomTokenStream;

}
