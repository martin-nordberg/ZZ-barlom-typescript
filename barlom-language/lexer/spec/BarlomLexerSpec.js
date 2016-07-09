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
                compare: function ( tokens, expectedTokenAttributes ) {

                  for ( var i = 0; i < tokens.length; i += 1 ) {
                    if ( tokens[i].tokenType !== expectedTokenAttributes[4*i] ) {
                      return {
                        pass: false,
                        message: "Expected token type " + BarlomTokenType[expectedTokenAttributes[4*i]] + ", but found " +
                        BarlomTokenType[tokens[i].tokenType] + " for `" + tokens[i].text + "` in position " + i + "."
                      };
                    }
                    if ( tokens[i].text !== expectedTokenAttributes[4*i+1] ) {
                      return {
                        pass: false,
                        message: "Expected token text `" + expectedTokenAttributes[4*i+1] + "`, but found `" +
                        tokens[i].text + "` in position " + i + "."
                      };
                    }
                    if ( tokens[i].line !== expectedTokenAttributes[4*i+2] ) {
                      return {
                        pass: false,
                        message: "Expected token line " + expectedTokenAttributes[4*i+2] + ", but found " +
                        tokens[i].line + " for `" + tokens[i].text + "` in position " + i + "."
                      };
                    }
                    if ( tokens[i].column !== expectedTokenAttributes[4*i+3] ) {
                      return {
                        pass: false,
                        message: "Expected token column " + expectedTokenAttributes[4*i+3] + ", but found " +
                        tokens[i].column + " for `" + tokens[i].text + "` in position " + i + "."
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
            BarlomTokenType.DOT, ".", 2, 1,
            BarlomTokenType.EOF, "", 2, 3
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
            BarlomTokenType.WHITE_SPACE, "  \n", 1, 1,
            BarlomTokenType.SEMICOLON, ";", 2, 1,
            BarlomTokenType.WHITE_SPACE, " ", 2, 2,
            BarlomTokenType.EOF, "", 2, 3
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
            BarlomTokenType.DOT, ".", 1, 1,
            BarlomTokenType.RANGE_INCLUSIVE, "..", 1, 3,
            BarlomTokenType.RANGE_EXCLUSIVE, "..<", 1, 6,
            BarlomTokenType.DOT_DOT_DOT, "...", 1, 10,
            BarlomTokenType.EOF, "", 1, 13
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
            BarlomTokenType.Identifier, "_a", 1, 1,
            BarlomTokenType.Identifier, "__abc'", 1, 4,
            BarlomTokenType.AnonymousLiteral, "_", 1, 11,
            BarlomTokenType.ERROR_INVALID_IDENTIFIER, "__", 1, 13,
            BarlomTokenType.Identifier, "_a1", 1, 16,
            BarlomTokenType.EOF, "", 1, 19
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
            BarlomTokenType.COLON, ":", 1, 1,
            BarlomTokenType.COLON_COLON, "::", 1, 3,
            BarlomTokenType.COLON_COLON, "::", 1, 6,
            BarlomTokenType.COLON_COLON, "::", 1, 8,
            BarlomTokenType.COLON, ":", 1, 10,
            BarlomTokenType.EOF, "", 1, 11
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
            BarlomTokenType.CodeLiteral, "`variable code = true`", 1, 1,
            BarlomTokenType.ERROR_UNCLOSED_CODE, "`not code", 1, 24,
            BarlomTokenType.EOF, "", 1, 33
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
            BarlomTokenType.IntegerLiteral, "123", 1, 1,
            BarlomTokenType.IntegerLiteral, "45_67", 1, 5,
            BarlomTokenType.NumberLiteral, "89.01", 1, 11,
            BarlomTokenType.NumberLiteral, "23.4E+5", 1, 17,
            BarlomTokenType.NumberLiteral, "67E-8", 1, 25,
            BarlomTokenType.NumberLiteral, "90E12", 1, 31,
            BarlomTokenType.VersionLiteral, "3.4.5", 1, 37,
            BarlomTokenType.VersionLiteral, "67.89.1-ALPHA+345", 1, 43,
            BarlomTokenType.BinaryIntegerLiteral, "0b1100", 1, 61,
            BarlomTokenType.BinaryIntegerLiteral, "0B00_11", 1, 68,
            BarlomTokenType.HexIntegerLiteral, "0xAB23", 1, 76,
            BarlomTokenType.HexIntegerLiteral, "0X001a", 1, 83,
            BarlomTokenType.NumberLiteral, "1.2D", 1, 90,
            BarlomTokenType.IntegerLiteral, "3ul", 1, 95,
            BarlomTokenType.IntegerLiteral, "4S", 1, 99,
            BarlomTokenType.EOF, "", 1, 101
          ]
        );
      }
    );

    it(
      "should scan date/time literals", function () {
        var lexer = new BarlomLexer( "$2016-07-01$ $2016-07-01T12:34$ $2016-07-01T10:01Z$ $2016-07-01T10:01:59$ $2016-12-31T01:34-05:00$ $2016-11-30T01:01:01+05:00$ $2016-07-01T04:00:05.045$ $2016-07-01T04:00:05.1Z$ $2016-01-01T00:00Z$ $T12:34$", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.DateTimeLiteral, "$2016-07-01$", 1, 1,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01T12:34$", 1, 14,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01T10:01Z$", 1, 33,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01T10:01:59$", 1, 53,
            BarlomTokenType.DateTimeLiteral, "$2016-12-31T01:34-05:00$", 1, 75,
            BarlomTokenType.DateTimeLiteral, "$2016-11-30T01:01:01+05:00$", 1, 100,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01T04:00:05.045$", 1, 128,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01T04:00:05.1Z$", 1, 154,
            BarlomTokenType.DateTimeLiteral, "$2016-01-01T00:00Z$", 1, 179,
            BarlomTokenType.DateTimeLiteral, "$T12:34$", 1, 199,
            BarlomTokenType.EOF, "", 1, 207
          ]
        );
      }
    );

    it(
      "should scan single-quoted text literals", function () {
        var lexer = new BarlomLexer( " '' 'abc' ' \\t \\r\\n ' '\"' '  " );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.TextLiteral, "''", 1, 2,
            BarlomTokenType.TextLiteral, "'abc'", 1, 5,
            BarlomTokenType.TextLiteral, "' \\t \\r\\n '", 1, 11,
            BarlomTokenType.TextLiteral, "'\"'", 1, 23,
            BarlomTokenType.ERROR_UNCLOSED_TEXT_LITERAL, "'  ", 1, 27,
            BarlomTokenType.EOF, "", 1, 30
          ]
        );
      }
    );

    it(
      "should scan double-quoted text literals", function () {
        var lexer = new BarlomLexer( ' "xxx" "" " \\u01AB \\b \\u{HOT BEVERAGE}\\u{FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES}" "\'" "  \r\n ' );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.TextLiteral, '"xxx"', 1, 2,
            BarlomTokenType.TextLiteral, '""', 1, 8,
            BarlomTokenType.TextLiteral, '" \\u01AB \\b \\u{HOT BEVERAGE}\\u{FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES}"', 1, 11,
            BarlomTokenType.TextLiteral, '"\'"', 1, 95,
            BarlomTokenType.ERROR_UNCLOSED_TEXT_LITERAL, '"  ', 1, 99,
            BarlomTokenType.EOF, "", 2, 2
          ]
        );
      }
    );

    it(
      "should scan single-quoted multiline text literals", function () {
        var lexer = new BarlomLexer( "'''''' ''' '' ''' ''' abc\r\n'def'\n\"ghi\" ''' ''' \\u{ALPHA} ''' '''\r\n " );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.TextMultilineLiteral, "''''''", 1, 1,
            BarlomTokenType.TextMultilineLiteral, "''' '' '''", 1, 8,
            BarlomTokenType.TextMultilineLiteral, "''' abc\r\n'def'\n\"ghi\" '''", 1, 19,
            BarlomTokenType.TextMultilineLiteral, "''' \\u{ALPHA} '''", 3, 11,
            BarlomTokenType.ERROR_UNCLOSED_MULTILINE_TEXT_LITERAL, "'''\r\n ", 3, 29,
            BarlomTokenType.EOF, "", 4, 2
          ]
        );
      }
    );

  }
);
