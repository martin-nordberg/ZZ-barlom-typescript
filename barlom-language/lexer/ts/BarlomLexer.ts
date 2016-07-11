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
    isQuoteChar,
    isUnicodeNameChar,
    isWhiteSpace
} from './LexerPredicates';
import { Scanner } from './Scanner';

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
    this._scanner = new Scanner( code );

    this._skipComments = options.hasOwnProperty( 'skipComments' ) ? options.skipComments : true;
    this._skipWhiteSpace = options.hasOwnProperty( 'skipWhiteSpace' ) ? options.skipWhiteSpace : true;
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

    var ch = this._scanner.scanChar();
    // Jump out early for end of file.
    if ( ch === '' ) {
      return new BarlomToken( BarlomTokenType.EOF, '', this._fileName, this._scanner.startLine, this._scanner.startColumn );
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

    // Process text literals
    if ( isQuoteChar( ch ) ) {
      return this._processQuote( ch );
    }

    // Process numeric tokens
    if ( isDigit( ch ) ) {
      return this._processNumeric( ch );
    }

    // Process tokens starting with a dash
    if ( ch === '-' ) {
      return this._processDash();
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
   * Process a back-tick-delimited code literal.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processCodeLiteral() : BarlomToken {

    while ( true ) {

      if ( this._scanner.isEof() ) {
        return this._makeToken( BarlomTokenType.ERROR_UNCLOSED_CODE );
      }

      if ( this._scanner.advanceOverLookAhead1Char( '`' ) ) {
        return this._makeToken( BarlomTokenType.CodeLiteral );
      }

      this._scanner.advance();

    }

  }

  /**
   * Processes a token starting with a colon.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processColon() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( ':' ) ) {
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

    // Year/month/day
    if ( this._scanner.advanceIf( isDigit ) ) {

      // year
      for ( var i = 0; i < 3; i += 1 ) {
        if ( !this._scanner.advanceIf( isDigit ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }
      }

      if ( !this._scanner.advanceOverLookAhead1Char( '-' ) ) {
        return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
      }

      // month
      for ( var i = 0; i < 2; i += 1 ) {
        if ( !this._scanner.advanceIf( isDigit ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }
      }

      if ( !this._scanner.advanceOverLookAhead1Char( '-' ) ) {
        return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
      }

      // day
      for ( var i = 0; i < 2; i += 1 ) {
        if ( !this._scanner.advanceIf( isDigit ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }
      }

    }

    // Time
    if ( this._scanner.advanceOverLookAhead1Char( 'T' ) ) {

      // hour
      for ( var i = 0; i < 2; i += 1 ) {
        if ( !this._scanner.advanceIf( isDigit ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }
      }

      if ( !this._scanner.advanceOverLookAhead1Char( ':' ) ) {
        return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
      }

      // minutes
      for ( var i = 0; i < 2; i += 1 ) {
        if ( !this._scanner.advanceIf( isDigit ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }
      }

      // seconds
      if ( this._scanner.advanceOverLookAhead1Char( ':' ) ) {

        for ( var i = 0; i < 2; i += 1 ) {
          if ( !this._scanner.advanceIf( isDigit ) ) {
            return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
          }
        }

        // seconds fraction
        if ( this._scanner.advanceOverLookAhead1Char( '.' ) ) {
          if ( !this._scanner.advanceIf( isDigit ) ) {
            return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
          }

          for ( var i = 0; i < 2; i += 1 ) {
            if ( !this._scanner.advanceIf( isDigit ) ) {
              break;
            }
          }
        }

      }

      // time zone
      if ( this._scanner.advanceOverLookAhead1Char( '+' ) || this._scanner.advanceOverLookAhead1Char( '-' ) ) {

        // hour
        for ( var i = 0; i < 2; i += 1 ) {
          if ( !this._scanner.advanceIf( isDigit ) ) {
            return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
          }
        }

        if ( !this._scanner.advanceOverLookAhead1Char( ':' ) ) {
          return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
        }

        // minutes
        for ( var i = 0; i < 2; i += 1 ) {
          if ( !this._scanner.advanceIf( isDigit ) ) {
            return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
          }
        }

      }
      else {
        this._scanner.advanceOverLookAhead1Char( 'Z' );
      }

    }

    if ( !this._scanner.advanceOverLookAhead1Char( '$' ) ) {
      return this._makeToken( BarlomTokenType.ERROR_INVALID_TIME_LITERAL );
    }

    return this._makeToken( BarlomTokenType.DateTimeLiteral );
  }

  /**
   * Processes a token starting with a dash character: '-', '--', '->', '-=', '---', '--(', '-->'.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processDash() : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( '-' ) ) {

      if ( this._scanner.advanceOverLookAhead1Char( '(' ) ) {
        return this._makeToken( BarlomTokenType.EDGE_LPAREN );
      }
      else if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
        return this._makeToken( BarlomTokenType.EDGE_RIGHT );
      }
      else if ( this._scanner.advanceOverLookAhead1Char( '-' ) ) {
        return this._makeToken( BarlomTokenType.EDGE_PLAIN );
      }

      return this._makeToken( BarlomTokenType.MINUS_MINUS );

    }

    if ( this._scanner.advanceOverLookAhead1Char( '>' ) ) {
      return this._makeToken( BarlomTokenType.ARROW );
    }

    if ( this._scanner.advanceOverLookAhead1Char( '=' ) ) {
      return this._makeToken( BarlomTokenType.MINUS_EQUALS );
    }

    return this._makeToken( BarlomTokenType.MINUS );
  }

  /**
   * Processes a token starting with a period character.
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

    return this._makeToken( BarlomTokenType.DOT );
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
   * Processes a multi-line quoted string after the opening three quote characters have been scanned.
   * @param quoteChar the quote character seen.
   * @private
   */
  private _processMultilineTextLiteral( quoteChar : string ) : BarlomToken {

    function isNotClosingQuoteOrBackSlashOrNewLine( ch : string ) : boolean {
      return ch !== quoteChar && ch != '\\' && ch !== '\r' && ch != '\n';
    }

    while ( true ) {

      this._scanner.advanceWhile( isNotClosingQuoteOrBackSlashOrNewLine );

      if ( this._scanner.advanceOverLookAhead1Char( quoteChar ) ) {

        if ( this._scanner.advanceOverLookAhead1Char( quoteChar ) &&
            this._scanner.advanceOverLookAhead1Char( quoteChar ) ) {
          return this._makeToken( BarlomTokenType.TextMultilineLiteral );
        }

        continue;

      }
      
      if ( this._scanner.hasLookAhead1Char( '\r' ) || this._scanner.hasLookAhead1Char( '\n' ) ) {
        this._scanner.advance();
        continue;
      }

      if ( !this._scanTextEscape() ) {
        break;
      }

    }

    if ( this._scanner.isEof() ) {
      return this._makeToken( BarlomTokenType.ERROR_UNCLOSED_MULTILINE_TEXT_LITERAL )
    }

    return this._makeToken( BarlomTokenType.ERROR_INVALID_MULTILINE_TEXT_LITERAL )

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
        return this._makeToken( BarlomTokenType.BinaryIntegerLiteral );
      }

      if ( ( this._scanner.hasLookAhead1Char( 'x' ) || this._scanner.hasLookAhead1Char( 'X' ) ) &&
          isHexDigit( this._scanner.lookAhead2Char() ) ) {
        this._scanner.advanceSameLine( 2 );
        this._scanner.advanceWhile( isHexDigitOrUnderscore );
        return this._makeToken( BarlomTokenType.HexIntegerLiteral );
      }

    }

    this._scanner.advanceWhile( isDigitOrUnderscore );

    var ch1 = this._scanner.lookAhead1Char();
    var ch2 = this._scanner.lookAhead2Char();
    var isNumber = false;

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

    return this._makeToken( BarlomTokenType.IntegerLiteral );

  }

  /**
   * Processes a token starting with a single or double quote.
   * @param quoteChar the opening quote character.
   * @private
   */
  private _processQuote( quoteChar : string ) : BarlomToken {

    if ( this._scanner.advanceOverLookAhead1Char( quoteChar ) ) {

      // multiline text literal
      if ( this._scanner.advanceOverLookAhead1Char( quoteChar ) ) {
        return this._processMultilineTextLiteral( quoteChar );
      }

      // empty text literal
      return this._makeToken( BarlomTokenType.TextLiteral );

    }

    function isNotClosingQuoteOrBackSlashOrNewLine( ch : string ) : boolean {
      return ch !== quoteChar && ch != '\\' && ch !== '\r' && ch != '\n';
    }

    while ( true ) {

      this._scanner.advanceWhile( isNotClosingQuoteOrBackSlashOrNewLine );

      if ( this._scanner.advanceOverLookAhead1Char( quoteChar ) ) {
        return this._makeToken( BarlomTokenType.TextLiteral );
      }

      if ( !this._scanTextEscape() ) {
        break;
      }

    }

    if ( this._scanner.hasLookAhead1Char( '\r' ) || this._scanner.hasLookAhead1Char( '\n' ) || this._scanner.isEof() ) {
      return this._makeToken( BarlomTokenType.ERROR_UNCLOSED_TEXT_LITERAL )
    }

    return this._makeToken( BarlomTokenType.ERROR_INVALID_TEXT_LITERAL )

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

    this._scanner.advanceWhile( isDigit );

    // Scan an optional pre-release fragment
    if ( this._scanner.hasLookAhead1Char( '-' ) ) {

      var ch2 = this._scanner.lookAhead2Char();
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

      var ch2 = this._scanner.lookAhead2Char();
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
   * Process a sequence of white space characters.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processWhiteSpace() : BarlomToken {

    while ( isWhiteSpace( this._scanner.lookAhead1Char() ) ) {
      this._scanner.advance();
    }

    if ( this._skipWhiteSpace ) {
      return this._skip();
    }

    return this._makeToken( BarlomTokenType.WHITE_SPACE );

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
      for ( var i = 0 ; i < 4 ; i += 1 ) {
        if ( !this._scanner.advanceIf( isHexDigit ) ) {
          return false;
        }
      }

      return true

    }

    return false;

  }

  /**
   * Skips the token that has just been recognized and reads the next one instead.
   * @returns {BarlomToken} the token read after discarding the current one.
   * @private
   */
  private _skip() : BarlomToken {
    this._scanner.beginNextToken();
    return this.readToken();
  }

  private _fileName : string;
  private _scanner;
  private _skipComments : boolean;
  private _skipWhiteSpace : boolean;

}
    
