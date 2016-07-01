/**
 * Created by mnordberg on 6/28/16.
 */


describe(
  "BarlomLexer", function () {

    var BarlomLexer = require( '../js/BarlomLexer' ).BarlomLexer;
    var BarlomTokenType = require( '../js/BarlomTokenType' ).BarlomTokenType;

    it(
      "should read an identifier token", function () {
        var lexer = new BarlomLexer( "stuff", "example.barlom" );

        var token = lexer.readToken();

        expect( token.tokenType ).toBe( BarlomTokenType.Identifier );
        expect( token.text ).toBe( "stuff" );
        expect( token.fileName ).toBe( "example.barlom" );
        expect( token.line ).toBe( 1 );
        expect( token.column ).toBe( 1 );
      }
    );

    it(
      "should read a keyword token", function () {
        var lexer = new BarlomLexer( "module : extra", "example.barlom" );

        var token = lexer.readToken();

        expect( token.tokenType ).toBe( BarlomTokenType.MODULE );
        expect( token.text ).toBe( "module" );
        expect( token.fileName ).toBe( "example.barlom" );
        expect( token.line ).toBe( 1 );
        expect( token.column ).toBe( 1 );
      }
    );

    it(
      "should ignore white space when so configured", function () {
        var lexer = new BarlomLexer( "  \n. ", "example.barlom" );

        var token1 = lexer.readToken();
        var token2 = lexer.readToken();

        expect( token1.tokenType ).toBe( BarlomTokenType.DOT );
        expect( token2.tokenType ).toBe( BarlomTokenType.EOF );
      }
    );

    it(
      "should not ignore white space when so configured", function () {
        var lexer = new BarlomLexer( "  \n; ", "example.barlom", { skipWhiteSpace: false } );

        var token1 = lexer.readToken();
        var token2 = lexer.readToken();
        var token3 = lexer.readToken();
        var token4 = lexer.readToken();

        expect( token1.tokenType ).toBe( BarlomTokenType.WHITE_SPACE );
        expect( token2.tokenType ).toBe( BarlomTokenType.SEMICOLON );
        expect( token3.tokenType ).toBe( BarlomTokenType.WHITE_SPACE );
        expect( token4.tokenType ).toBe( BarlomTokenType.EOF );
      }
    );

  }
);
