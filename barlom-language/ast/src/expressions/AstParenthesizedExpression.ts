import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing an expression enclosed in parentheses.
 */
export class AstParenthesizedExpression
  extends AstExpression {

  constructor(
      leftParenthesisToken : BarlomToken,
      innerExpression : AstExpression
  ) {
    super( leftParenthesisToken );

    this.innerExpression = Object.freeze( innerExpression );

    Object.freeze( this );
  }

  public innerExpression : AstExpression;

}