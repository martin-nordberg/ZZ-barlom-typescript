/**
 * Specification for BarlomLexer
 */
describe(
  "BarlomLexer", function () {

    var BarlomLexer = require( '../../js/lexer/src/BarlomLexer' ).BarlomLexer;
    var BarlomTokenType = require( '../../js/lexer/src/BarlomTokenType' ).BarlomTokenType;

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
      "should scan dot tokens", function () {
        var lexer = new BarlomLexer( ". .. ..< ... .?", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.DOT, ".", 1, 1,
            BarlomTokenType.RANGE_INCLUSIVE, "..", 1, 3,
            BarlomTokenType.RANGE_EXCLUSIVE, "..<", 1, 6,
            BarlomTokenType.DOT_DOT_DOT, "...", 1, 10,
            BarlomTokenType.DOT_QUESTION, ".?", 1, 14,
            BarlomTokenType.EOF, "", 1, 16
          ]
        );
      }
    );

    it(
      "should scan slash tokens", function () {
        var lexer = new BarlomLexer( "/ /= /** asdfasd asdf \r\n asdf asdf asdf*/ /**/ /* asdfasdf asdf", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.DIVIDED_BY, "/", 1, 1,
            BarlomTokenType.DIVIDE_EQUALS, "/=", 1, 3,
            BarlomTokenType.Documentation, "/** asdfasd asdf \r\n asdf asdf asdf*/", 1, 6,
            BarlomTokenType.Documentation, "/**/", 2, 19,
            BarlomTokenType.ErrorUnclosedBlockComment, "/* asdfasdf asdf", 2, 24,
            BarlomTokenType.EOF, "", 2, 40
          ]
        );
      }
    );

    it(
      "should scan ampersand tokens", function () {
        var lexer = new BarlomLexer( "& &=", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.CONCATENATE, "&", 1, 1,
            BarlomTokenType.CONCAT_EQUALS, "&=", 1, 3,
            BarlomTokenType.EOF, "", 1, 5
          ]
        );
      }
    );

    it(
      "should scan asterisk tokens", function () {
        var lexer = new BarlomLexer( "* *=", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.TIMES, "*", 1, 1,
            BarlomTokenType.TIMES_EQUALS, "*=", 1, 3,
            BarlomTokenType.EOF, "", 1, 5
          ]
        );
      }
    );

    it(
      "should scan plus tokens", function () {
        var lexer = new BarlomLexer( "+ +=", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.PLUS, "+", 1, 1,
            BarlomTokenType.PLUS_EQUALS, "+=", 1, 3,
            BarlomTokenType.EOF, "", 1, 5
          ]
        );
      }
    );

    it(
      "should scan caret tokens", function () {
        var lexer = new BarlomLexer( "^ ^=", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.POWER, "^", 1, 1,
            BarlomTokenType.POWER_EQUALS, "^=", 1, 3,
            BarlomTokenType.EOF, "", 1, 5
          ]
        );
      }
    );

    it(
      "should scan tilde tokens", function () {
        var lexer = new BarlomLexer( "~ ~= ~> ~~>> ~~> ~~~ ~~<> ~and~ ~nand~ ~nor~ ~not~ ~or~ ~shl~ ~shr~ ~xor~ ~zshr~", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.TILDE, "~", 1, 1,
            BarlomTokenType.TILDE_EQUALS, "~=", 1, 3,
            BarlomTokenType.ARROW_TILDE_RIGHT, "~>", 1, 6,
            BarlomTokenType.ARROW_TILDE_TILDE_DOUBLE_RIGHT, "~~>>", 1, 9,
            BarlomTokenType.ARROW_TILDE_TILDE_RIGHT, "~~>", 1, 14,
            BarlomTokenType.ARROW_TILDE_TILDE_TILDE, "~~~", 1, 18,
            BarlomTokenType.ARROW_TILDE_TILDE_DIAMOND_RIGHT, "~~<>", 1, 22,
            BarlomTokenType.BITWISE_AND, "~and~", 1, 27,
            BarlomTokenType.BITWISE_NAND, "~nand~", 1, 33,
            BarlomTokenType.BITWISE_NOR, "~nor~", 1, 40,
            BarlomTokenType.BITWISE_NOT, "~not~", 1, 46,
            BarlomTokenType.BITWISE_OR, "~or~", 1, 52,
            BarlomTokenType.BITWISE_SHIFT_LEFT, "~shl~", 1, 57,
            BarlomTokenType.BITWISE_SHIFT_RIGHT, "~shr~", 1, 63,
            BarlomTokenType.BITWISE_XOR, "~xor~", 1, 69,
            BarlomTokenType.BITWISE_ZERO_SHIFT_RIGHT, "~zshr~", 1, 75,
            BarlomTokenType.EOF, "", 1, 81
          ]
        );
      }
    );

    it(
      "should scan greater than tokens", function () {
        var lexer = new BarlomLexer( "> >=", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.GREATER_THAN, ">", 1, 1,
            BarlomTokenType.GREATER_THAN_OR_EQUAL, ">=", 1, 3,
            BarlomTokenType.EOF, "", 1, 5
          ]
        );
      }
    );

    it(
      "should scan percent sign tokens", function () {
        var lexer = new BarlomLexer( "% %% %%]", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.PERCENT, "%", 1, 1,
            BarlomTokenType.PERCENT, "%", 1, 3,
            BarlomTokenType.PERCENT, "%", 1, 4,
            BarlomTokenType.GRAPH_END, "%%]", 1, 6,
            BarlomTokenType.EOF, "", 1, 9
          ]
        );
      }
    );

    it(
      "should scan basic punctuation marks", function () {
        var lexer = new BarlomLexer( ". ; , ? ??", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.DOT, ".", 1, 1,
            BarlomTokenType.SEMICOLON, ";", 1, 3,
            BarlomTokenType.COMMA, ",", 1, 5,
            BarlomTokenType.QUESTION, "?", 1, 7,
            BarlomTokenType.QUESTION_QUESTION, "??", 1, 9,
            BarlomTokenType.EOF, "", 1, 11
          ]
        );
      }
    );

    it(
      "should scan braces brackets and parentheses", function () {
        var lexer = new BarlomLexer( "()[]{}[%%", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.LEFT_PARENTHESIS, "(", 1, 1,
            BarlomTokenType.RIGHT_PARENTHESIS, ")", 1, 2,
            BarlomTokenType.LEFT_BRACKET, "[", 1, 3,
            BarlomTokenType.RIGHT_BRACKET, "]", 1, 4,
            BarlomTokenType.LEFT_BRACE, "{", 1, 5,
            BarlomTokenType.RIGHT_BRACE, "}", 1, 6,
            BarlomTokenType.GRAPH_START, "[%%", 1, 7,
            BarlomTokenType.EOF, "", 1, 10
          ]
        );
      }
    );

    it(
      "should scan equals tokens", function () {
        var lexer = new BarlomLexer( "= => ==> ==>> ==<>", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.EQUALS, "=", 1, 1,
            BarlomTokenType.ARROW_EQUAL_RIGHT, "=>", 1, 3,
            BarlomTokenType.ARROW_EQUAL_EQUAL_RIGHT, "==>", 1, 6,
            BarlomTokenType.ARROW_EQUAL_EQUAL_DOUBLE_RIGHT, "==>>", 1, 10,
            BarlomTokenType.ARROW_EQUAL_EQUAL_DIAMOND_RIGHT, "==<>", 1, 15,
            BarlomTokenType.EOF, "", 1, 19
          ]
        );
      }
    );

    it(
      "should scan left brace tokens", function () {
        var lexer = new BarlomLexer( "{ {{ {{{ {{}} }}} { {{{ }}", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.LEFT_BRACE, "{", 1, 1,
            BarlomTokenType.LEFT_BRACE, "{", 1, 3,
            BarlomTokenType.LEFT_BRACE, "{", 1, 4,
            BarlomTokenType.TemplateLiteral, "{{{ {{}} }}}", 1, 6,
            BarlomTokenType.LEFT_BRACE, "{", 1, 19,
            BarlomTokenType.ErrorUnclosedTemplate, "{{{ }}", 1, 21,
            BarlomTokenType.EOF, "", 1, 27
          ]
        );
      }
    );

    it(
      "should scan dash tokens", function () {
        var lexer = new BarlomLexer( "- -> -= --- --> -->> --<>", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.MINUS, "-", 1, 1,
            BarlomTokenType.ARROW_DASH_RIGHT, "->", 1, 3,
            BarlomTokenType.MINUS_EQUALS, "-=", 1, 6,
            BarlomTokenType.ARROW_DASH_DASH_DASH, "---", 1, 9,
            BarlomTokenType.ARROW_DASH_DASH_RIGHT, "-->", 1, 13,
            BarlomTokenType.ARROW_DASH_DASH_DOUBLE_RIGHT, "-->>", 1, 17,
            BarlomTokenType.ARROW_DASH_DASH_DIAMOND_RIGHT, "--<>", 1, 22,
            BarlomTokenType.EOF, "", 1, 26
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
            BarlomTokenType.ANONYMOUS_LITERAL, "_", 1, 11,
            BarlomTokenType.ErrorInvalidIdentifier, "__", 1, 13,
            BarlomTokenType.Identifier, "_a1", 1, 16,
            BarlomTokenType.EOF, "", 1, 19
          ]
        );
      }
    );

    it(
      "should scan colon tokens", function () {
        var lexer = new BarlomLexer( ": :: ::::: :> ::>", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.COLON, ":", 1, 1,
            BarlomTokenType.COLON_COLON, "::", 1, 3,
            BarlomTokenType.COLON_COLON, "::", 1, 6,
            BarlomTokenType.COLON_COLON, "::", 1, 8,
            BarlomTokenType.COLON, ":", 1, 10,
            BarlomTokenType.ARROW_COLON_RIGHT, ":>", 1, 12,
            BarlomTokenType.ARROW_COLON_COLON_RIGHT, "::>", 1, 15,
            BarlomTokenType.EOF, "", 1, 18
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
            BarlomTokenType.ErrorUnclosedCodeLiteral, "`not code", 1, 24,
            BarlomTokenType.EOF, "", 1, 33
          ]
        );
      }
    );

    it(
      "should scan user-defined keywords", function () {
        var lexer = new BarlomLexer( "#abc #x_z1 #_abc", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.Tag, "#abc", 1, 1,
            BarlomTokenType.Tag, "#x_z", 1, 6,
            BarlomTokenType.IntegerLiteral_Decimal, "1", 1, 10,
            BarlomTokenType.ErrorUnexpectedCharacter, "#", 1, 12,
            BarlomTokenType.Identifier, "_abc", 1, 13,
            BarlomTokenType.EOF, "", 1, 17
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
            BarlomTokenType.IntegerLiteral_Decimal, "123", 1, 1,
            BarlomTokenType.IntegerLiteral_Decimal, "45_67", 1, 5,
            BarlomTokenType.NumberLiteral, "89.01", 1, 11,
            BarlomTokenType.NumberLiteral, "23.4E+5", 1, 17,
            BarlomTokenType.NumberLiteral, "67E-8", 1, 25,
            BarlomTokenType.NumberLiteral, "90E12", 1, 31,
            BarlomTokenType.VersionLiteral, "3.4.5", 1, 37,
            BarlomTokenType.VersionLiteral, "67.89.1-ALPHA+345", 1, 43,
            BarlomTokenType.IntegerLiteral_Binary, "0b1100", 1, 61,
            BarlomTokenType.IntegerLiteral_Binary, "0B00_11", 1, 68,
            BarlomTokenType.IntegerLiteral_Hex, "0xAB23", 1, 76,
            BarlomTokenType.IntegerLiteral_Hex, "0X001a", 1, 83,
            BarlomTokenType.NumberLiteral, "1.2D", 1, 90,
            BarlomTokenType.IntegerLiteral_Decimal, "3ul", 1, 95,
            BarlomTokenType.IntegerLiteral_Decimal, "4S", 1, 99,
            BarlomTokenType.EOF, "", 1, 101
          ]
        );
      }
    );

    it(
      "should scan date/time literals", function () {
        var lexer = new BarlomLexer( "$ $$ $2016-07-01$ $2016-07-01T12:34$ $2016-07-01T10:01Z$ $2016-07-01T10:01:59$ $2016-12-31T01:34-05:00$ $2016-11-30T01:01:01+05:00$ $2016-07-01T04:00:05.045$ $2016-07-01T04:00:05.1Z$ $2016-01-01T00:00Z$ $T12:34$ $T", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.TO_STRING, "$", 1, 1,
            BarlomTokenType.TO_STRING, "$", 1, 3,
            BarlomTokenType.TO_STRING, "$", 1, 4,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01$", 1, 6,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01T12:34$", 1, 19,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01T10:01Z$", 1, 38,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01T10:01:59$", 1, 58,
            BarlomTokenType.DateTimeLiteral, "$2016-12-31T01:34-05:00$", 1, 80,
            BarlomTokenType.DateTimeLiteral, "$2016-11-30T01:01:01+05:00$", 1, 105,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01T04:00:05.045$", 1, 133,
            BarlomTokenType.DateTimeLiteral, "$2016-07-01T04:00:05.1Z$", 1, 159,
            BarlomTokenType.DateTimeLiteral, "$2016-01-01T00:00Z$", 1, 184,
            BarlomTokenType.DateTimeLiteral, "$T12:34$", 1, 204,
            BarlomTokenType.ErrorInvalidTimeLiteral, "$T", 1, 213,
            BarlomTokenType.EOF, "", 1, 215
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
            BarlomTokenType.TextLiteral_SingleQuoted, "''", 1, 2,
            BarlomTokenType.TextLiteral_SingleQuoted, "'abc'", 1, 5,
            BarlomTokenType.TextLiteral_SingleQuoted, "' \\t \\r\\n '", 1, 11,
            BarlomTokenType.TextLiteral_SingleQuoted, "'\"'", 1, 23,
            BarlomTokenType.ErrorUnclosedTextLiteral, "'  ", 1, 27,
            BarlomTokenType.EOF, "", 1, 30
          ]
        );
      }
    );

    it(
      "should scan location literals", function () {
        var lexer = new BarlomLexer( "@ @|asdfasdfasdf| @|asfdasdf", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.AT, "@", 1, 1,
            BarlomTokenType.LocationLiteral, "@|asdfasdfasdf|", 1, 3,
            BarlomTokenType.ErrorUnclosedLocationLiteral, "@|asfdasdf", 1, 19,
            BarlomTokenType.EOF, "", 1, 29
          ]
        );
      }
    );

    it(
      "should scan left arrow literals", function () {
        var lexer = new BarlomLexer( "<--> <--  <->  <-   <==> <==  <=>  <=   <~~> <~~  <~>  <~   <::> <::  <:>  <:   <<-- <<== <<~~ <>-- <>== <>~~ <>   <" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.ARROW_DASH_DASH_LEFT_RIGHT, "<-->", 1, 1,
            BarlomTokenType.ARROW_DASH_DASH_LEFT, "<--", 1, 6,
            BarlomTokenType.ARROW_DASH_LEFT_RIGHT, "<->", 1, 11,
            BarlomTokenType.ARROW_DASH_LEFT, "<-", 1, 16,
            BarlomTokenType.ARROW_EQUAL_EQUAL_LEFT_RIGHT, "<==>", 1, 21,
            BarlomTokenType.ARROW_EQUAL_EQUAL_LEFT, "<==", 1, 26,
            BarlomTokenType.COMPARE, "<=>", 1, 31,
            BarlomTokenType.LESS_THAN_OR_EQUAL, "<=", 1, 36,
            BarlomTokenType.ARROW_TILDE_TILDE_LEFT_RIGHT, "<~~>", 1, 41,
            BarlomTokenType.ARROW_TILDE_TILDE_LEFT, "<~~", 1, 46,
            BarlomTokenType.ARROW_TILDE_LEFT_RIGHT, "<~>", 1, 51,
            BarlomTokenType.ARROW_TILDE_LEFT, "<~", 1, 56,
            BarlomTokenType.ARROW_COLON_COLON_LEFT_RIGHT, "<::>", 1, 61,
            BarlomTokenType.ARROW_COLON_COLON_LEFT, "<::", 1, 66,
            BarlomTokenType.ARROW_COLON_LEFT_RIGHT, "<:>", 1, 71,
            BarlomTokenType.ARROW_COLON_LEFT, "<:", 1, 76,
            BarlomTokenType.ARROW_DASH_DASH_DOUBLE_LEFT, "<<--", 1, 81,
            BarlomTokenType.ARROW_EQUAL_EQUAL_DOUBLE_LEFT, "<<==", 1, 86,
            BarlomTokenType.ARROW_TILDE_TILDE_DOUBLE_LEFT, "<<~~", 1, 91,
            BarlomTokenType.ARROW_DASH_DASH_DIAMOND_LEFT, "<>--", 1, 96,
            BarlomTokenType.ARROW_EQUAL_EQUAL_DIAMOND_LEFT, "<>==", 1, 101,
            BarlomTokenType.ARROW_TILDE_TILDE_DIAMOND_LEFT, "<>~~", 1, 106,
            BarlomTokenType.NOT_EQUAL_TO, "<>", 1, 111,
            BarlomTokenType.LESS_THAN, "<", 1, 116,
            BarlomTokenType.EOF, "", 1, 117
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
            BarlomTokenType.TextLiteral_DoubleQuoted, '"xxx"', 1, 2,
            BarlomTokenType.TextLiteral_DoubleQuoted, '""', 1, 8,
            BarlomTokenType.TextLiteral_DoubleQuoted, '" \\u01AB \\b \\u{HOT BEVERAGE}\\u{FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES}"', 1, 11,
            BarlomTokenType.TextLiteral_DoubleQuoted, '"\'"', 1, 95,
            BarlomTokenType.ErrorUnclosedTextLiteral, '"  ', 1, 99,
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
            BarlomTokenType.TextLiteral_SingleQuotedMultiline, "''''''", 1, 1,
            BarlomTokenType.TextLiteral_SingleQuotedMultiline, "''' '' '''", 1, 8,
            BarlomTokenType.TextLiteral_SingleQuotedMultiline, "''' abc\r\n'def'\n\"ghi\" '''", 1, 19,
            BarlomTokenType.TextLiteral_SingleQuotedMultiline, "''' \\u{ALPHA} '''", 3, 11,
            BarlomTokenType.ErrorUnclosedTextLiteralMultiline, "'''\r\n ", 3, 29,
            BarlomTokenType.EOF, "", 4, 2
          ]
        );
      }
    );

    it(
      "should scan regular expression literals", function () {
        var lexer = new BarlomLexer( "~// ~/asdasdf/ ~/sgsdfgdsfg/igm ~/sgsdfg\n ~/sdfgsdfg", "example.barlom" );

        var tokens = lexer.readAllTokens();

        expect( tokens ).toHaveTokenTypes(
          [
            BarlomTokenType.RegularExpressionLiteral, "~//", 1, 1,
            BarlomTokenType.RegularExpressionLiteral, "~/asdasdf/", 1, 5,
            BarlomTokenType.RegularExpressionLiteral, "~/sgsdfgdsfg/igm", 1, 16,
            BarlomTokenType.ErrorUnclosedRegularExpression, "~/sgsdfg", 1, 33,
            BarlomTokenType.ErrorUnclosedRegularExpression, "~/sdfgsdfg", 2, 2,
            BarlomTokenType.EOF, "", 2, 12
          ]
        );
      }
    );

  }
);
