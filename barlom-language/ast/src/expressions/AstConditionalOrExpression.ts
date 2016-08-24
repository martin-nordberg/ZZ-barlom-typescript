import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing an expression that is the result of an or operator.
 */
export class AstConditionalOrExpression
  extends AstExpression {

  constructor(
      leftHandSide : AstExpression,
      orToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( orToken );

    this.leftHandSide = leftHandSide;
    this.rightHandSide = rightHandSide;

    Object.freeze( this );
  }

  public leftHandSide : AstExpression;

  public rightHandSide : AstExpression;

}