import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of the > operator.
 */
export class AstGreaterThanExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      greaterThanToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, greaterThanToken, rightHandSide );

    Object.freeze( this );
  }

}