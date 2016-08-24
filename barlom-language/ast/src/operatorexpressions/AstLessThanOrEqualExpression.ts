import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of the <= operator.
 */
export class AstLessThanOrEqualExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      lessThanOrEqualToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, lessThanOrEqualToken, rightHandSide );

    Object.freeze( this );
  }

}