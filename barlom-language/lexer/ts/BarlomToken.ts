
import { BarlomTokenType } from './BarlomTokenType';

/**
 * Classic token returned from lexer and kept by parser.
 */
export class BarlomToken {

  constructor( tokenType : BarlomTokenType, text : string, fileName : string, line : number, column : number ) {
    this._tokenType = tokenType;
    this._text = text;
    this._fileName = fileName;
    this._line = line;
    this._column = column;
  }

  get column() : number {
    return this._column;
  }

  get fileName() : string {
    return this._fileName;
  }

  get line() : number {
    return this._line;
  }

  get text() : string {
    return this._text;
  }

  get tokenType() : BarlomTokenType {
    return this._tokenType;
  }

  /**
   * Creates a new token the same as this one but with a different token type. E.g. a token initially thought to be
   * an identifier then determined to be a keyword.
   * @param tokenType the type for the returned token.
   * @returns {BarlomToken} a new token with the same attributes as this one except the type.
   */
  withRevisedTokenType( tokenType : BarlomTokenType ) : BarlomToken {
    return new BarlomToken( tokenType, this._text, this._fileName, this._line, this._column );
  }

  private _column : number;
  private _fileName : string;
  private _line : number;
  private _text : string;
  private _tokenType : BarlomTokenType;

}