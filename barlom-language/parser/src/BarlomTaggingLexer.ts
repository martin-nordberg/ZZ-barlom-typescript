import { BarlomLexer } from '../../lexer/src/BarlomLexer';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';

/**
 * Adapter to the Barlom lexer that changes identifiers into tags according to registered language elements.
 */
export class BarlomTaggingLexer {

  /**
   * Constructs a new token stream for the given code that came from the given file.
   * @param code the source code to parse.
   * @param fileName the name of the source file.
   */
  constructor(
      code : string,
      fileName : string
  ) {

    this._lexer = new BarlomLexer( code, fileName );
    this._tags = {};

  }

  /**
   * Reads the next token from the code within this lexer. Converts identifiers to registered tags.
   * @returns {BarlomToken} the next token scanned.
   */
  public readToken() : BarlomToken {

    let result = this._lexer.readToken();

    if ( result.tokenType === BarlomTokenType.Identifier && this._tags[result.text] ) {
      return result.withRevisedTokenType( BarlomTokenType.Tag );
    }

    return result;

  }

  /**
   * Treats the given identifier text as a tag instead.
   * @param tagText the identifier text to make into a tag.
   */
  public registerTag( tagText : string ) {
    this._tags[tagText] = true;
  }

  private _lexer : BarlomLexer;

  private _tags : Object = {};

}
