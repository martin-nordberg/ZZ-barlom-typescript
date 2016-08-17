import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a regular expression constant.
 */
export class AstRegularExpressionLiteral
  extends AstExpression {

  constructor(
      literalToken : BarlomToken
  ) {
    super( literalToken );

    Object.freeze( this );
  }

}