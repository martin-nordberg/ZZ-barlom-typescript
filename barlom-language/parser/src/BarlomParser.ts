import { BarlomTokenStream } from './BarlomTokenStream';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { AstCompilationUnit } from '../../ast/src/AstCompilationUnit';
import { AstUseDeclaration } from '../../ast/src/AstUseDeclaration';
import { AstPath } from '../../ast/src/AstPath';


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
      result.childNodes.push( this._parseUseDeclaration() );
    }

    this._tokenStream.consumeExpectedToken( BarlomTokenType.EOF );

    return result;

  }

  /**
   * Parses the namespace, name, and arguments of a module path.
   * @private
   */
  private _parsePath() : AstPath {

    let result = new AstPath( this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier ) );

    while ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.DOT ) ) {

      result.pathEntries.push( this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier ) );

      // TODO: arguments in the path

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
