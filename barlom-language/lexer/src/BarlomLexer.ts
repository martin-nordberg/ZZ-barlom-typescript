import { BarlomToken } from './BarlomToken';
import { BarlomTokenType } from './BarlomTokenType';
import {
    isBinaryDigitOrUnderscore,
    isDigit,
    isDigitOrUnderscore,
    isHexDigit,
    isHexDigitOrUnderscore,
    isIdentifierBodyChar,
    isIdentifierChar,
    isTagBodyChar,
    isUnicodeNameChar
} from './LexerPredicates';
import { Scanner } from './Scanner';

let keywords = {};
keywords['and'] = BarlomTokenType.AND;
keywords['as'] = BarlomTokenType.AS;
keywords['begin'] = BarlomTokenType.BEGIN;
keywords['div'] = BarlomTokenType.DIV;
keywords['end'] = BarlomTokenType.END;
keywords['false'] = BarlomTokenType.FALSE;
keywords['in'] = BarlomTokenType.IN;
keywords['is'] = BarlomTokenType.IS;
keywords['isnot'] = BarlomTokenType.ISNOT;
keywords['mod'] = BarlomTokenType.MOD;
keywords['not'] = BarlomTokenType.NOT;
keywords['notin'] = BarlomTokenType.NOTIN;
keywords['or'] = BarlomTokenType.OR;
keywords['self'] = BarlomTokenType.SELF;
keywords['true'] = BarlomTokenType.TRUE;
keywords['undefined'] = BarlomTokenType.UNDEFINED;
keywords['use'] = BarlomTokenType.USE;
keywords['xor'] = BarlomTokenType.XOR;

/**
 * Lexer for the Barlom language.
 */
export class BarlomLexer {

  /**
   * Constructs a lexer that will return tokens from the given code which has been read from the given file.
   * @param code the code to scan.
   * @param fileName the name of the file.
   */
  constructor(
      code : string,
      fileName : string
  ) {
    this._fileName = fileName;
    this._scanner = new Scanner( code );
  }

  /**
   * Reads all the tokens in the input.
   * @returns {Array} An array containing the tokens read (including EOF in the last element).
   */
  public readAllTokens() : BarlomToken[] {

    let result = [];

    let token = this.readToken();
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

    // Skip white space.
    if ( this._scanner.advanceWhileWhiteSpace() ) {
      this._scanner.beginNextToken();
    }

    const ch = this._scanner.scanChar();

    // Detect end of file.
    if ( ch === '' ) {
      return new BarlomToken( BarlomTokenType.EOF, '', this._fileName, this._scanner.startLine, this._scanner.startColumn );
    }

    // Process an identifier.
    if ( isIdentifierChar( ch ) ) {
      return this._processIdentifier();
    }

    // Process numeric tokens.
    if ( isDigit( ch ) ) {
      return this._processNumeric( ch );
    }

    switch ( ch ) {
      case '"':
        return this._processDoubleQuote();
      case "'":
        return this._processSingleQuote();
      case '_':
        return this._processUnderscore();
      case '.':
        return this._processDot();
      case '-':
        return this._processDash();
      case '(':
        return this._makeToken( BarlomTokenType.LEFT_PARENTHESIS );
      case ')':
        return this._makeToken( BarlomTokenType.RIGHT_PARENTHESIS );
      case '=':
        return this._processEquals();
      case '{':
        return this._processLeftBrace();
      case '}':
        return this._makeToken( BarlomTokenType.RIGHT_BRACE );
      case ',':
        return this._makeToken( BarlomTokenType.COMMA );
      case '[':
        return this._processLeftBracket();
      case ']':
        return this._makeToken( BarlomTokenType.RIGHT_BRACKET );
      case '/':
        return this._processSlash();
      case '?':
        return this._processQuestion();
      case ';':
        return this._makeToken( BarlomTokenType.SEMICOLON );
      case ':':
        return this._processColon();
      case '<':
        return this._processLessThan();
      case '>':
        return this._processGreaterThan();
      case '$':
        return this._processDateTimeLiteral();
      case '`':
        return this._processCodeLiteral();
      case '&':
        return this._processAmpersand();
      case '+':
        return this._processPlus();
      case '*':
        return this._processAsterisk();
      case '^':
        return this._processCaret();
      case '%':
        return this._processPercent();
      case '~':
        return this._processTilde();
      case '@':
        return this._processAt();
      case '#':
        return this._processHash();

      default:
        return this._makeToken( BarlomTokenType.ErrorUnexpectedCharacter );
    }

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
        this._scanner.tokenText,
        this._fileName,
        this._scanner.startLine,
        this._scanner.startColumn
    );

    this._scanner.beginNextToken();

    return result;

  }

  /**
   * Process a token starting with an ampersand: '&' or '&='.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processAmpersand() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '=' ) ) {
      return this._makeToken( BarlomTokenType.CONCAT_EQUALS )
    }

    return this._makeToken( BarlomTokenType.CONCATENATE );

  }

  /**
   * Process a token starting with an asterisk: '*' or '*='.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processAsterisk() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '=' ) ) {
      return this._makeToken( BarlomTokenType.TIMES_EQUALS )
    }

    return this._makeToken( BarlomTokenType.TIMES );

  }

  /**
   * Process an @ sign or location literal.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processAt() : BarlomToken {

    function isNotClosingPipe( ch : string ) : boolean {
      return ch !== '|' && ch !== '\r' && ch != '\n';
    }

    if ( this._scanner.advanceOverLookAhead1Char( '|' ) ) {

      this._scanner.advanceWhile( isNotClosingPipe );

      if ( this._scanner.advanceOverLookAhead1Char( "|" ) ) {
        return this._makeToken( BarlomTokenType.LocationLiteral );
      }

      return this._makeToken( BarlomTokenType.ErrorUnclosedLocationLiteral )
    }

    return this._makeToken( BarlomTokenType.AT );

  }

  /**
   * Process a back-tick-delimited code literal.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processCodeLiteral() : BarlomToken {

    while ( true ) {

      if ( this._scanner.advanceOverLookAhead1Char( '`' ) ) {
        return this._makeToken( BarlomTokenType.CodeLiteral );
      }

      if ( this._scanner.scanChar() === '' ) {
        return this._makeToken( BarlomTokenType.ErrorUnclosedCodeLiteral );
      }

    }

  }

  /**
   * Process a token starting with a caret: '^' or '^='.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processCaret() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '=' ) ) {
      return this._makeToken( BarlomTokenType.POWER_EQUALS )
    }

    return this._makeToken( BarlomTokenType.POWER );

  }

  /**
   * Processes a token starting with a colon:
   *   ::>
   *   ::
   *   :>
   *   :
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processColon() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( ':' ) ) {

      if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
        return this._makeToken( BarlomTokenType.ARROW_COLON_COLON_RIGHT );
      }

      return this._makeToken( BarlomTokenType.COLON_COLON );

    }

    if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
      return this._makeToken( BarlomTokenType.ARROW_COLON_RIGHT );
    }

    return this._makeToken( BarlomTokenType.COLON );

  }

  /**
   * Processes a token starting with a dash character:
   *   ->
   *   -=
   *   -->>
   *   -->
   *   ---
   *   --<>
   *   -
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processDash() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
      return this._makeToken( BarlomTokenType.ARROW_DASH_RIGHT );
    }

    if ( this._scanner.advanceOverLookAhead1Char( '=' ) ) {
      return this._makeToken( BarlomTokenType.MINUS_EQUALS );
    }

    if ( this._scanner.hasLookAhead1Char( '-' ) ) {

      if ( this._scanner.hasLookAhead2Char( '>' ) ) {

        this._scanner.advanceSameLine( 2 );

        if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
          return this._makeToken( BarlomTokenType.ARROW_DASH_DASH_DOUBLE_RIGHT)
        }
        else {
          return this._makeToken( BarlomTokenType.ARROW_DASH_DASH_RIGHT );
        }

      }
      else if ( this._scanner.hasLookAhead2Char( '-' ) ) {
        this._scanner.advanceSameLine( 2 );
        return this._makeToken( BarlomTokenType.ARROW_DASH_DASH_DASH );
      }
      else if ( this._scanner.hasLookAhead2Char( '<' ) && this._scanner.hasLookAhead3Char( '>' ) ) {
        this._scanner.advanceSameLine( 3 );
        return this._makeToken( BarlomTokenType.ARROW_DASH_DASH_DIAMOND_RIGHT );
      }

    }

    return this._makeToken( BarlomTokenType.MINUS );

  }

  /**
   * Processes a date/time literal after the opening '$' has been scanned.
   * @returns {BarlomToken} the time literal recognized.
   * @private
   */
  private _processDateTimeLiteral() : BarlomToken {

    let literalStarted = false;

    // Year/month/day
    if ( this._scanner.advanceIf( isDigit ) ) {

      literalStarted = true;

      // year
      for ( let i = 0; i < 3; i += 1 ) {
        if ( !this._scanner.advanceIf( isDigit ) ) {
          return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
        }
      }

      if ( !this._scanner.advanceOverLookAhead1Char( '-' ) ) {
        return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
      }

      // month
      for ( let i = 0; i < 2; i += 1 ) {
        if ( !this._scanner.advanceIf( isDigit ) ) {
          return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
        }
      }

      if ( !this._scanner.advanceOverLookAhead1Char( '-' ) ) {
        return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
      }

      // day
      for ( let i = 0; i < 2; i += 1 ) {
        if ( !this._scanner.advanceIf( isDigit ) ) {
          return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
        }
      }

    }

    // Time
    if ( this._scanner.advanceOverLookAhead1Char( 'T' ) ) {

      literalStarted = true;

      // hour
      for ( let i = 0; i < 2; i += 1 ) {
        if ( !this._scanner.advanceIf( isDigit ) ) {
          return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
        }
      }

      if ( !this._scanner.advanceOverLookAhead1Char( ':' ) ) {
        return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
      }

      // minutes
      for ( let i = 0; i < 2; i += 1 ) {
        if ( !this._scanner.advanceIf( isDigit ) ) {
          return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
        }
      }

      // seconds
      if ( this._scanner.advanceOverLookAhead1Char( ':' ) ) {

        for ( let i = 0; i < 2; i += 1 ) {
          if ( !this._scanner.advanceIf( isDigit ) ) {
            return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
          }
        }

        // seconds fraction
        if ( this._scanner.advanceOverLookAhead1Char( '.' ) ) {
          if ( !this._scanner.advanceIf( isDigit ) ) {
            return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
          }

          for ( let i = 0; i < 2; i += 1 ) {
            if ( !this._scanner.advanceIf( isDigit ) ) {
              break;
            }
          }
        }

      }

      // time zone
      if ( this._scanner.advanceOverLookAhead1Char( '+' ) || this._scanner.advanceOverLookAhead1Char( '-' ) ) {

        // hour
        for ( let i = 0; i < 2; i += 1 ) {
          if ( !this._scanner.advanceIf( isDigit ) ) {
            return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
          }
        }

        if ( !this._scanner.advanceOverLookAhead1Char( ':' ) ) {
          return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
        }

        // minutes
        for ( let i = 0; i < 2; i += 1 ) {
          if ( !this._scanner.advanceIf( isDigit ) ) {
            return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
          }
        }

      }
      else {
        this._scanner.advanceOverLookAhead1Char( 'Z' );
      }

    }

    if ( literalStarted ) {

      if ( !this._scanner.advanceOverLookAhead1Char( '$' ) ) {
        return this._makeToken( BarlomTokenType.ErrorInvalidTimeLiteral );
      }

      return this._makeToken( BarlomTokenType.DateTimeLiteral );

    }

    return this._makeToken( BarlomTokenType.TO_STRING );

  }

  /**
   * Processes a token starting with a period character:
   *   ...
   *   ..<
   *   ..
   *   .?
   *   .
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processDot() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '.' ) ) {

      if ( this._scanner.advanceOverLookAhead1Char( '.' ) ) {
        return this._makeToken( BarlomTokenType.DOT_DOT_DOT );
      }
      else if ( this._scanner.advanceOverLookAhead1Char( '<' ) ) {
        return this._makeToken( BarlomTokenType.RANGE_EXCLUSIVE );
      }

      return this._makeToken( BarlomTokenType.RANGE_INCLUSIVE );

    }

    if ( this._scanner.advanceOverLookAhead1Char( '?' ) ) {
      return this._makeToken( BarlomTokenType.DOT_QUESTION );
    }

    return this._makeToken( BarlomTokenType.DOT );

  }

  /**
   * Processes a token starting with a double quote.
   * @private
   */
  private _processDoubleQuote() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '"' ) ) {

      // multiline text literal
      if ( this._scanner.advanceOverLookAhead1Char( '"' ) ) {
        return this._processMultilineTextLiteral( '"' );
      }

      // empty text literal
      return this._makeToken( BarlomTokenType.TextLiteral_DoubleQuoted );

    }

    function isNotClosingQuoteOrBackSlashOrNewLine( ch : string ) : boolean {
      return ch !== '"' && ch != '\\' && ch !== '\r' && ch != '\n';
    }

    while ( true ) {

      this._scanner.advanceWhile( isNotClosingQuoteOrBackSlashOrNewLine );

      if ( this._scanner.advanceOverLookAhead1Char( '"' ) ) {
        return this._makeToken( BarlomTokenType.TextLiteral_DoubleQuoted );
      }

      if ( !this._scanTextEscape() ) {
        break;
      }

    }

    if ( this._scanner.hasLookAhead1Char( '\r' ) || this._scanner.hasLookAhead1Char( '\n' ) || this._scanner.isEof() ) {
      return this._makeToken( BarlomTokenType.ErrorUnclosedTextLiteral )
    }

    return this._makeToken( BarlomTokenType.ErrorInvalidTextLiteral )

  }

  /**
   * Processes a token starting with an equals character:
   *   =>
   *   ==>
   *   ==>>
   *   ==<>
   *   =
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processEquals() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
      return this._makeToken( BarlomTokenType.ARROW_EQUAL_RIGHT );
    }

    if ( this._scanner.hasLookAhead1Char( '=' ) ) {

      if ( this._scanner.hasLookAhead2Char( '>' ) ) {

        this._scanner.advanceSameLine( 2 );

        if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
          return this._makeToken( BarlomTokenType.ARROW_EQUAL_EQUAL_DOUBLE_RIGHT );
        }

        return this._makeToken( BarlomTokenType.ARROW_EQUAL_EQUAL_RIGHT );

      }

      if ( this._scanner.hasLookAhead2Char( '<' ) && this._scanner.hasLookAhead3Char( '>' ) ) {
        this._scanner.advanceSameLine( 3 );
        return this._makeToken( BarlomTokenType.ARROW_EQUAL_EQUAL_DIAMOND_RIGHT );
      }

    }

    return this._makeToken( BarlomTokenType.EQUALS );

  }

  /**
   * Process a token starting with greater than: '>' or '>='.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processGreaterThan() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '=' ) ) {
      return this._makeToken( BarlomTokenType.GREATER_THAN_OR_EQUAL )
    }

    return this._makeToken( BarlomTokenType.GREATER_THAN );

  }

  /**
   * Processes a token starting with a hash character: a user-defined keyword or token
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processHash() : BarlomToken {

    // TODO: user-define literals - need nested brace-matching
    // if ( this._scanner.advanceOverLookAhead1Char( '[' ) ) {
    //
    // }
    // if ( this._scanner.advanceOverLookAhead1Char( '{' ) ) {
    //
    // }
    // if ( this._scanner.advanceOverLookAhead1Char( '/' ) ) {
    //
    // }

    if ( !this._scanner.advanceIf( isIdentifierChar ) ) {
      return this._makeToken( BarlomTokenType.ErrorUnexpectedCharacter );
    }

    this._scanner.advanceWhile( isTagBodyChar );

    return this._makeToken( BarlomTokenType.Tag );

  }

  /**
   * Process a token known to be an identifier or keyword.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processIdentifier() : BarlomToken {

    // Consume identifier body characters ...
    this._scanner.advanceWhile( isIdentifierBodyChar );

    // Allow a trailing prime.
    this._scanner.advanceOverLookAhead1Char( "'" );

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
   * Processes a token starting with a left brace character: '{', '{{{'
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processLeftBrace() : BarlomToken {

    if ( this._scanner.hasLookAhead1Char( '{' ) && this._scanner.hasLookAhead2Char( '{' ) ) {
      
      this._scanner.advanceSameLine( 2 );
      
      while ( true ) {

        if ( this._scanner.advanceOverLookAhead1Char( '}' ) &&
             this._scanner.advanceOverLookAhead1Char( '}' ) &&
             this._scanner.advanceOverLookAhead1Char( '}' ) ) {
          return this._makeToken( BarlomTokenType.TemplateLiteral );
        }

        if ( this._scanner.scanChar() === '' ) {
          return this._makeToken( BarlomTokenType.ErrorUnclosedTemplate );
        }

      }
      
    }

    return this._makeToken( BarlomTokenType.LEFT_BRACE );

  }

  /**
   * Processes a token starting with a left bracket character: '[', '[%%'
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processLeftBracket() : BarlomToken {

    if ( this._scanner.hasLookAhead1Char( '%' ) && this._scanner.hasLookAhead2Char( '%' ) ) {
      this._scanner.advanceSameLine( 2 );
      return this._makeToken( BarlomTokenType.GRAPH_START );
    }

    return this._makeToken( BarlomTokenType.LEFT_BRACKET );

  }

  /**
   * Processes a token starting with a less than character:
   *   <-->
   *   <--
   *   <->
   *   <-
   *   <==>
   *   <==
   *   <=>
   *   <=
   *   <~~>
   *   <~~
   *   <~>
   *   <~
   *   <::>
   *   <::
   *   <:>
   *   <:
   *   <<--
   *   <<==
   *   <<~~
   *   <>--
   *   <>==
   *   <>~~
   *   <>
   *   <
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processLessThan() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '-' ) ) {

      if ( this._scanner.advanceOverLookAhead1Char( '-' ) ) {

        if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
          return this._makeToken( BarlomTokenType.ARROW_DASH_DASH_LEFT_RIGHT );
        }

        return this._makeToken( BarlomTokenType.ARROW_DASH_DASH_LEFT );

      }

      if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
        return this._makeToken( BarlomTokenType.ARROW_DASH_LEFT_RIGHT );
      }

      return this._makeToken( BarlomTokenType.ARROW_DASH_LEFT );

    }

    if ( this._scanner.advanceOverLookAhead1Char( '=' ) ) {

      if ( this._scanner.advanceOverLookAhead1Char( '=' ) ) {

        if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
          return this._makeToken( BarlomTokenType.ARROW_EQUAL_EQUAL_LEFT_RIGHT );
        }

        return this._makeToken( BarlomTokenType.ARROW_EQUAL_EQUAL_LEFT );

      }

      if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
        return this._makeToken( BarlomTokenType.COMPARE );
      }

      return this._makeToken( BarlomTokenType.LESS_THAN_OR_EQUAL );

    }

    if ( this._scanner.advanceOverLookAhead1Char( '~' ) ) {

      if ( this._scanner.advanceOverLookAhead1Char( '~' ) ) {

        if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
          return this._makeToken( BarlomTokenType.ARROW_TILDE_TILDE_LEFT_RIGHT );
        }

        return this._makeToken( BarlomTokenType.ARROW_TILDE_TILDE_LEFT );

      }

      if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
        return this._makeToken( BarlomTokenType.ARROW_TILDE_LEFT_RIGHT );
      }

      return this._makeToken( BarlomTokenType.ARROW_TILDE_LEFT );

    }

    if ( this._scanner.advanceOverLookAhead1Char( ':' ) ) {

      if ( this._scanner.advanceOverLookAhead1Char( ':' ) ) {

        if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
          return this._makeToken( BarlomTokenType.ARROW_COLON_COLON_LEFT_RIGHT );
        }

        return this._makeToken( BarlomTokenType.ARROW_COLON_COLON_LEFT );

      }

      if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
        return this._makeToken( BarlomTokenType.ARROW_COLON_LEFT_RIGHT );
      }

      return this._makeToken( BarlomTokenType.ARROW_COLON_LEFT );

    }

    if ( this._scanner.hasLookAhead1Char( '<' ) ) {

      if ( this._scanner.hasLookAhead2Char( '-' ) && this._scanner.hasLookAhead3Char( '-' ) ) {
        this._scanner.advanceSameLine( 3 );
        return this._makeToken( BarlomTokenType.ARROW_DASH_DASH_DOUBLE_LEFT );
      }

      if ( this._scanner.hasLookAhead2Char( '=' ) && this._scanner.hasLookAhead3Char( '=' ) ) {
        this._scanner.advanceSameLine( 3 );
        return this._makeToken( BarlomTokenType.ARROW_EQUAL_EQUAL_DOUBLE_LEFT );
      }

      if ( this._scanner.hasLookAhead2Char( '~' ) && this._scanner.hasLookAhead3Char( '~' ) ) {
        this._scanner.advanceSameLine( 3 );
        return this._makeToken( BarlomTokenType.ARROW_TILDE_TILDE_DOUBLE_LEFT );
      }

      return this._makeToken( BarlomTokenType.LESS_THAN );

    }

    if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {

      if ( this._scanner.hasLookAhead1Char( '-' ) && this._scanner.hasLookAhead1Char( '-' ) ) {
        this._scanner.advanceSameLine( 2 );
        return this._makeToken( BarlomTokenType.ARROW_DASH_DASH_DIAMOND_LEFT );
      }

      if ( this._scanner.hasLookAhead1Char( '=' ) && this._scanner.hasLookAhead2Char( '=' ) ) {
        this._scanner.advanceSameLine( 2 );
        return this._makeToken( BarlomTokenType.ARROW_EQUAL_EQUAL_DIAMOND_LEFT );
      }

      if ( this._scanner.hasLookAhead1Char( '~' ) && this._scanner.hasLookAhead2Char( '~' ) ) {
        this._scanner.advanceSameLine( 2 );
        return this._makeToken( BarlomTokenType.ARROW_TILDE_TILDE_DIAMOND_LEFT );
      }

      return this._makeToken( BarlomTokenType.NOT_EQUAL_TO );

    }

    return this._makeToken( BarlomTokenType.LESS_THAN );

  }

  /**
   * Processes a multi-line quoted string after the opening three quote characters have been scanned.
   * @param quoteChar the quote character seen.
   * @private
   */
  private _processMultilineTextLiteral( quoteChar : string ) : BarlomToken {

    function isNotClosingQuoteOrBackSlashOrNewLine( ch : string ) : boolean {
      return ch !== quoteChar && ch != '\\' && ch != '\n';
    }

    while ( true ) {

      this._scanner.advanceWhile( isNotClosingQuoteOrBackSlashOrNewLine );

      // ending quote character
      if ( this._scanner.advanceOverLookAhead1Char( quoteChar ) ) {

        if ( this._scanner.advanceOverLookAhead1Char( quoteChar ) &&
            this._scanner.advanceOverLookAhead1Char( quoteChar ) ) {
          if ( quoteChar === "'" ) {
            return this._makeToken( BarlomTokenType.TextLiteral_SingleQuotedMultiline );
          }
          else {
            return this._makeToken( BarlomTokenType.TextLiteral_DoubleQuotedMultiline );
          }
        }

        continue;

      }
      
      // new line
      if ( this._scanner.advanceWhileWhiteSpace() ) {
        continue;
      }

      if ( !this._scanTextEscape() ) {
        break;
      }

    }

    if ( this._scanner.isEof() ) {
      return this._makeToken( BarlomTokenType.ErrorUnclosedTextLiteralMultiline )
    }

    return this._makeToken( BarlomTokenType.ErrorInvalidMultilineTextLiteral )

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

      if ( ( this._scanner.hasLookAhead1Char( 'b' ) || this._scanner.hasLookAhead1Char( 'B' ) ) &&
          ( this._scanner.hasLookAhead2Char( '0' ) || this._scanner.hasLookAhead2Char( '1' ) ) ) {
        this._scanner.advanceSameLine( 2 );
        this._scanner.advanceWhile( isBinaryDigitOrUnderscore );
        return this._makeToken( BarlomTokenType.IntegerLiteral_Binary );
      }

      if ( ( this._scanner.hasLookAhead1Char( 'x' ) || this._scanner.hasLookAhead1Char( 'X' ) ) &&
          isHexDigit( this._scanner.lookAhead2Char() ) ) {
        this._scanner.advanceSameLine( 2 );
        this._scanner.advanceWhile( isHexDigitOrUnderscore );
        return this._makeToken( BarlomTokenType.IntegerLiteral_Hex );
      }

    }

    this._scanner.advanceWhile( isDigitOrUnderscore );

    let ch1 = this._scanner.lookAhead1Char();
    let ch2 = this._scanner.lookAhead2Char();
    let isNumber = false;

    // number or version
    if ( ch1 === '.' && isDigit( ch2 ) ) {

      this._scanner.advanceSameLine( 2 );

      this._scanner.advanceWhile( isDigitOrUnderscore );

      ch1 = this._scanner.lookAhead1Char();
      ch2 = this._scanner.lookAhead2Char();

      // version
      if ( ch1 === '.' && isDigit( ch2 ) ) {
        this._scanner.advanceSameLine( 2 );
        return this._processVersionLiteral();
      }

      isNumber = true;

    }

    // number with exponent
    if ( ch1 === 'e' || ch1 === 'E' ) {

      if ( isDigit( ch2 ) ) {
        this._scanner.advanceSameLine( 2 );
        isNumber = true;
      }
      else if ( ( ch2 === '-' || ch2 === '+' ) && isDigit( this._scanner.lookAhead3Char() ) ) {
        this._scanner.advanceSameLine( 3 );
        isNumber = true;
      }

    }

    if ( isNumber ) {
      this._scanner.advanceWhile( isDigit );
      // number size suffix
      if ( ch1 === 'd' || ch1 === 'D' || ch1 === 'f' || ch1 === 'F' || ch1 === 'g' || ch1 === 'G' ) {
        this._scanner.advanceSameLine();
      }

      return this._makeToken( BarlomTokenType.NumberLiteral );
    }

    // integer unsigned suffix
    if ( ch1 === 'u' || ch1 === 'U' ) {
      this._scanner.advanceSameLine();
      ch1 = this._scanner.lookAhead1Char();
    }

    // integer size suffix
    if ( ch1 === 'i' || ch1 === 'I' || ch1 === 'l' || ch1 === 'L' ||
        ch1 === 's' || ch1 === 'S' || ch1 === 'y' || ch1 === 'Y' ) {
      this._scanner.advanceSameLine();
    }

    return this._makeToken( BarlomTokenType.IntegerLiteral_Decimal );

  }

  /**
   * Process a token starting with a plus sign: '+' or '+='.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processPlus() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '=' ) ) {
      return this._makeToken( BarlomTokenType.PLUS_EQUALS )
    }

    return this._makeToken( BarlomTokenType.PLUS );

  }

  /**
   * Processes a token starting with a question mark.
   * @private
   */
  private _processQuestion() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '?' ) ) {
      return this._makeToken( BarlomTokenType.QUESTION_QUESTION );
    }

    return this._makeToken( BarlomTokenType.QUESTION );
  }

  /**
   * Processes a token starting with a single quote.
   * @private
   */
  private _processSingleQuote() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( "'" ) ) {

      // multiline text literal
      if ( this._scanner.advanceOverLookAhead1Char( "'" ) ) {
        return this._processMultilineTextLiteral( "'" );
      }

      // empty text literal
      return this._makeToken( BarlomTokenType.TextLiteral_SingleQuoted );

    }

    function isNotClosingQuoteOrBackSlashOrNewLine( ch : string ) : boolean {
      return ch !== "'" && ch != '\\' && ch !== '\r' && ch != '\n';
    }

    while ( true ) {

      this._scanner.advanceWhile( isNotClosingQuoteOrBackSlashOrNewLine );

      if ( this._scanner.advanceOverLookAhead1Char( "'" ) ) {
        return this._makeToken( BarlomTokenType.TextLiteral_SingleQuoted );
      }

      if ( !this._scanTextEscape() ) {
        break;
      }

    }

    if ( this._scanner.hasLookAhead1Char( '\r' ) || this._scanner.hasLookAhead1Char( '\n' ) || this._scanner.isEof() ) {
      return this._makeToken( BarlomTokenType.ErrorUnclosedTextLiteral )
    }

    return this._makeToken( BarlomTokenType.ErrorInvalidTextLiteral )

  }

  /**
   * Processes a token starting with a percent sign:
   *   %
   *   %%]
   * @private
   */
  private _processPercent() : BarlomToken {

    if ( this._scanner.hasLookAhead1Char( '%' ) && this._scanner.hasLookAhead2Char( ']' ) ) {
      this._scanner.advanceSameLine( 2 );
      return this._makeToken( BarlomTokenType.GRAPH_END );
    }

    return this._makeToken( BarlomTokenType.PERCENT );

  }

  /**
   * Processes a regular expression literal after the initial '~/' has bee recognized.
   * @private
   */
  private _processRegularExpressionLiteral() : BarlomToken {

    function isNotSlashOrNewLine( ch : string ) : boolean {
      return ch !== '/' && ch != '\n';
    }

    this._scanner.advanceWhile( isNotSlashOrNewLine );

    if ( this._scanner.isEof() || this._scanner.hasLookAhead1Char( '\n' ) ) {
      return this._makeToken( BarlomTokenType.ErrorUnclosedRegularExpression );
    }

    // closing slash
    this._scanner.advanceSameLine();

    // suffix
    while ( this._scanner.advanceOverLookAhead1Char( 'i' ) ||
        this._scanner.advanceOverLookAhead1Char( 'g' ) ||
        this._scanner.advanceOverLookAhead1Char( 'm' )
        ) {
      // keep going
    }

    return this._makeToken( BarlomTokenType.RegularExpressionLiteral );

  }

  /**
   * Processes a token starting with a forward slash.
   *   /
   *   /*...* /
   *   /=
   * @private
   */
  private _processSlash() : BarlomToken {

    function isNotAsteriskOrNewLine( ch : string ) : boolean {
      return ch !== '*' && ch != '\n';
    }

    if ( this._scanner.advanceOverLookAhead1Char( '*' ) ) {

      while ( true ) {

        this._scanner.advanceWhile( isNotAsteriskOrNewLine );

        // closing characters
        if ( this._scanner.advanceOverLookAhead1Char( '*' ) ) {

          if ( this._scanner.advanceOverLookAhead1Char( '/' ) ) {
            return this._makeToken( BarlomTokenType.Documentation );
          }

          continue;

        }

        // new line
        if ( this._scanner.advanceWhileWhiteSpace() ) {
          continue;
        }

        return this._makeToken( BarlomTokenType.ErrorUnclosedBlockComment )

      }

    }

    if ( this._scanner.advanceOverLookAhead1Char( '=') ) {
      return this._makeToken( BarlomTokenType.DIVIDE_EQUALS );
    }

    return this._makeToken( BarlomTokenType.DIVIDED_BY );

  }

  /**
   * Process a token that starts with a tilde:
   *   ~/ ... /igm
   *   ~=
   *   ~>
   *   ~~>>
   *   ~~>
   *   ~~~
   *   ~~<>
   *   ~and~
   *   ~nand~
   *   ~nor~
   *   ~not~
   *   ~or~
   *   ~shl~
   *   ~shr~
   *   ~xor~
   *   ~zshr~
   *   ~
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processTilde() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '/' ) ) {
      return this._processRegularExpressionLiteral();
    }

    if ( this._scanner.advanceOverLookAhead1Char( '=' ) ) {
      return this._makeToken( BarlomTokenType.TILDE_EQUALS );
    }

    if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
      return this._makeToken( BarlomTokenType.ARROW_TILDE_RIGHT );
    }

    if ( this._scanner.hasLookAhead1Char( '~' ) ) {

      if ( this._scanner.hasLookAhead2Char( '>' ) ) {

        this._scanner.advanceSameLine( 2 );

        if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
          return this._makeToken( BarlomTokenType.ARROW_TILDE_TILDE_DOUBLE_RIGHT );
        }

        return this._makeToken( BarlomTokenType.ARROW_TILDE_TILDE_RIGHT );

      }

      if ( this._scanner.hasLookAhead2Char( '~' ) ) {
        this._scanner.advanceSameLine( 2 );
        return this._makeToken( BarlomTokenType.ARROW_TILDE_TILDE_TILDE );
      }

      if ( this._scanner.hasLookAhead2Char( '<' ) && this._scanner.hasLookAhead3Char( '>' ) ) {
        this._scanner.advanceSameLine( 3 );
        return this._makeToken( BarlomTokenType.ARROW_TILDE_TILDE_DIAMOND_RIGHT );
      }

    }

    if ( this._scanner.hasLookAhead1Char( 'a' ) ) {

      if ( this._scanner.hasLookAhead2Char( 'n' ) &&
          this._scanner.hasLookAhead3Char( 'd' ) &&
          this._scanner.hasLookAhead4Char( '~' ) ) {
        this._scanner.advanceSameLine( 4 );
        return this._makeToken( BarlomTokenType.BITWISE_AND );
      }

      return this._makeToken( BarlomTokenType.TILDE )

    }

    if ( this._scanner.hasLookAhead1Char( 'n') ) {

      if ( this._scanner.hasLookAhead2Char( 'a' ) &&
          this._scanner.hasLookAhead3Char( 'n' ) &&
          this._scanner.hasLookAhead4Char( 'd' ) &&
          this._scanner.hasLookAhead5Char( '~' ) ) {
        this._scanner.advanceSameLine( 5 );
        return this._makeToken( BarlomTokenType.BITWISE_NAND );
      }

      if ( this._scanner.hasLookAhead2Char( 'o' ) ) {

        if ( this._scanner.hasLookAhead3Char( 't' ) &&
          this._scanner.hasLookAhead4Char( '~' ) ) {
          this._scanner.advanceSameLine( 4 );
          return this._makeToken( BarlomTokenType.BITWISE_NOT );
        }

        if ( this._scanner.hasLookAhead3Char( 'r' ) &&
          this._scanner.hasLookAhead4Char( '~' ) ) {
          this._scanner.advanceSameLine( 4 );
          return this._makeToken( BarlomTokenType.BITWISE_NOR );
        }

      }

      return this._makeToken( BarlomTokenType.TILDE )

    }

    if ( this._scanner.hasLookAhead1Char( 'o' ) ) {

      if ( this._scanner.hasLookAhead2Char( 'r' ) &&
          this._scanner.hasLookAhead3Char( '~' ) ) {
        this._scanner.advanceSameLine( 3 );
        return this._makeToken( BarlomTokenType.BITWISE_OR );
      }

      return this._makeToken( BarlomTokenType.TILDE )

    }

    if ( this._scanner.hasLookAhead1Char( 's' ) ) {

      if ( this._scanner.hasLookAhead2Char( 'h' ) ) {

        if ( this._scanner.hasLookAhead3Char( 'l' ) &&
            this._scanner.hasLookAhead4Char( '~' ) ) {
          this._scanner.advanceSameLine( 4 );
          return this._makeToken( BarlomTokenType.BITWISE_SHIFT_LEFT );
        }

        if ( this._scanner.hasLookAhead3Char( 'r' ) &&
            this._scanner.hasLookAhead4Char( '~' ) ) {
          this._scanner.advanceSameLine( 4 );
          return this._makeToken( BarlomTokenType.BITWISE_SHIFT_RIGHT );
        }

      }

      return this._makeToken( BarlomTokenType.TILDE )

    }

    if ( this._scanner.hasLookAhead1Char( 'x' ) ) {

      if ( this._scanner.hasLookAhead2Char( 'o' ) &&
          this._scanner.hasLookAhead3Char( 'r' ) &&
          this._scanner.hasLookAhead4Char( '~' ) ) {
        this._scanner.advanceSameLine( 4 );
        return this._makeToken( BarlomTokenType.BITWISE_XOR );
      }

      return this._makeToken( BarlomTokenType.TILDE )

    }

    if ( this._scanner.hasLookAhead1Char( 'z' ) ) {

      if ( this._scanner.hasLookAhead2Char( 's' ) &&
          this._scanner.hasLookAhead3Char( 'h' ) &&
          this._scanner.hasLookAhead4Char( 'r' ) &&
          this._scanner.hasLookAhead5Char( '~' ) ) {
        this._scanner.advanceSameLine( 5 );
        return this._makeToken( BarlomTokenType.BITWISE_ZERO_SHIFT_RIGHT );
      }

    }

    return this._makeToken( BarlomTokenType.TILDE )

  }

  /**
   * Process an underscore that may or may not be the start of an identifier.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processUnderscore() : BarlomToken {

    if ( this._scanner.advanceIf( isIdentifierChar ) ) {
      return this._processIdentifier();
    }
    else if ( this._scanner.advanceOverLookAhead1Char( '_' ) ) {

      if ( this._scanner.advanceIf( isIdentifierChar ) ) {
        return this._processIdentifier();
      }
      else {
        // An identifier can start with at most two underscores that must be followed by an alphabetic character.
        return this._makeToken( BarlomTokenType.ErrorInvalidIdentifier );
      }

    }
    else {
      return this._makeToken( BarlomTokenType.ANONYMOUS_LITERAL );
    }

  }

  /**
   * Processes a version literal after the start of the third segment of digits has been identified.
   * @returns {BarlomToken} the version literal recognized.
   * @private
   */
  private _processVersionLiteral() : BarlomToken {

    this._scanner.advanceWhile( isDigit );

    // Scan an optional pre-release fragment
    if ( this._scanner.hasLookAhead1Char( '-' ) ) {

      const ch2 = this._scanner.lookAhead2Char();
      if ( isIdentifierChar( ch2 ) ) {
        this._scanner.advanceSameLine( 2 );
        this._scanner.advanceWhile( isIdentifierBodyChar );
      }
      else if ( isDigit( ch2 ) ) {
        this._scanner.advanceSameLine( 2 );
        this._scanner.advanceWhile( isDigit );
      }

    }

    // Scan an optional build fragment
    if ( this._scanner.hasLookAhead1Char( '+' ) ) {

      const ch2 = this._scanner.lookAhead2Char();
      if ( isIdentifierChar( ch2 ) ) {
        this._scanner.advanceSameLine( 2 );
        this._scanner.advanceWhile( isIdentifierBodyChar );
      }
      else if ( isDigit( ch2 ) ) {
        this._scanner.advanceSameLine( 2 );
        this._scanner.advanceWhile( isDigit );
      }

    }

    return this._makeToken( BarlomTokenType.VersionLiteral );
  }

  /**
   * Scans what is expected to be by process of elimination a text esacpe sequence.
   * @returns {boolean} true if the escape sequence was recognized.
   * @private
   */
  private _scanTextEscape() : boolean {

    if ( !this._scanner.advanceOverLookAhead1Char( '\\' ) ) {
      return false;
    }

    // bfnrt"'\\
    if (
        this._scanner.advanceOverLookAhead1Char( 'b' ) ||
        this._scanner.advanceOverLookAhead1Char( 'f' ) ||
        this._scanner.advanceOverLookAhead1Char( 'n' ) ||
        this._scanner.advanceOverLookAhead1Char( 'r' ) ||
        this._scanner.advanceOverLookAhead1Char( 't' ) ||
        this._scanner.advanceOverLookAhead1Char( '"' ) ||
        this._scanner.advanceOverLookAhead1Char( "'" ) ||
        this._scanner.advanceOverLookAhead1Char( '\\' )
    ) {
      return true;
    }

    // unicode
    if ( this._scanner.advanceOverLookAhead1Char( 'u' ) ) {

      // unicode by name - see http://unicode.org/charts/charindex.html
      if ( this._scanner.advanceOverLookAhead1Char( '{' ) ) {

        if ( !this._scanner.advanceIf( isUnicodeNameChar ) ) {
          return false;
        }

        this._scanner.advanceWhile( isUnicodeNameChar );

        return this._scanner.advanceOverLookAhead1Char( '}' );

      }

      // unicode by number
      for ( let i = 0 ; i < 4 ; i += 1 ) {
        if ( !this._scanner.advanceIf( isHexDigit ) ) {
          return false;
        }
      }

      return true

    }

    return false;

  }

  private _fileName : string;

  private _scanner;

}
    
