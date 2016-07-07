import { BarlomToken } from './BarlomToken';
import { BarlomTokenType } from './BarlomTokenType';

let keywords = {};
keywords['and'] = BarlomTokenType.AND;
keywords['annotation'] = BarlomTokenType.ANNOTATION;
keywords['as'] = BarlomTokenType.AS;
keywords['assert'] = BarlomTokenType.ASSERT;
keywords['begin'] = BarlomTokenType.BEGIN;
keywords['behavior'] = BarlomTokenType.BEHAVIOR;
keywords['call'] = BarlomTokenType.CALL;
keywords['check'] = BarlomTokenType.CHECK;
keywords['cleanup'] = BarlomTokenType.CLEANUP;
keywords['constant'] = BarlomTokenType.CONSTANT;
keywords['detect'] = BarlomTokenType.DETECT;
keywords['edge'] = BarlomTokenType.EDGE;
keywords['else'] = BarlomTokenType.ELSE;
keywords['end'] = BarlomTokenType.END;
keywords['enumeration'] = BarlomTokenType.ENUMERATION;
keywords['error'] = BarlomTokenType.ERROR;
keywords['expect'] = BarlomTokenType.EXPECT;
keywords['false'] = BarlomTokenType.FALSE;
keywords['given'] = BarlomTokenType.GIVEN;
keywords['graph'] = BarlomTokenType.GRAPH;
keywords['if'] = BarlomTokenType.IF;
keywords['for'] = BarlomTokenType.FOR;
keywords['function'] = BarlomTokenType.FUNCTION;
keywords['in'] = BarlomTokenType.IN;
keywords['instance'] = BarlomTokenType.INSTANCE;
keywords['interface'] = BarlomTokenType.INTERFACE;
keywords['is'] = BarlomTokenType.IS;
keywords['isnot'] = BarlomTokenType.ISNOT;
keywords['let'] = BarlomTokenType.LET;
keywords['match'] = BarlomTokenType.MATCH;
keywords['module'] = BarlomTokenType.MODULE;
keywords['not'] = BarlomTokenType.NOT;
keywords['object'] = BarlomTokenType.OBJECT;
keywords['or'] = BarlomTokenType.OR;
keywords['package'] = BarlomTokenType.PACKAGE;
keywords['raise'] = BarlomTokenType.RAISE;
keywords['regardless'] = BarlomTokenType.REGARDLESS;
keywords['repeat'] = BarlomTokenType.REPEAT;
keywords['return'] = BarlomTokenType.RETURN;
keywords['sampling'] = BarlomTokenType.SAMPLING;
keywords['scenario'] = BarlomTokenType.SCENARIO;
keywords['self'] = BarlomTokenType.SELF;
keywords['setup'] = BarlomTokenType.SETUP;
keywords['specification'] = BarlomTokenType.SPECIFICATION;
keywords['structure'] = BarlomTokenType.STRUCTURE;
keywords['symbol'] = BarlomTokenType.SYMBOL;
keywords['test'] = BarlomTokenType.TEST;
keywords['then'] = BarlomTokenType.THEN;
keywords['true'] = BarlomTokenType.TRUE;
keywords['type'] = BarlomTokenType.TYPE;
keywords['undefined'] = BarlomTokenType.UNDEFINED;
keywords['unless'] = BarlomTokenType.UNLESS;
keywords['until'] = BarlomTokenType.UNTIL;
keywords['use'] = BarlomTokenType.USE;
keywords['value'] = BarlomTokenType.VALUE;
keywords['variable'] = BarlomTokenType.VARIABLE;
keywords['variant'] = BarlomTokenType.VARIANT;
keywords['vertex'] = BarlomTokenType.VERTEX;
keywords['when'] = BarlomTokenType.WHEN;
keywords['where'] = BarlomTokenType.WHERE;
keywords['while'] = BarlomTokenType.WHILE;
keywords['with'] = BarlomTokenType.WITH;
keywords['xor'] = BarlomTokenType.XOR;

/**
 * Determines whether the given character is a numeric digit.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character is a digit.
 */
function isBinaryDigitOrUnderscore( ch : string ) {
  return '0' === ch || ch === '1' || ch === '_';
}

/**
 * Determines whether the given character is a numeric digit.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character is a digit.
 */
function isDigit( ch : string ) {
  return '0' <= ch && ch <= '9';
}

/**
 * Determines whether the given character is a numeric digit or else an underscore spacer.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character is a digit or an underscore.
 */
function isDigitOrUnderscore( ch : string ) {
  return isDigit( ch ) || ch === '_';
}

/**
 * Determines whether the given character is a hexadecimal digit.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character is a hex digit.
 */
function isHexDigit( ch : string ) {
  return ( '0' <= ch && ch <= '9' ) ||
      ( 'a' <= ch && ch <= 'f' ) ||
      ( 'A' <= ch && ch <= 'F' );
}

/**
 * Determines whether the given character is a hexadecimal digit or else an underscore spacer.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character is a hex digit or an underscore.
 */
function isHexDigitOrUnderscore( ch : string ) {
  return isHexDigit( ch ) || ch === '_';
}

/**
 * Determines whether the given character is alphabetical and can start an identifier.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character can start an identifier.
 */
function isIdentifierChar( ch : string ) {
  return ( 'a' <= ch && ch <= 'z' ) ||
      ( 'A' <= ch && ch <= 'Z' );
  // TODO: Unicode ?
}

/**
 * Determines whether the given character can be part of an identifier.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character can be part of an identifier.
 */
function isIdentifierBodyChar( ch : string ) {
  return isIdentifierChar( ch ) || isDigitOrUnderscore( ch );
}

/**
 * Determines whether a character is white space.
 * NOTE: Tab characters are NOT recognized. Tools are expected to automatically adjust indenting
 * when needed to suit the taste of an individual developer, but in the absence of a tool, there
 * is no possibility of tab munging. Also form feeds are a relic of the past not recognized either.
 * @param ch the character to check.
 * @returns {boolean} true if it's a whitespace character.
 */
function isWhiteSpace( ch : string ) {
  return ch === ' ' || ch === '\n' || ch === '\r';
}

/**
 * Lexer for the Barlom language.
 */
export class BarlomLexer {

  /**
   * Constructs a lexer that will return tokens from the given code which has been read from the given file.
   * @param code the code to scan.
   * @param fileName the name of the file.
   * @param options options for how the lexer should treat white space and comments.
   */
  constructor(
      code : string,
      fileName : string,
      options = {
        skipComments: true,
        skipWhiteSpace: true
      }
  ) {
    this._fileName = fileName;
    this._code = code;

    this._skipComments = options.hasOwnProperty( 'skipComments' ) ? options.skipComments : true;
    this._skipWhiteSpace = options.hasOwnProperty( 'skipWhiteSpace' ) ? options.skipWhiteSpace : true;

    this._startPos = 0;
    this._endPos = 0;
    this._startLine = 1;
    this._endLine = 1;
    this._startCol = 1;
    this._endCol = 1;
  }

  /**
   * Reads all the tokens in the input.
   * @returns {Array} An array containing the tokens read (including EOF in the last element).
   */
  public readAllTokens() : BarlomToken[] {
    var result = [];

    var token = this.readToken();
    while ( token.tokenType !== BarlomTokenType.EOF ) {
      result.push( token );
      token = this.readToken();
    }

    result.push( token );

    return result;
  }

  /**
   * Reads the next token from the code within this lexer.
   * @returns {BarlomToken} the next token scanned.
   */
  public readToken() : BarlomToken {

    var ch = this._scanChar();

    // Jump out early for end of file.
    if ( ch === '' ) {
      return new BarlomToken( BarlomTokenType.EOF, '', this._fileName, this._startLine, this._startCol );
    }

    // Process an identifier.
    if ( isIdentifierChar( ch ) ) {
      return this._processIdentifier();
    }

    // Process an identifier or anonymous literal starting with an underscore.
    if ( ch === '_' ) {
      return this._processUnderscore();
    }

    // Process whitespace.
    if ( isWhiteSpace( ch ) ) {
      return this._processWhiteSpace();
    }

    // Process tokens starting with a dot.
    if ( ch === '.' ) {
      return this._processDot();
    }

    // Process numeric tokens
    if ( isDigit( ch ) ) {
      return this._processNumeric( ch );
    }

    // Process common single character punctuation marks
    if ( ch === ',' ) {
      return this._makeToken( BarlomTokenType.COMMA );
    }
    if ( ch === '?' ) {
      return this._makeToken( BarlomTokenType.QUESTION );
    }
    if ( ch === ';' ) {
      return this._makeToken( BarlomTokenType.SEMICOLON );
    }

    // Process tokens starting with a colon.
    if ( ch === ':' ) {
      return this._processColon();
    }

    // Process a time literal
    if ( ch === '$' ) {
      return this._processDateTimeLiteral();
    }

    // Process a code literal.
    if ( ch === '`' ) {
      return this._processCodeLiteral();
    }

    // TODO: lots more characters to recognize ...

    return this._makeToken( BarlomTokenType.ERROR_UNEXPECTED_CHARACTER );

  }

  /**
   * Advance the position and token indexes over the given character, which might be a new line character.
   * @param ch the character known to be next in the scan.
   * @private
   */
  private _advance( ch : string ) {

    this._endPos += 1;

    if ( ch === '\n' ) {
      this._endLine += 1;
      this._endCol = 1;
    }
    else {
      this._endCol += 1;
    }

  }

  /**
   * Tests whether the first character of lookahead meets a given condition. Advances one character if so.
   * @param predicate function that checks whether the next character should be advanced over.
   * @returns {boolean} True if the given character is next in the input.
   * @private
   */
  private _advanceIf( predicate ) : boolean {
    if ( this._endPos >= this._code.length ) {
      return false;
    }

    if ( predicate( this._code.charAt( this._endPos ) ) ) {
      this._advanceSameLine();
      return true;
    }

    return false;
  }

  /**
   * Tests whether the first character of lookahead is as given. Advances one character if so.
   * @param ch the character to look for.
   * @returns {boolean} True if the given character is next in the input.
   * @private
   */
  private _advanceOverLookAhead1Char( ch : string ) : boolean {
    if ( this._endPos >= this._code.length ) {
      return false;
    }

    if ( this._code.charAt( this._endPos ) === ch ) {
      this._advanceSameLine();
      return true;
    }
    
    return false;
  }

  /**
   * Advances the end indexes of the token when the last character is known to not be a line feed.
   * @private
   */
  private _advanceSameLine( numChars : number = 1 ) : void {
    this._endPos += numChars;
    this._endCol += numChars;
  }

  /**
   * Tests whether the first character of lookahead meets a given condition. Advances one character if so.
   * @param predicate function that checks whether the next character should be advanced over.
   * @returns {boolean} True if the given character is next in the input.
   * @private
   */
  private _advanceWhile( predicate ) : void {
    while ( this._endPos < this._code.length && predicate( this._code.charAt( this._endPos ) ) ) {
      this._advanceSameLine();
    }
  }

  /**
   * Tests whether the first character of lookahead is as given.
   * @param ch the character to look for.
   * @returns {boolean} True if the given character is next in the input.
   * @private
   */
  private _hasLookAhead1Char( ch : string ) : boolean {
    if ( this._endPos >= this._code.length ) {
      return false;
    }

    return this._code.charAt( this._endPos ) === ch;
  }

  /**
   * Tests whether the second character of lookahead is as given.
   * @param ch the character to look for.
   * @returns {boolean} True if the given character is second in the remaining input.
   * @private
   */
  private _hasLookAhead2Char( ch : string ) : boolean {
    var index = this._endPos + 1;
    if ( index >= this._code.length ) {
      return false;
    }

    return this._code.charAt( index ) === ch;
  }

  /**
   * Returns the first character of lookahead in the input.
   * @returns {string} the character found or '' for EOF.
   * @private
   */
  private _lookAhead1Char() : string {
    if ( this._endPos >= this._code.length ) {
      return '';
    }

    return this._code.charAt( this._endPos );
  }

  /**
   * Returns the second character of lookahead in the input.
   * @returns {string} the character found or '' for EOF.
   * @private
   */
  private _lookAhead2Char() : string {
    var index = this._endPos + 1;
    if ( index >= this._code.length ) {
      return '';
    }

    return this._code.charAt( index );
  }

  /**
   * Returns the third character of lookahead in the input.
   * @returns {string} the character found or '' for EOF.
   * @private
   */
  private _lookAhead3Char() : string {
    var index = this._endPos + 2;
    if ( index >= this._code.length ) {
      return '';
    }

    return this._code.charAt( index );
  }

  /**
   * Constructs the token from the current start/end index positions of the token in progress. Also resets
   * the indexes to begin the next token.
   * @param tokenType the type of token that has been recognized.
   * @returns {BarlomToken}
   * @private
   */
  private _makeToken( tokenType : BarlomTokenType ) : BarlomToken {

    let result = new BarlomToken(
        tokenType,
        this._code.substring( this._startPos, this._endPos ),
        this._fileName,
        this._startLine,
        this._startCol
    );

    this._startPos = this._endPos;
    this._startLine = this._endLine;
    this._startCol = this._endCol;

    return result;
  }

  /**
   * Process a back-tick-delimited code literal.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processCodeLiteral() : BarlomToken {
    var ch = this._lookAhead1Char();

    while ( true ) {
      if ( ch === '' ) {
        return this._makeToken( BarlomTokenType.ERROR_UNCLOSED_CODE );
      }

      this._advance( ch );

      if ( ch === '`' ) {
        return this._makeToken( BarlomTokenType.CodeLiteral );
      }

      ch = this._lookAhead1Char();
    }
  }

  /**
   * Processes a token starting with a colon.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processColon() : BarlomToken {
    if ( this._advanceOverLookAhead1Char( ':' ) ) {
      return this._makeToken( BarlomTokenType.COLON_COLON );
    }
    return this._makeToken( BarlomTokenType.COLON );

  }

  /**
   * Processes a date/time literal after the opening '$' has been scanned.
   * @returns {BarlomToken} the time literal recognized.
   * @private
   */
  private _processDateTimeLiteral() : BarlomToken {

    var ch = this._lookAhead1Char();

    // Year/month/day
    if ( isDigit( ch ) ) {
      this._advanceSameLine();

      // year
      for ( var i = 0; i < 3; i += 1 ) {
        if ( !isDigit( this._lookAhead1Char() ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }
        this._advanceSameLine();
      }
      if ( !this._advanceOverLookAhead1Char( '-' ) ) {
        return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
      }

      // month
      for ( var i = 0; i < 2; i += 1 ) {
        if ( !isDigit( this._lookAhead1Char() ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }
        this._advanceSameLine();
      }
      if ( !this._advanceOverLookAhead1Char( '-' ) ) {
        return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
      }

      // day
      for ( var i = 0; i < 2; i += 1 ) {
        if ( !isDigit( this._lookAhead1Char() ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }
        this._advanceSameLine();
      }

      ch = this._lookAhead1Char();
    }

    // Time
    if ( ch === 'T' ) {
      this._advanceSameLine();

      // hour
      for ( var i = 0; i < 2; i += 1 ) {
        if ( !isDigit( this._lookAhead1Char() ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }
        this._advanceSameLine();
      }
      if ( !this._advanceOverLookAhead1Char( ':' ) ) {
        return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
      }

      // minutes
      for ( var i = 0; i < 2; i += 1 ) {
        if ( !isDigit( this._lookAhead1Char() ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }
        this._advanceSameLine();
      }

      // seconds
      ch = this._lookAhead1Char();
      if ( ch === ':' ) {
        this._advanceSameLine();
        for ( var i = 0; i < 2; i += 1 ) {
          if ( !isDigit( this._lookAhead1Char() ) ) {
            return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
          }
          this._advanceSameLine();
        }

        // seconds fraction
        if ( this._advanceOverLookAhead1Char( '.' ) ) {
          if ( !isDigit( this._lookAhead1Char() ) ) {
            return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
          }
          this._advanceSameLine();

          for ( var i = 0; i < 2; i += 1 ) {
            if ( !isDigit( this._lookAhead1Char() ) ) {
              break;
            }
            this._advanceSameLine();
          }
        }

        ch = this._lookAhead1Char();
      }

      // time zone
      if ( ch === '+' || ch === '-' ) {
        this._advanceSameLine();
        // hour
        for ( var i = 0; i < 2; i += 1 ) {
          if ( !isDigit( this._lookAhead1Char() ) ) {
            return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
          }
          this._advanceSameLine();
        }
        if ( !this._advanceOverLookAhead1Char( ':' ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }

        // minutes
        for ( var i = 0; i < 2; i += 1 ) {
          if ( !isDigit( this._lookAhead1Char() ) ) {
            return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
          }
          this._advanceSameLine();
        }
      }
      else if ( ch === 'Z' ) {
        this._advanceSameLine();
      }
    }

    if ( !this._advanceOverLookAhead1Char( '$' ) ) {
      return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
    }

    return this._makeToken( BarlomTokenType.DateTimeLiteral );
  }

  /**
   * Processes a token starting with a period character.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processDot() : BarlomToken {

    if ( this._advanceOverLookAhead1Char( '.' ) ) {
      var ch = this._lookAhead1Char();

      if ( ch === '.' ) {
        this._advanceSameLine();
        return this._makeToken( BarlomTokenType.DOT_DOT_DOT );
      }
      else if ( ch === '<' ) {
        this._advanceSameLine();
        return this._makeToken( BarlomTokenType.RANGE_EXCLUSIVE );
      }

      return this._makeToken( BarlomTokenType.RANGE_INCLUSIVE );
    }

    return this._makeToken( BarlomTokenType.DOT );
  }

  /**
   * Process a token known to be an identifier or keyword.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processIdentifier() : BarlomToken {

    // Consume identifier body characters ...
    this._advanceWhile( isIdentifierBodyChar );

    // Allow a trailing prime.
    this._advanceOverLookAhead1Char( "'" );

    // Build the token.
    let result = this._makeToken( BarlomTokenType.Identifier );

    // Look to see if it's a keyword instead of an identifier.
    let tokenType = keywords[result.text];
    if ( tokenType != null ) {
      return result.withRevisedTokenType( tokenType );
    }

    return result;
  }

  /**
   * Processes a token starting with a numeric digit - a binary, hex, or decimal integer or a number or a version
   * literal.
   * @param ch0 the first character of the token already scanned.
   * @returns {BarlomToken} the scanned token
   * @private
   */
  private _processNumeric( ch0 : string ) : BarlomToken {

    if ( ch0 === '0' ) {
      if ( ( this._hasLookAhead1Char( 'b' ) || this._hasLookAhead1Char( 'B' ) ) &&
          ( this._hasLookAhead2Char( '0' ) || this._hasLookAhead2Char( '1' ) ) ) {
        this._advanceSameLine( 2 );
        this._advanceWhile( isBinaryDigitOrUnderscore );
        return this._makeToken( BarlomTokenType.BinaryIntegerLiteral );
      }

      if ( ( this._hasLookAhead1Char( 'x' ) || this._hasLookAhead1Char( 'X' ) ) &&
          isHexDigit( this._lookAhead2Char() ) ) {
        this._advanceSameLine( 2 );
        this._advanceWhile( isHexDigitOrUnderscore );
        return this._makeToken( BarlomTokenType.HexIntegerLiteral );
      }
    }

    this._advanceWhile( isDigitOrUnderscore );

    var ch1 = this._lookAhead1Char();
    var ch2 = this._lookAhead2Char();

    var isNumber = false;

    // number or version
    if ( ch1 === '.' && isDigit( ch2 ) ) {
      this._advanceSameLine( 2 );
      this._advanceWhile( isDigitOrUnderscore );

      ch1 = this._lookAhead1Char();
      ch2 = this._lookAhead2Char();

      // version
      if ( ch1 === '.' && isDigit( ch2 ) ) {
        this._advanceSameLine( 2 );
        return this._processVersionLiteral();
      }

      isNumber = true;
    }

    // number with exponent
    if ( ch1 === 'e' || ch1 === 'E' ) {
      if ( isDigit( ch2 ) ) {
        this._advanceSameLine( 2 );
        isNumber = true;
      }
      else if ( ( ch2 === '-' || ch2 === '+' ) && isDigit( this._lookAhead3Char() ) ) {
        this._advanceSameLine( 3 );
        isNumber = true;
      }
    }

    if ( isNumber ) {
      this._advanceWhile( isDigit );

      // number size suffix
      if ( ch1 === 'd' || ch1 === 'D' || ch1 === 'f' || ch1 === 'F' || ch1 === 'g' || ch1 === 'G' ) {
        this._advanceSameLine();
      }

      return this._makeToken( BarlomTokenType.NumberLiteral );
    }

    // integer unsigned suffix
    if ( ch1 === 'u' || ch1 === 'U' ) {
      this._advanceSameLine();
      ch1 = this._lookAhead1Char();
    }

    // integer size suffix
    if ( ch1 === 'i' || ch1 === 'I' || ch1 === 'l' || ch1 === 'L' ||
        ch1 === 's' || ch1 === 'S' || ch1 === 'y' || ch1 === 'Y' ) {
      this._advanceSameLine();
    }

    return this._makeToken( BarlomTokenType.IntegerLiteral );
  }

  /**
   * Process an underscore that may or may not be the start of an identifier.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processUnderscore() : BarlomToken {

    let ch = this._lookAhead1Char();

    if ( isIdentifierChar( ch ) ) {
      this._advanceSameLine();
      return this._processIdentifier();
    }
    else if ( ch === '_' ) {
      this._advanceSameLine();
      ch = this._lookAhead1Char();
      if ( isIdentifierChar( ch ) ) {
        return this._processIdentifier();
      }
      else {
        // An identifier can start with at most two underscores that must be followed by an alphabetic character.
        return this._makeToken( BarlomTokenType.ERROR_INVALID_IDENTIFIER );
      }
    }
    else {
      return this._makeToken( BarlomTokenType.AnonymousLiteral );
    }

  }

  /**
   * Processes a version literal after the start of the third segment of digits has been identified.
   * @returns {BarlomToken} the version literal recognized.
   * @private
   */
  private _processVersionLiteral() : BarlomToken {

    this._advanceWhile( isDigit );

    // Scan an optional pre-release fragment
    if ( this._hasLookAhead1Char( '-' ) ) {
      var ch2 = this._lookAhead2Char();
      if ( isIdentifierChar( ch2 ) ) {
        this._advanceSameLine( 2 );
        this._advanceWhile( isIdentifierBodyChar );
      }
      else if ( isDigit( ch2 ) ) {
        this._advanceSameLine( 2 );
        this._advanceWhile( isDigit );
      }
    }

    // Scan an optional build fragment
    if ( this._hasLookAhead1Char( '+' ) ) {
      var ch2 = this._lookAhead2Char();
      if ( isIdentifierChar( ch2 ) ) {
        this._advanceSameLine( 2 );
        this._advanceWhile( isIdentifierBodyChar );
      }
      else if ( isDigit( ch2 ) ) {
        this._advanceSameLine( 2 );
        this._advanceWhile( isDigit );
      }
    }

    return this._makeToken( BarlomTokenType.VersionLiteral );
  }

  /**
   * Process a sequence of white space characters.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processWhiteSpace() : BarlomToken {
    this._advanceWhile( isWhiteSpace );
    if ( this._skipWhiteSpace ) {
      return this._skip();
    }
    return this._makeToken( BarlomTokenType.WHITE_SPACE );
  }

  /**
   * Reads the next character from the input and advances the token indexes.
   * @returns {string} the character read
   * @private
   */
  private _scanChar() : string {
    if ( this._endPos >= this._code.length ) {
      return '';
    }

    let result = this._code.charAt( this._endPos );

    this._advance( result );

    return result;
  }

  /**
   * Skips the token that has just been recognized and reads the next one instead.
   * @returns {BarlomToken} the token read after discarding the current one.
   * @private
   */
  private _skip() : BarlomToken {
    this._makeToken( BarlomTokenType.WHITE_SPACE );
    return this.readToken();
  }

  private _code : string;
  private _endCol : number;
  private _endLine : number;
  private _endPos : number;
  private _fileName : string;
  private _skipComments : boolean;
  private _skipWhiteSpace : boolean;
  private _startCol : number;
  private _startLine : number;
  private _startPos : number;

}
    
