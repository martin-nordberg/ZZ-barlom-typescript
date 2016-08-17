import { AstExpression } from '../../ast/src/expressions/AstExpression';
import { AstIntegerLiteral_Decimal } from '../../ast/src/literals/AstIntegerLiteral_Decimal';
import { BarlomTokenStream } from './BarlomTokenStream';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { AstAnonymousLiteral } from '../../ast/src/literals/AstAnonymousLiteral';
import { AstCodeLiteral } from '../../ast/src/literals/AstCodeLiteral';
import { AstDateTimeLiteral } from '../../ast/src/literals/AstDateTimeLiteral';
import { AstIntegerLiteral_Binary } from '../../ast/src/literals/AstIntegerLiteral_Binary';
import { AstIntegerLiteral_Hexadecimal } from '../../ast/src/literals/AstIntegerLiteral_Hexadecimal';
import { AstNumberLiteral } from '../../ast/src/literals/AstNumberLiteral';
import { AstRegularExpressionLiteral } from '../../ast/src/literals/AstRegularExpressionLiteral';
import { AstTemplateLiteral } from '../../ast/src/literals/AstTemplateLiteral';
import { AstTextLiteral_DoubleQuoted } from '../../ast/src/literals/AstTextLiteral_DoubleQuoted';
import { AstTextLiteral_DoubleQuotedMultiline } from '../../ast/src/literals/AstTextLiteral_DoubleQuotedMultiline';
import { AstTextLiteral_SingleQuoted } from '../../ast/src/literals/AstTextLiteral_SingleQuoted';
import { AstTextLiteral_SingleQuotedMultiline } from '../../ast/src/literals/AstTextLiteral_SingleQuotedMultiline';
import { AstVersionLiteral } from '../../ast/src/literals/AstVersionLiteral';
import { AstSelfLiteral } from '../../ast/src/literals/AstSelfLiteral';
import { AstBooleanLiteral } from '../../ast/src/literals/AstBooleanLiteral';
import { AstUndefinedLiteral } from '../../ast/src/literals/AstUndefinedLiteral';


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

    // TODO: pretty much everything

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
      case BarlomTokenType.IntegerLiteral_Binary:
        result = new AstIntegerLiteral_Binary( token );
        break;
      case BarlomTokenType.IntegerLiteral_Decimal:
        result = new AstIntegerLiteral_Decimal( token );
        break;
      case BarlomTokenType.IntegerLiteral_Hex:
        result = new AstIntegerLiteral_Hexadecimal( token );
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

    // TODO : operators, etc. etc.

    return result;

  }

  private _tokenStream : BarlomTokenStream;

}
