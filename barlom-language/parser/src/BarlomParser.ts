import { BarlomToken } from '../../lexer/src/BarlomToken';
import { BarlomLexer } from '../../lexer/src/BarlomLexer';


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
    this._lexer = new BarlomLexer( code, fileName );
  }

  /**
   * Parses an entire Barlom file.
   */
  public compilationUnit() : void {
    this._lexer.readAllTokens();
  }

  private _lexer : BarlomLexer;

}