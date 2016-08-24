import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing an expression that is the result of an & operator.
 */
export class AstConcatenationExpression
  extends AstExpression {

  constructor(
      leftHandSide : AstExpression,
      concatenationToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( concatenationToken );

    this.leftHandSide = leftHandSide;
    this.rightHandSide = rightHandSide;

    Object.freeze( this );
  }

  public leftHandSide : AstExpression;

  public rightHandSide : AstExpression;

}