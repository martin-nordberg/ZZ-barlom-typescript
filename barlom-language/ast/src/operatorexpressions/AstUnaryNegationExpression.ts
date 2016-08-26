import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a unary negation expression.
 */
export class AstUnaryNegationExpression
  extends AstExpression {

  constructor(
      minusToken : BarlomToken,
      rightHandSide : AstExpression
  ) {

    super( minusToken );

    this.rightHandSide = Object.freeze( rightHandSide );

    Object.freeze( this );

  }

  public rightHandSide : AstExpression;

}