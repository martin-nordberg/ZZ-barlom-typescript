import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing a subtraction expression.
 */
export class AstSubtractionExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      minusToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, minusToken, rightHandSide );

    Object.freeze( this );
  }

}