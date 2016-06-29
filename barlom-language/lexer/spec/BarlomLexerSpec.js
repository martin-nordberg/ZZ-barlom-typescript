/**
 * Created by mnordberg on 6/28/16.
 */


describe(
  "BarlomLexer", function () {

    var BarlomLexer = require( '../js/BarlomLexer' ).BarlomLexer;

    var lexer;

    beforeEach(
      function () {
        lexer = new BarlomLexer( "stuff", "example.barlom" );
      }
    );

    it(
      "should read a token", function () {
        var token = lexer.readToken();
        expect( token.text ).toBe( "junk" );
        expect( token.fileName ).toBe( "example.barlom" );
      }
    );

  }
);
