import { BarlomTaggingLexer } from './BarlomTaggingLexer';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { ITokenStream } from '../../parserspi/src/ITokenStream';


const BUFFER_SIZE : number = 5;

/**
 * Buffered token stream for Barlom tokens from the Barlom lexer.
 */
export class BarlomTokenStream
  implements ITokenStream {

  /**
   * Constructs a new token stream for the given code that came from the given file.
   * @param code the source code to parse.
   * @param fileName the name of the source file.
   */
  constructor(
      code : string,
      fileName : string
  ) {

    this._lexer = new BarlomTaggingLexer( code, fileName );

    this._tokenBuffer = [];

    this._next = 0;
    this._last = 0;

  }

  /**
   * Determines whether the next token in the input has the given token type. If so, consumes it.
   * @param tokenType the token type to look for.
   * @returns {boolean}
   */
  public advanceOverLookAhead1Token( tokenType : BarlomTokenType ) : boolean {

    this._readNextTokenIfNotBuffered();

    // Check the token type.
    if ( this._tokenBuffer[this._next].tokenType === tokenType ) {
      this._next = ( this._next + 1 ) % BUFFER_SIZE;
      return true;
    }

    return false;

  }

  /**
   * Returns the next token in the input when it is known to have been already buffered (from prior hasLookAhead...
   * call).
   * @returns {boolean}
   */
  public consumeBufferedToken() : BarlomToken {

    // Read the token.
    const result = this._tokenBuffer[this._next];

    // Advance the index.
    this._next = ( this._next + 1 ) % BUFFER_SIZE;

    return result;

  }

  /**
   * Determines whether the next token in the input has the given token type. If so, consumes it.
   * @param tokenType the token type to look for.
   * @returns {boolean}
   */
  public consumeExpectedToken( tokenType : BarlomTokenType ) : BarlomToken {

    this._readNextTokenIfNotBuffered();

    // Check the token type.
    if ( this._tokenBuffer[this._next].tokenType !== tokenType ) {
      throw new Error(
          "Expected " + BarlomTokenType[tokenType] +
          "; found " + BarlomTokenType[this._tokenBuffer[this._next].tokenType] +
          " '" + this._tokenBuffer[this._next].text + "' at (" +
          this._tokenBuffer[this._next].line + "," +
          this._tokenBuffer[this._next].column + ")."
      );
    }

    return this.consumeBufferedToken();

  }

  /**
   * Determines whether the next token in the input has the given token type and value. If so, consumes it.
   * @param tokenType the token type to look for.
   * @param tokenText the text value of the token to look for.
   * @returns {boolean}
   */
  public consumeExpectedTokenValue( tokenType : BarlomTokenType, tokenText : string ) : BarlomToken {

    this._readNextTokenIfNotBuffered();

    // Check the token type.
    if ( this._tokenBuffer[this._next].tokenType !== tokenType || this._tokenBuffer[this._next].text !== tokenText ) {
      throw new Error(
          "Expected " + BarlomTokenType[tokenType] + " '" + tokenText +
          "'; found " + BarlomTokenType[this._tokenBuffer[this._next].tokenType] +
          " '" + this._tokenBuffer[this._next].text + "' at (" +
          this._tokenBuffer[this._next].line + "," +
          this._tokenBuffer[this._next].column + ")."
      );
    }

    return this.consumeBufferedToken();

  }

  /**
   * Returns the next token in the input.
   * @returns {boolean}
   */
  public consumeToken() : BarlomToken {

    this._readNextTokenIfNotBuffered();

    return this.consumeBufferedToken();

  }

  /**
   * Determines whether the next token in the input has the given token type.
   * @param tokenType the token type to look for.
   * @returns {boolean}
   */
  public hasLookAhead1Token( tokenType : BarlomTokenType ) : boolean {

    this._readNextTokenIfNotBuffered();

    // check the token type
    return this._tokenBuffer[this._next].tokenType === tokenType;

  }

  /**
   * Determines whether the next token in the input has the given token type and text value.
   * @param tokenType the token type to look for.
   * @param tokenText the text value of the expected token.
   * @returns {boolean}
   */
  public hasLookAhead1TokenValue( tokenType : BarlomTokenType, tokenText : string ) : boolean {

    this._readNextTokenIfNotBuffered();

    // Check the token type and text.
    return this._tokenBuffer[this._next].tokenType === tokenType &&
        this._tokenBuffer[this._next].text === tokenText;

  }

  /**
   * Returns the next token in the input without consuming it.
   * @returns {boolean}
   */
  public lookAhead1Token() : BarlomToken {

    this._readNextTokenIfNotBuffered();

    return this._tokenBuffer[this._next];

  }

  /**
   * Returns the next token in the input without consuming it.
   * @returns {boolean}
   */
  public lookAhead2Token() : BarlomToken {

    // Read the next two tokens if not already buffered.
    while ( this._last <= this._next + 1 ) {
      this._tokenBuffer[this._last] = this._lexer.readToken();
      this._last = ( this._last + 1 ) % BUFFER_SIZE;
    }

    return this._tokenBuffer[this._next + 1];

  }

  /**
   * Registers the given identifier as a language tag.
   * @param tagText the tag text to map.
   */
  public registerTag( tagText : string ) {
    this._lexer.registerTag( tagText );
  }

  /**
   * Reads the next token into the buffer if not already there.
   * @private
   */
  private _readNextTokenIfNotBuffered() {

    if ( this._last === this._next ) {
      this._tokenBuffer[this._last] = this._lexer.readToken();
      this._last = ( this._last + 1 ) % BUFFER_SIZE;
    }

  }

  private _last : number;

  private _lexer : BarlomTaggingLexer;

  private _next : number;

  private _tokenBuffer : BarlomToken[];

}
