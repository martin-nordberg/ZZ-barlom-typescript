import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a binary integer literal constant.
 */
export class AstIntegerLiteral_Binary
  extends AstExpression {

  constructor(
      literalToken : BarlomToken
  ) {
    super( literalToken );

    Object.freeze( this );
  }

}