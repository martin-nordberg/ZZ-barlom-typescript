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
import { AstConditionalOrExpression } from '../../ast/src/operatorexpressions/AstConditionalOrExpression';
import { AstConditionalAndExpression } from '../../ast/src/operatorexpressions/AstConditionalAndExpression';
import { AstConcatenationExpression } from '../../ast/src/operatorexpressions/AstConcatenationExpression';
import { AstTupleLiteral } from '../../ast/src/literals/AstTupleLiteral';
import { AstExclusiveOrExpression } from '../../ast/src/operatorexpressions/AstExclusiveOrExpression';
import { AstEqualityExpression } from '../../ast/src/operatorexpressions/AstEqualityExpression';
import { AstInequalityExpression } from '../../ast/src/operatorexpressions/AstInequalityExpression';
import { AstCompareExpression } from '../../ast/src/operatorexpressions/AstCompareExpression';
import { AstLessThanExpression } from '../../ast/src/operatorexpressions/AstLessThanExpression';
import { AstLessThanOrEqualExpression } from '../../ast/src/operatorexpressions/AstLessThanOrEqualExpression';
import { AstGreaterThanExpression } from '../../ast/src/operatorexpressions/AstGreaterThanExpression';
import { AstGreaterThanOrEqualExpression } from '../../ast/src/operatorexpressions/AstGreaterThanOrEqualExpression';
import { AstIsExpression } from '../../ast/src/operatorexpressions/AstIsExpression';
import { AstIsNotExpression } from '../../ast/src/operatorexpressions/AstIsNotExpression';
import { AstAdditionExpression } from '../../ast/src/operatorexpressions/AstAdditionExpression';
import { AstSubtractionExpression } from '../../ast/src/operatorexpressions/AstSubtractionExpression';
import { AstDivisionExpression } from '../../ast/src/operatorexpressions/AstDivisionExpression';
import { AstIntegerDivisionExpression } from '../../ast/src/operatorexpressions/AstIntegerDivisionExpression';
import { AstModuloExpression } from '../../ast/src/operatorexpressions/AstModuloExpression';
import { AstMultiplicationExpression } from '../../ast/src/operatorexpressions/AstMultiplicationExpression';
import { AstExponentiationExpression } from '../../ast/src/operatorexpressions/AstExponentiationExpression';
import { AstUnaryNegationExpression } from '../../ast/src/operatorexpressions/AstUnaryNegationExpression';
import { AstUnaryPositiveExpression } from '../../ast/src/operatorexpressions/AstUnaryPositiveExpression';
import { AstExclusiveRangeExpression } from '../../ast/src/operatorexpressions/AstExclusiveRangeExpression';
import { AstInclusiveRangeExpression } from '../../ast/src/operatorexpressions/AstInclusiveRangeExpression';
import { AstArrayLiteral } from '../../ast/src/literals/AstArrayLiteral';
import { AstListLiteral } from '../../ast/src/literals/AstListLiteral';
import { AstSetLiteral } from '../../ast/src/literals/AstSetLiteral';
import { AstMapLiteral } from '../../ast/src/literals/AstMapLiteral';
import { AstStructureLiteral } from '../../ast/src/literals/AstStructureLiteral';



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

  private _parseAdditiveExpression() : AstExpression {

    var result = this._parseMultiplicativeExpression();

    var keepLooking = true;

    while ( keepLooking ) {

      let token = this._tokenStream.lookAhead1Token();

      switch ( token.tokenType ) {
        case BarlomTokenType.MINUS:
          let minusToken = this._tokenStream.consumeBufferedToken();
          let minusRhs = this._parseMultiplicativeExpression();
          result = new AstSubtractionExpression( result, minusToken, minusRhs );
          break;
        case BarlomTokenType.PLUS:
          let plusToken = this._tokenStream.consumeBufferedToken();
          let plusRhs = this._parseMultiplicativeExpression();
          result = new AstAdditionExpression( result, plusToken, plusRhs );
          break;
        default:
          keepLooking = false;
          break
      }

    }

    return result;

  }

  /**
   * Parses a brace expression after the opening brace has been consumed.
   * @param leftBraceToken the opening brace token.
   * @returns {AstExpression}
   * @private
   */
  private _parseBracedExpression( leftBraceToken : BarlomToken ) : AstExpression {

    // empty set '{}'
    if ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.RIGHT_BRACE ) ) {
      return new AstSetLiteral( leftBraceToken, [], this._tokenStream.consumeBufferedToken() );
    }

    // empty map '{~>}'
    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.ARROW_TILDE_RIGHT ) ) {
      return new AstMapLiteral(
          leftBraceToken,
          [],
          [],
          this._tokenStream.consumeExpectedToken( BarlomTokenType.RIGHT_BRACE )
      );
    }

    // structure literal
    if ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.Identifier ) &&
         this._tokenStream.hasLookAhead2Token( BarlomTokenType.EQUALS ) ) {
      return this._parseStructureLiteral( leftBraceToken );
    }

    let entries = [this.parseExpression()];

    // Set of one element
    if ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.RIGHT_BRACE ) ) {
      return new AstSetLiteral( leftBraceToken, entries, this._tokenStream.consumeBufferedToken() );
    }

    // Set
    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {

      entries.push( this.parseExpression() );

      while ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {
        entries.push( this.parseExpression() );
      }

      return new AstSetLiteral(
          leftBraceToken,
          entries,
          this._tokenStream.consumeExpectedToken( BarlomTokenType.RIGHT_BRACE )
      );

    }

    // Map
    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.ARROW_TILDE_RIGHT ) ) {
      return this._parseMapLiteral( leftBraceToken, entries[0] );
    }


    throw Error( "Expected ',', '~>', or '}'." );

  }

  /**
   * Parses a bracket expression after the opening bracket has been consumed.
   * @param leftBracketToken the opening bracket token.
   * @returns {AstExpression}
   * @private
   */
  private _parseBracketedExpression( leftBracketToken : BarlomToken ) : AstExpression {

    // empty array '[]'
    if ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.RIGHT_BRACKET ) ) {
      return new AstArrayLiteral( leftBracketToken, [], this._tokenStream.consumeBufferedToken() );
    }

    // empty list '[;]'
    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.SEMICOLON ) ) {
      return new AstListLiteral(
          leftBracketToken,
          [],
          this._tokenStream.consumeExpectedToken( BarlomTokenType.RIGHT_BRACKET )
      );
    }

    // first entry
    let entries = [ this.parseExpression() ];

    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {

      entries.push( this.parseExpression() );

      while ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {
        entries.push( this.parseExpression() );
      }

      return new AstArrayLiteral(
          leftBracketToken,
          entries,
          this._tokenStream.consumeExpectedToken( BarlomTokenType.RIGHT_BRACKET )
      );

    }
    else if ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.RIGHT_BRACKET ) ) {

      return new AstArrayLiteral(
          leftBracketToken,
          entries,
          this._tokenStream.consumeExpectedToken( BarlomTokenType.RIGHT_BRACKET )
      );

    }
    else if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.SEMICOLON ) ) {

      entries.push( this.parseExpression() );

      while ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.SEMICOLON ) ) {
        entries.push( this.parseExpression() );
      }

      return new AstListLiteral(
          leftBracketToken,
          entries,
          this._tokenStream.consumeExpectedToken( BarlomTokenType.RIGHT_BRACKET )
      );

    }

    throw Error( "Expected ',', ';', or ']'." );

  }

  /**
   * Parses an expression that is either an exclusive-or expression or multiple exclusive-or expressions joined by
   * 'and' or '&'.
   * @returns {AstExpression} the parsed expression.
   * @private
   */
  private _parseConditionalAndExpression() : AstExpression {

    var result = this._parseExclusiveOrExpression();

    var keepLooking = true;

    while ( keepLooking ) {

      let token = this._tokenStream.lookAhead1Token();

      switch ( token.tokenType ) {
        case BarlomTokenType.AND:
          let andToken = this._tokenStream.consumeBufferedToken();
          let andRhs = this._parseExclusiveOrExpression();
          result = new AstConditionalAndExpression( result, andToken, andRhs );
          break;
        case BarlomTokenType.CONCATENATE:
          let concatenateToken = this._tokenStream.consumeBufferedToken();
          let concatenateRhs = this._parseExclusiveOrExpression();
          result = new AstConcatenationExpression( result, concatenateToken, concatenateRhs );
          break;
        default:
          keepLooking = false;
          break
      }

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

  private _parseEqualityExpression() : AstExpression {

    var result = this._parseRelationalExpression();

    var keepLooking = true;

    while ( keepLooking ) {

      let token = this._tokenStream.lookAhead1Token();

      switch ( token.tokenType ) {
        case BarlomTokenType.EQUALS:
          let eqToken = this._tokenStream.consumeBufferedToken();
          let eqRhs = this._parseRelationalExpression();
          result = new AstEqualityExpression( result, eqToken, eqRhs );
          break;
        case BarlomTokenType.NOT_EQUAL_TO:
          let neqToken = this._tokenStream.consumeBufferedToken();
          let neqRhs = this._parseRelationalExpression();
          result = new AstInequalityExpression( result, neqToken, neqRhs );
          break;
        default:
          keepLooking = false;
          break
      }

    }

    return result;

  }

  private _parseExclusiveOrExpression() : AstExpression {

    var result = this._parseEqualityExpression();

    while ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.XOR ) ) {
      let xorToken = this._tokenStream.consumeBufferedToken();
      let rhs = this._parseEqualityExpression();
      result = new AstExclusiveOrExpression( result, xorToken, rhs );
    }

    return result;

  }

  private _parseExponentialExpression() : AstExpression {

    var result = this._parseUnaryExpression();

    while ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.POWER ) ) {
      let powerToken = this._tokenStream.consumeBufferedToken();
      let rhs = this._parseExponentialExpression();
      result = new AstExponentiationExpression( result, powerToken, rhs );
    }

    return result;

  }

  /**
   * Parses a map literal after the left brace, first key, and '~>' have been consumed.
   * @param leftBraceToken the opening brace.
   * @param firstKey the identifier expression of the first key
   * @private
   */
  private _parseMapLiteral( leftBraceToken : BarlomToken, firstKey: AstExpression ) : AstMapLiteral {

    var keys = [ firstKey ];

    var values = [this.parseExpression()];

    while ( true ) {

      if ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.RIGHT_BRACE ) ) {
        return new AstMapLiteral( leftBraceToken, keys, values, this._tokenStream.consumeBufferedToken() );
      }

      if ( !this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {
        throw new Error( "Expected ',' or '}'." );
      }

      keys.push( this.parseExpression() );

      this._tokenStream.consumeExpectedToken( BarlomTokenType.ARROW_TILDE_RIGHT );

      values.push( this.parseExpression() );

    }

  }

  private _parseMultiplicativeExpression() : AstExpression {

    var result = this._parseExponentialExpression();

    var keepLooking = true;

    while ( keepLooking ) {

      let token = this._tokenStream.lookAhead1Token();

      switch ( token.tokenType ) {
        case BarlomTokenType.DIV:
          let divToken = this._tokenStream.consumeBufferedToken();
          let divRhs = this._parseExponentialExpression();
          result = new AstIntegerDivisionExpression( result, divToken, divRhs );
          break;
        case BarlomTokenType.DIVIDED_BY:
          let divByToken = this._tokenStream.consumeBufferedToken();
          let divByRhs = this._parseExponentialExpression();
          result = new AstDivisionExpression( result, divByToken, divByRhs );
          break;
        case BarlomTokenType.MOD:
          let modToken = this._tokenStream.consumeBufferedToken();
          let modRhs = this._parseExponentialExpression();
          result = new AstModuloExpression( result, modToken, modRhs );
          break;
        case BarlomTokenType.TIMES:
          let timesToken = this._tokenStream.consumeBufferedToken();
          let timesRhs = this._parseExponentialExpression();
          result = new AstMultiplicationExpression( result, timesToken, timesRhs );
          break;
        default:
          keepLooking = false;
          break
      }

    }

    return result;

  }

  /**
   * Parses a parenthesized expression after the opening parenthesis has been consumed.
   * @param leftParenthesisToken the opening parenthesis token.
   * @returns {AstParenthesizedExpression}
   * @private
   */
  private _parseParenthesizedExpression( leftParenthesisToken : BarlomToken ) : AstExpression {

    let innerExpression = this.parseExpression();

    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {

      var tupleEntries = [innerExpression];

      tupleEntries.push( this.parseExpression() );

      while ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {
        tupleEntries.push( this.parseExpression() );
      }

      return new AstTupleLiteral(
          leftParenthesisToken,
          tupleEntries,
          this._tokenStream.consumeExpectedToken( BarlomTokenType.RIGHT_PARENTHESIS )
      );

    }
    else {

      return new AstParenthesizedExpression(
          leftParenthesisToken,
          innerExpression,
          this._tokenStream.consumeExpectedToken( BarlomTokenType.RIGHT_PARENTHESIS )
      );

    }

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
      case BarlomTokenType.LEFT_BRACE:
        result = this._parseBracedExpression( token );
        break;
      case BarlomTokenType.LEFT_BRACKET:
        result = this._parseBracketedExpression( token );
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
      // TODO: more kinds of literals
      default:
        break;
    }

    // TODO: dot continues the expression

    return result;

  }

  private _parseRangeExpression() : AstExpression {

    var result = this._parseAdditiveExpression();

    var keepLooking = true;

    while ( keepLooking ) {

      let token = this._tokenStream.lookAhead1Token();

      switch ( token.tokenType ) {
        case BarlomTokenType.RANGE_EXCLUSIVE:
          let reToken = this._tokenStream.consumeBufferedToken();
          let reRhs = this._parseAdditiveExpression();
          result = new AstExclusiveRangeExpression( result, reToken, reRhs );
          break;
        case BarlomTokenType.RANGE_INCLUSIVE:
          let riToken = this._tokenStream.consumeBufferedToken();
          let riRhs = this._parseAdditiveExpression();
          result = new AstInclusiveRangeExpression( result, riToken, riRhs );
          break;
        default:
          keepLooking = false;
          break
      }

    }

    return result;

  }

  private _parseRelationalExpression() : AstExpression {

    var result = this._parseRangeExpression();

    var keepLooking = true;

    while ( keepLooking ) {

      let token = this._tokenStream.lookAhead1Token();

      switch ( token.tokenType ) {
        case BarlomTokenType.COMPARE:
          let compareToken = this._tokenStream.consumeBufferedToken();
          let compareRhs = this._parseRangeExpression();
          result = new AstCompareExpression( result, compareToken, compareRhs );
          break;
        case BarlomTokenType.GREATER_THAN:
          let gtToken = this._tokenStream.consumeBufferedToken();
          let gtRhs = this._parseRangeExpression();
          result = new AstGreaterThanExpression( result, gtToken, gtRhs );
          break;
        case BarlomTokenType.GREATER_THAN_OR_EQUAL:
          let gteToken = this._tokenStream.consumeBufferedToken();
          let gteRhs = this._parseRangeExpression();
          result = new AstGreaterThanOrEqualExpression( result, gteToken, gteRhs );
          break;
        case BarlomTokenType.IS:
          let isToken = this._tokenStream.consumeBufferedToken();
          let isRhs = this._parseRangeExpression();
          result = new AstIsExpression( result, isToken, isRhs );
          break;
        case BarlomTokenType.ISNOT:
          let isnotToken = this._tokenStream.consumeBufferedToken();
          let isnotRhs = this._parseRangeExpression();
          result = new AstIsNotExpression( result, isnotToken, isnotRhs );
          break;
        case BarlomTokenType.LESS_THAN:
          let ltToken = this._tokenStream.consumeBufferedToken();
          let ltRhs = this._parseRangeExpression();
          result = new AstLessThanExpression( result, ltToken, ltRhs );
          break;
        case BarlomTokenType.LESS_THAN_OR_EQUAL:
          let lteToken = this._tokenStream.consumeBufferedToken();
          let lteRhs = this._parseRangeExpression();
          result = new AstLessThanOrEqualExpression( result, lteToken, lteRhs );
          break;
        default:
          keepLooking = false;
          break
      }

    }

    return result;

  }

  /**
   * Parses a structure literal after the left brace has been consumed and the first identifier and '=' have
   * been recognized.
   * @param leftBraceToken the opening brace.
   * @private
   */
  private _parseStructureLiteral( leftBraceToken : BarlomToken ) : AstStructureLiteral {

    var identifiers = [ new AstIdentifierExpression( this._tokenStream.consumeBufferedToken() ) ];
    this._tokenStream.consumeBufferedToken();

    var values = [this.parseExpression()];

    while ( true ) {

      if ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.RIGHT_BRACE ) ) {
        return new AstStructureLiteral( leftBraceToken, identifiers, values, this._tokenStream.consumeBufferedToken() );
      }

      if ( !this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {
        throw new Error( "Expected ',' or '}'." );
      }

      identifiers.push( this.parseExpression() );

      this._tokenStream.consumeExpectedToken( BarlomTokenType.EQUALS );

      values.push( this.parseExpression() );

    }

  }

  private _parseUnaryExpression() : AstExpression {

    let token = this._tokenStream.lookAhead1Token();

    switch ( token.tokenType ) {
      case BarlomTokenType.MINUS:
        let minusToken = this._tokenStream.consumeBufferedToken();
        let minusRhs = this._parseUnaryExpression();
        return new AstUnaryNegationExpression( minusToken, minusRhs );
      case BarlomTokenType.PLUS:
        let plusToken = this._tokenStream.consumeBufferedToken();
        let plusRhs = this._parseUnaryExpression();
        return new AstUnaryPositiveExpression( plusToken, plusRhs );
      default:
        return this._parsePrimaryExpression();
    }

  }

  private _tokenStream : BarlomTokenStream;

}

