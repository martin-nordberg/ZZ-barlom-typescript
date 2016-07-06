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
                    if ( tokens[i].tokenType !== expectedTokenTypes[2*i] ) {
                      return {
                        pass: false,
                        message: "Expected token type " + BarlomTokenType[expectedTokenTypes[2*i]] + ", but found " +
                        BarlomTokenType[tokens[i].tokenType] + " in position " + i + "."
                      };
                    }
                    if ( tokens[i].text !== expectedTokenTypes[2*i+1] ) {
                      return {
                        pass: false,
                        message: "Expected token text `" + expectedTokenTypes[2*i+1] + "`, but found `" +
                        tokens[i].text + "` in position " + i + "."
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

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.DOT, ".",
            BarlomTokenType.EOF, ""
          ]
        );
      }
    );

    it(
      "should not ignore white space when so configured", function () {
        var lexer = new BarlomLexer( "  \n; ", "example.barlom", { skipWhiteSpace: false } );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.WHITE_SPACE, "  \n",
            BarlomTokenType.SEMICOLON, ";",
            BarlomTokenType.WHITE_SPACE, " ",
            BarlomTokenType.EOF, ""
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
            BarlomTokenType.DOT, ".",
            BarlomTokenType.RANGE_INCLUSIVE, "..",
            BarlomTokenType.RANGE_EXCLUSIVE, "..<",
            BarlomTokenType.DOT_DOT_DOT, "...",
            BarlomTokenType.EOF, ""
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
            BarlomTokenType.Identifier, "_a",
            BarlomTokenType.Identifier, "__abc'",
            BarlomTokenType.AnonymousLiteral, "_",
            BarlomTokenType.ERROR_INVALID_IDENTIFIER, "__",
            BarlomTokenType.Identifier, "_a1",
            BarlomTokenType.EOF, ""
          ]
        );
      }
    );

    it(
      "should scan colon tokens", function () {
        var lexer = new BarlomLexer( ": :: :::::", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.COLON, ":",
            BarlomTokenType.COLON_COLON, "::",
            BarlomTokenType.COLON_COLON, "::",
            BarlomTokenType.COLON_COLON, "::",
            BarlomTokenType.COLON, ":",
            BarlomTokenType.EOF, ""
          ]
        );
      }
    );

    it(
      "should scan code literals", function () {
        var lexer = new BarlomLexer( "`variable code = true` `not code", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.CodeLiteral, "`variable code = true`",
            BarlomTokenType.ERROR_UNCLOSED_CODE, "`not code",
            BarlomTokenType.EOF, ""
          ]
        );
      }
    );

    it(
      "should scan numeric tokens", function () {
        var lexer = new BarlomLexer( "123 45_67 89.01 23.4E+5 67E-8 90E12 3.4.5 67.89.1-ALPHA+345 0b1100 0B00_11 0xAB23 0X001a 1.2D 3ul 4S", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.IntegerLiteral, "123",
            BarlomTokenType.IntegerLiteral, "45_67",
            BarlomTokenType.NumberLiteral, "89.01",
            BarlomTokenType.NumberLiteral, "23.4E+5",
            BarlomTokenType.NumberLiteral, "67E-8",
            BarlomTokenType.NumberLiteral, "90E12",
            BarlomTokenType.VersionLiteral, "3.4.5",
            BarlomTokenType.VersionLiteral, "67.89.1-ALPHA+345",
            BarlomTokenType.BinaryIntegerLiteral, "0b1100",
            BarlomTokenType.BinaryIntegerLiteral, "0B00_11",
            BarlomTokenType.HexIntegerLiteral, "0xAB23",
            BarlomTokenType.HexIntegerLiteral, "0X001a",
            BarlomTokenType.NumberLiteral, "1.2D",
            BarlomTokenType.IntegerLiteral, "3ul",
            BarlomTokenType.IntegerLiteral, "4S",
            BarlomTokenType.EOF, ""
          ]
        );
      }
    );

  }
);
