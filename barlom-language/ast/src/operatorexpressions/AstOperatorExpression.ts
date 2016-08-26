import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing an expression that is the result of a binary operator.
 */
export abstract class AstOperatorExpression
  extends AstExpression {

  constructor(
      leftHandSide : AstExpression,
      operatorToken : BarlomToken,
      rightHandSide : AstExpression
  ) {

    super( operatorToken );

    this.leftHandSide = Object.freeze( leftHandSide );
    this.rightHandSide = Object.freeze( rightHandSide );

  }

  public leftHandSide : AstExpression;

  public rightHandSide : AstExpression;

}