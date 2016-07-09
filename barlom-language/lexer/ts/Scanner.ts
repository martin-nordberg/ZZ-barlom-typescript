/**
 * General purpose scanner.
 */
export class Scanner {

  /**
   * Constructs a scanner that will advance over tokens from the given code.
   * @param code the code to scan.
   */
  constructor(
      code : string
  ) {
    this._code = code;

    this._startPos = 0;
    this._endPos = 0;
    this._startLine = 1;
    this._endLine = 1;
    this._startCol = 1;
    this._endCol = 1;
  }

  /**
   * Advance the position and token indexes over the given character, which might be a new line character.
   * @private
   */
  public advance() {

    if ( this._code.charAt( this._endPos ) === '\n' ) {
      this._endLine += 1;
      this._endCol = 1;
    }
    else {
      this._endCol += 1;
    }

    this._endPos += 1;

  }

  /**
   * Tests whether the first character of lookahead meets a given condition. Advances one character if so.
   * @param predicate function that checks whether the next character should be advanced over.
   * @returns {boolean} True if the given character is next in the input.
   * @private
   */
  public advanceIf( predicate ) : boolean {

    if ( this._endPos >= this._code.length ) {
      return false;
    }

    if ( predicate( this._code.charAt( this._endPos ) ) ) {
      this._endPos += 1;
      this._endCol += 1;
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
  public advanceOverLookAhead1Char( ch : string ) : boolean {

    if ( this._endPos >= this._code.length ) {
      return false;
    }

    if ( this._code.charAt( this._endPos ) === ch ) {
      this._endPos += 1;
      this._endCol += 1;
      return true;
    }

    return false;

  }

  /**
   * Advances the end indexes of the token when the last character is known to not be a line feed.
   * @private
   */
  public advanceSameLine( numChars : number = 1 ) : void {
    this._endPos += numChars;
    this._endCol += numChars;
  }

  /**
   * Tests whether the first character of lookahead meets a given condition. Advances one character if so.
   * @param predicate function that checks whether the next character should be advanced over.
   * @returns {boolean} True if the given character is next in the input.
   * @private
   */
  public advanceWhile( predicate ) : void {
    while ( this._endPos < this._code.length && predicate( this._code.charAt( this._endPos ) ) ) {
      this._endPos += 1;
      this._endCol += 1;
    }
  }

  /**
   * Resets the indexes to the start of the next token.
   */
  public beginNextToken() : void {
    this._startPos = this._endPos;
    this._startLine = this._endLine;
    this._startCol = this._endCol;
  }

  /**
   * Determines whether the scanner is past the end of input.
   * @returns {boolean} true if all the characters have been consumed.
   */
  public isEof() : boolean {
    return this._endPos >= this._code.length;
  }

  /**
   * Tests whether the first character of lookahead is as given.
   * @param ch the character to look for.
   * @returns {boolean} True if the given character is next in the input.
   * @private
   */
  public hasLookAhead1Char( ch : string ) : boolean {

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
  public hasLookAhead2Char( ch : string ) : boolean {

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
  public lookAhead1Char() : string {

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
  public lookAhead2Char() : string {

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
  public lookAhead3Char() : string {

    var index = this._endPos + 2;
    if ( index >= this._code.length ) {
      return '';
    }

    return this._code.charAt( index );

  }

  /**
   * Reads the next character from the input and advances the token indexes.
   * @returns {string} the character read
   * @private
   */
  public scanChar() : string {

    if ( this._endPos >= this._code.length ) {
      return '';
    }

    let result = this._code.charAt( this._endPos );

    this.advance();

    return result;

  }

  get startColumn() : number {
    return this._startCol;
  }

  get startLine() : number {
    return this._startLine;
  }

  get tokenText() : string {
    return this._code.substring( this._startPos, this._endPos )
  }

  private _code : string;
  private _endCol : number;
  private _endLine : number;
  private _endPos : number;
  private _startCol : number;
  private _startLine : number;
  private _startPos : number;

}
    
