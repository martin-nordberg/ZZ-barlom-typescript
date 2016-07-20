import { BarlomTokenStream } from './BarlomTokenStream';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { AstCompilationUnit } from '../../ast/src/AstCompilationUnit';
import { AstUseDeclaration } from '../../ast/src/AstUseDeclaration';
import { AstPath } from '../../ast/src/AstPath';
import { AstAnnotation } from '../../ast/src/AstAnnotation';
import { AstNamedAnnotation } from '../../ast/src/AstNamedAnnotation';
import { AstSummaryDocAnnotation } from '../../ast/src/AstSummaryDocAnnotation';
import { AstCodeElement } from '../../ast/src/AstCodeElement';
import { AstNamespacedEnumerationType } from '../../ast/src/AstNamespacedEnumeration';


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

    let result = new AstCompilationUnit( this._tokenStream.lookAhead1Token() );

    // use declarations
    while ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.USE ) ) {
      result.useDeclarations.push( this._parseUseDeclaration() );
    }

    // namespaced element definition
    let leadingAnnotations = this._parseLeadingAnnotations();

    result.definition = this._parseNamespacedDefinition( leadingAnnotations );

    // end of file
    this._tokenStream.consumeExpectedToken( BarlomTokenType.EOF );

    return result;

  }

  /**
   * Parses the contents of an enumeration type.
   * @param enumerationType the enumeration type whose contents are to be parsed.
   * @returns {AstNamespacedEnumerationType} the input enumeration type with contents filled in.
   * @private
   */
  private _parseEnumerationTypeContentsInto( enumerationType : AstNamespacedEnumerationType ) {

    // TODO ...

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
          break;

        default:
          return result;

      }

    }

  }

  /**
   * Parses a code element definition that is at compilation unit scope.
   * @param leadingAnnotations the leading annotations that have already been parsed for the code element.
   * @private
   */
  private _parseNamespacedDefinition( leadingAnnotations : AstAnnotation[] ) : AstCodeElement {

    let keyToken = this._tokenStream.lookAhead1Token();

    switch ( keyToken.tokenType ) {
      case BarlomTokenType.ENUMERATION:
        return this._parseNamespacedEnumerationType( leadingAnnotations );

    }

    return null;
  }

  private _parseNamespacedEnumerationType( leadingAnnotations : AstAnnotation[] ) : AstNamespacedEnumerationType {

    let result = new AstNamespacedEnumerationType( this._tokenStream.consumeBufferedToken(), leadingAnnotations );

    this._tokenStream.consumeExpectedToken( BarlomTokenType.TYPE );

    result.path = this._parsePath();

    result.trailingAnnotations = this._parseTrailingAnnotations();

    this._parseEnumerationTypeContentsInto( result );

    this._tokenStream.consumeExpectedToken( BarlomTokenType.END );

    return result;
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

    let result = new AstUseDeclaration(
        this._tokenStream.consumeBufferedToken(),
        this._parsePath()
    );

    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.AS ) ) {
      result.synonym = this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier );
    }

    return result;

  }

  private _tokenStream : BarlomTokenStream;

}
