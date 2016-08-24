import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing an expression that is the result of an and operator.
 */
export class AstConditionalAndExpression
  extends AstExpression {

  constructor(
      leftHandSide : AstExpression,
      andToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( andToken );

    this.leftHandSide = leftHandSide;
    this.rightHandSide = rightHandSide;

    Object.freeze( this );
  }

  public leftHandSide : AstExpression;

  public rightHandSide : AstExpression;

}