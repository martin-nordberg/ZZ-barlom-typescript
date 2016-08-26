import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an exponentiation expression.
 */
export class AstExponentiationExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      powerToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, powerToken, rightHandSide );
    Object.freeze( this );
  }

}