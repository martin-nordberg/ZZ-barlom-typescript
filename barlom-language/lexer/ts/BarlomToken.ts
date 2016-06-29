/**
 * Classic token returned from lexer and kept by parser.
 */
export class BarlomToken {

  constructor( text : string, fileName : string, line : number, column : number ) {
    this._text = text;
    this._fileName = fileName;
    this._line = line;
    this._column = column;
  }

  get column() {
    return this._column;
  }

  get fileName() {
    return this._fileName;
  }

  get line() {
    return this._line;
  }

  get text() {
    return this._text;
  }

  private _column;
  private _fileName;
  private _line;
  private _text;

}