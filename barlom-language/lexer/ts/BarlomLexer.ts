/**
 * Lexer for the Barlom language.
 */

import { BarlomToken } from "./BarlomToken";

export class BarlomLexer {

    constructor( code : string, fileName : string ) {
        this._fileName = fileName;
        this._code = code;
        
        this._position = 0;
    }
    
    public readToken() : BarlomToken {
        return new BarlomToken( this._code, this._fileName, 1, 2 );   // TODO
    }

    private _code : string;
    private _fileName : string;
    private _position : number;

}    
    
