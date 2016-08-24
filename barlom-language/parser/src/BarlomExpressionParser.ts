import { AstAnonymousLiteral } from '../../ast/src/literals/AstAnonymousLiteral';
import { AstBooleanLiteral } from '../../ast/src/literals/AstBooleanLiteral';
import { AstCodeLiteral } from '../../ast/src/literals/AstCodeLiteral';
import { AstDateTimeLiteral } from '../../ast/src/literals/AstDateTimeLiteral';
import { AstExpression } from '../../ast/src/expressions/AstExpression';
import { AstIntegerLiteral_Binary } from '../../ast/src/literals/AstIntegerLiteral_Binary';
import { AstIntegerLiteral_Decimal } from '../../ast/src/literals/AstIntegerLiteral_Decimal';
import { AstIntegerLiteral_Hexadecimal } from '../../ast/src/literals/AstIntegerLiteral_Hexadecimal';
import { AstNumberLiteral } from '../../ast/src/literals/AstNumberLiteral';
import { AstParenthesizedExpression } from '../../ast/src/expressions/AstParenthesizedExpression';
import { AstRegularExpressionLiteral } from '../../ast/src/literals/AstRegularExpressionLiteral';
import { AstSelfLiteral } from '../../ast/src/literals/AstSelfLiteral';
import { AstTemplateLiteral } from '../../ast/src/literals/AstTemplateLiteral';
import { AstTextLiteral_DoubleQuoted } from '../../ast/src/literals/AstTextLiteral_DoubleQuoted';
import { AstTextLiteral_DoubleQuotedMultiline } from '../../ast/src/literals/AstTextLiteral_DoubleQuotedMultiline';
import { AstTextLiteral_SingleQuoted } from '../../ast/src/literals/AstTextLiteral_SingleQuoted';
import { AstTextLiteral_SingleQuotedMultiline } from '../../ast/src/literals/AstTextLiteral_SingleQuotedMultiline';
import { AstUndefinedLiteral } from '../../ast/src/literals/AstUndefinedLiteral';
import { AstVersionLiteral } from '../../ast/src/literals/AstVersionLiteral';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { BarlomTokenStream } from './BarlomTokenStream';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { AstIdentifierExpression } from '../../ast/src/expressions/AstIdentifierExpression';
import { AstConditionalOrExpression } from '../../ast/src/expressions/AstConditionalOrExpression';
import { AstConditionalAndExpression } from '../../ast/src/expressions/AstConditionalAndExpression';
import { AstConcatenationExpression } from '../../ast/src/expressions/AstConcatenationExpression';
import { AstTupleLiteral } from '../../ast/src/literals/AstTupleLiteral';



/**
 * Parser for Barlom expressions.
 */
export class BarlomExpressionParser {

  /**
   * Constructs a new expression parser for the given code that came from the given file.
   * @param tokenStream the token stream to parse from.
   */
  constructor(
      tokenStream : BarlomTokenStream
  ) {
    this._tokenStream = tokenStream;
  }

  /**
   * Parses a general expression
   * @returns {AstExpression}
   */
  parseExpression() : AstExpression {

    return this._parseConditionalOrExpression();

  }

  /**
   * Parses an expression that is either an exclusive-or expression or multiple exclusive-or expressions joined by
   * 'and' or '&'.
   * @returns {AstExpression} the parsed expression.
   * @private
   */
  private _parseConditionalAndExpression() : AstExpression {

    var result = this._parseExclusiveOrExpression();

    while ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.AND ) ) {
      let andToken = this._tokenStream.consumeBufferedToken();
      let rhs = this._parseExclusiveOrExpression();
      result = new AstConditionalAndExpression( result, andToken, rhs );
    }

    while ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.CONCATENATE ) ) {
      let concatenateToken = this._tokenStream.consumeBufferedToken();
      let rhs = this._parseExclusiveOrExpression();
      result = new AstConcatenationExpression( result, concatenateToken, rhs );
    }

    return result;

  }

  /**
   * Parses an expression that is either a conditional-and expression or else multiple conditional-and expressions
   * joined by 'or'.
   * @returns {AstExpression}
   * @private
   */
  private _parseConditionalOrExpression() : AstExpression {

    var result = this._parseConditionalAndExpression();

    while ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.OR ) ) {
      let orToken = this._tokenStream.consumeBufferedToken();
      let rhs = this._parseConditionalAndExpression();
      result = new AstConditionalOrExpression( result, orToken, rhs );
    }

    return result;

  }

  private _parseExclusiveOrExpression() : AstExpression {

    // TODO: xor operator

    return this._parsePrimaryExpression();

  }

  /**
   * Parses a parenthesized expression after the opening parenthesis has been consumed.
   * @param leftParenthesisToken the opening parenthesis token.
   * @returns {AstParenthesizedExpression}
   * @private
   */
  private _parseParenthesizedExpression( leftParenthesisToken : BarlomToken ) : AstExpression {

    let innerExpression = this.parseExpression();

    var result : AstExpression;

    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {

      var tupleEntries = [innerExpression];

      tupleEntries.push( this.parseExpression() );

      while ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {
        tupleEntries.push( this.parseExpression() );
      }

      result = new AstTupleLiteral( leftParenthesisToken, tupleEntries )

    }
    else {

      result = new AstParenthesizedExpression( leftParenthesisToken, innerExpression )

    }

    this._tokenStream.consumeExpectedToken( BarlomTokenType.RIGHT_PARENTHESIS );

    return result;

  }

  /**
   * Parses a minimal (non-operator) expression.
   * @returns {AstExpression}
   */
  private _parsePrimaryExpression() : AstExpression {

    let token = this._tokenStream.consumeToken();

    var result : AstExpression = undefined ;

    switch ( token.tokenType ) {
      case BarlomTokenType.ANONYMOUS_LITERAL:
        result = new AstAnonymousLiteral( token );
        break;
      case BarlomTokenType.CodeLiteral:
        result = new AstCodeLiteral( token );
        break;
      case BarlomTokenType.DateTimeLiteral:
        result = new AstDateTimeLiteral( token );
        break;
      case BarlomTokenType.FALSE:
        result = new AstBooleanLiteral( token );
        break;
      case BarlomTokenType.Identifier:
        // TODO: function call
        result = new AstIdentifierExpression( token );
        break;
      case BarlomTokenType.IntegerLiteral_Binary:
        result = new AstIntegerLiteral_Binary( token );
        break;
      case BarlomTokenType.IntegerLiteral_Decimal:
        result = new AstIntegerLiteral_Decimal( token );
        break;
      case BarlomTokenType.IntegerLiteral_Hex:
        result = new AstIntegerLiteral_Hexadecimal( token );
        break;
      case BarlomTokenType.LEFT_PARENTHESIS:
        result = this._parseParenthesizedExpression( token );
        break;
      case BarlomTokenType.NumberLiteral:
        result = new AstNumberLiteral( token );
        break;
      case BarlomTokenType.RegularExpressionLiteral:
        result = new AstRegularExpressionLiteral( token );
        break;
      case BarlomTokenType.SELF:
        result = new AstSelfLiteral( token );
        break;
      case BarlomTokenType.TemplateLiteral:
        result = new AstTemplateLiteral( token );
        break;
      case BarlomTokenType.TextLiteral_DoubleQuoted:
        result = new AstTextLiteral_DoubleQuoted( token );
        break;
      case BarlomTokenType.TextLiteral_DoubleQuotedMultiline:
        result = new AstTextLiteral_DoubleQuotedMultiline( token );
        break;
      case BarlomTokenType.TextLiteral_SingleQuoted:
        result = new AstTextLiteral_SingleQuoted( token );
        break;
      case BarlomTokenType.TextLiteral_SingleQuotedMultiline:
        result = new AstTextLiteral_SingleQuotedMultiline( token );
        break;
      case BarlomTokenType.TRUE:
        result = new AstBooleanLiteral( token );
        break;
      case BarlomTokenType.UNDEFINED:
        result = new AstUndefinedLiteral( token );
        break;
      case BarlomTokenType.VersionLiteral:
        result = new AstVersionLiteral( token );
        break;
      default:
        break;
    }

    // TODO: dot continues the expression

    return result;

  }

  private _tokenStream : BarlomTokenStream;

}
