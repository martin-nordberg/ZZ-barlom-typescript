import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of the >= operator.
 */
export class AstGreaterThanOrEqualExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      greaterThanOrEqualToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, greaterThanOrEqualToken, rightHandSide );
    Object.freeze( this );
  }

}