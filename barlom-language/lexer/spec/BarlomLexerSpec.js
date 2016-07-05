/**
 * Specification for BarlomLexer
 */
describe(
  "BarlomLexer", function () {

    var BarlomLexer = require( '../js/BarlomLexer' ).BarlomLexer;
    var BarlomTokenType = require( '../js/BarlomTokenType' ).BarlomTokenType;

    /**
     * Defines a matcher that compares all the tokens from a lexer run.
     */
    beforeEach(
      function () {
        jasmine.addMatchers(
          {
            toHaveTokenTypes: function () {
              return {
                compare: function ( tokens, expectedTokenTypes ) {

                  for ( var i = 0; i < tokens.length; i += 1 ) {
                    if ( tokens[i].tokenType !== expectedTokenTypes[i] ) {
                      return {
                        pass: false,
                        message: "Expected token type " + BarlomTokenType[expectedTokenTypes[i]] + ", but found " +
                        BarlomTokenType[tokens[i].tokenType] + " in position " + i + "."
                      };
                    }
                  }

                  return {
                    pass: true
                  }
                }
              };
            }
          }
        );
      }
    );

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
      "should ignore white space by default", function () {
        var lexer = new BarlomLexer( "  \n. ", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes( [BarlomTokenType.DOT, BarlomTokenType.EOF] );
      }
    );

    it(
      "should not ignore white space when so configured", function () {
        var lexer = new BarlomLexer( "  \n; ", "example.barlom", { skipWhiteSpace: false } );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.WHITE_SPACE,
            BarlomTokenType.SEMICOLON,
            BarlomTokenType.WHITE_SPACE,
            BarlomTokenType.EOF
          ]
        );
      }
    );

    it(
      "should scan dot tokens", function () {
        var lexer = new BarlomLexer( ". .. ..< ...", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.DOT,
            BarlomTokenType.RANGE_INCLUSIVE,
            BarlomTokenType.RANGE_EXCLUSIVE,
            BarlomTokenType.DOT_DOT_DOT,
            BarlomTokenType.EOF
          ]
        );
      }
    );

    it(
      "should scan underscore tokens", function () {
        var lexer = new BarlomLexer( "_a __abc' _ __ _a1", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.Identifier,
            BarlomTokenType.Identifier,
            BarlomTokenType.AnonymousLiteral,
            BarlomTokenType.ERROR_INVALID_IDENTIFIER,
            BarlomTokenType.Identifier,
            BarlomTokenType.EOF
          ]
        );
      }
    );

  }
);
