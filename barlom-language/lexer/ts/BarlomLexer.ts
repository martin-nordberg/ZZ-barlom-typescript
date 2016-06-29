/**
 * Lexer for the Barlom language.
 */

import { BarlomToken } from "./BarlomToken";

export class BarlomLexer {

    constructor( code : string, fileName : string ) {
        this.fileName = fileName;
        this.code = code;
        
        this.position = 0;
    }
    
    public readToken() : BarlomToken {
        return new BarlomToken( "junk", this.fileName, 1, 2 );   // TODO
    }

    private code : string;
    private fileName : string;
    private position : number;

}    
    
