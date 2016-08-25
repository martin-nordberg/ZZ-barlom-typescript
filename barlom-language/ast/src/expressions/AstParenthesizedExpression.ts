import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing an expression enclosed in parentheses.
 */
export class AstParenthesizedExpression
  extends AstExpression {

  constructor(
      leftParenthesisToken : BarlomToken,
      innerExpression : AstExpression,
      rightParenthesisToken : BarlomToken
  ) {
    super( leftParenthesisToken );

    this.innerExpression = Object.freeze( innerExpression );
    this.rightParenthesisToken = Object.freeze( rightParenthesisToken );

    Object.freeze( this );
  }

  public rightParenthesisToken : BarlomToken;

  public innerExpression : AstExpression;

}