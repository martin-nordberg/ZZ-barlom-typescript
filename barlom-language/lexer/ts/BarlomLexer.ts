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
 * @returns {boolean} if the character is a digit.
 */
function isDigit( ch : string ) {
  return ( '0' <= ch && ch <= '9' );
}

/**
 * Determines whether the given character is a numeric digit or else an underscore spacer.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} if the character is a digit or an underscore.
 */
function isDigitOrUnderscore( ch : string ) {
  return isDigit( ch ) || ch === '_';
}

/**
 * Determines whether the given character is alphabetical and can start an identifier.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} if the character can start an identifier.
 */
function isIdentifierChar( ch : string ) {
  return ( 'a' <= ch && ch <= 'z' ) ||
      ( 'A' <= ch && ch <= 'Z' );
  // TODO: Unicode ?
}

/**
 * Determines whether the given character can be part of an identifier.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} if the character can be part of an identifier.
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

    // Process an identifier starting with an underscore or else just '_'.
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
      if ( this._hasLookAheadChar( ':' ) ) {
        return this._makeToken( BarlomTokenType.COLON_COLON );
      }
      return this._makeToken( BarlomTokenType.COLON );
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
   * Advances the end indexes of the token when the last character is known to not be a line feed.
   * @private
   */
  private _advanceSameLine() : void {
    this._endPos += 1;
    this._endCol += 1;
  }

  /**
   * Tests whether the next character of lookahead is as given.
   * @param ch the character to look for.
   * @returns {boolean} True if the given character is next in the input.
   * @private
   */
  private _hasLookAheadChar( ch : string ) : boolean {
    if ( this._endPos >= this._code.length ) {
      return false;
    }

    return this._code.charAt( this._endPos ) === ch;
  }

  /**
   * Returns the next character of lookahead in the input.
   * @returns {string} the character found or '' for EOF.
   * @private
   */
  private _lookAheadChar() : string {
    if ( this._endPos >= this._code.length ) {
      return '';
    }

    return this._code.charAt( this._endPos );
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

  private _processDot() : BarlomToken {

    if ( this._hasLookAheadChar( '.' ) ) {
      this._advanceSameLine();
      var ch = this._lookAheadChar();

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
    var ch = this._lookAheadChar();
    while ( isIdentifierBodyChar( ch ) ) {
      this._advanceSameLine();
      ch = this._lookAheadChar();
    }

    // Allow a trailing prime.
    if ( ch === "'" ) {
      this._advanceSameLine();
    }

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
   * Process an underscore that may or may not be the start of an identifier.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processUnderscore() {

    let ch = this._lookAheadChar();

    if ( isIdentifierChar( ch ) ) {
      this._advanceSameLine();
      return this._processIdentifier();
    }
    else if ( ch === '_' ) {
      this._advanceSameLine();
      ch = this._lookAheadChar();
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
   * Process a sequence of white space characters.
   * @returns {BarlomToken} the token scanned.
   * @private
   */
  private _processWhiteSpace() {
    var ch = this._lookAheadChar();
    while ( isWhiteSpace( ch ) ) {
      this._advance( ch );
      ch = this._lookAheadChar();
    }
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
    
