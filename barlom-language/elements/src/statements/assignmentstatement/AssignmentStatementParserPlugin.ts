import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';
import { AstAssignmentStatement } from './AstAssignmentStatement';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';

/**
 * Parser plugin that recognizes an assignment statement.
 */
export class AssignmentStatementParserPlugin
  implements ICodeElementParserPlugin {

  getAuxiliaryTags() : string[] {
    return [];
  }

  getTagText() : string {
    return 'let';
  }

  /**
   * Parses an assignment statement after its leading annotations and tag have been consumed.
   * @returns {AstAssignmentStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      letToken : BarlomToken
  ) : AstAssignmentStatement {

    let lhsExpression = coreParser.parseLValueExpression();

    let operatorToken = tokenStream.consumeToken();

    switch ( operatorToken.tokenType ) {
      case BarlomTokenType.EQUALS:
      case BarlomTokenType.DIVIDE_EQUALS:
      case BarlomTokenType.MINUS_EQUALS:
      case BarlomTokenType.PLUS_EQUALS:
      case BarlomTokenType.POWER_EQUALS:
      case BarlomTokenType.TIMES_EQUALS:
      case BarlomTokenType.CONCAT_EQUALS:
        break;
      default:
        tokenStream.expected( "assignment operator - '=', '/=', '-=', '+=', '^=', '*=', or '&='" );
        break;
    }

    let rhsExpression = coreParser.parseExpression();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstAssignmentStatement( leadingAnnotations, letToken, lhsExpression,
                                       operatorToken, rhsExpression, trailingAnnotations );

  }

}
