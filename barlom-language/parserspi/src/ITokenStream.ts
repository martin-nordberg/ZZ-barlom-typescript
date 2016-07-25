import { BarlomToken } from '../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';


/**
 * Buffered token stream for Barlom tokens from the Barlom lexer.
 */
export interface ITokenStream {

  /**
   * Determines whether the next token in the input has the given token type. If so, consumes it.
   * @param tokenType the token type to look for.
   * @returns {boolean}
   */
  advanceOverLookAhead1Token( tokenType : BarlomTokenType ) : boolean;

  /**
   * Returns the next token in the input when it is known to have been already buffered (from prior hasLookAhead...
   * call).
   * @returns {boolean}
   */
  consumeBufferedToken() : BarlomToken;

  /**
   * Determines whether the next token in the input has the given token type. If so, consumes it.
   * @param tokenType the token type to look for.
   * @returns {boolean}
   */
  consumeExpectedToken( tokenType : BarlomTokenType ) : BarlomToken;

  /**
   * Determines whether the next token in the input has the given token type and value. If so, consumes it.
   * @param tokenType the token type to look for.
   * @param tokenText the text value of the token to look for.
   * @returns {boolean}
   */
  consumeExpectedTokenValue( tokenType : BarlomTokenType, tokenText : string ) : BarlomToken;

  /**
   * Returns the next token in the input.
   * @returns {boolean}
   */
  consumeToken() : BarlomToken;

  /**
   * Determines whether the next token in the input has the given token type.
   * @param tokenType the token type to look for.
   * @returns {boolean}
   */
  hasLookAhead1Token( tokenType : BarlomTokenType ) : boolean;

  /**
   * Determines whether the next token in the input has the given token type and text value.
   * @param tokenType the token type to look for.
   * @param tokenText the text value of the expected token.
   * @returns {boolean}
   */
  hasLookAhead1TokenValue( tokenType : BarlomTokenType, tokenText : string ) : boolean;

  /**
   * Returns the next token in the input without consuming it.
   * @returns {boolean}
   */
  lookAhead1Token() : BarlomToken;

  /**
   * Returns the next token in the input without consuming it.
   * @returns {boolean}
   */
  lookAhead2Token() : BarlomToken;

}
