import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of an equality operator.
 */
export class AstEqualityExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      equalsToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, equalsToken, rightHandSide );

    Object.freeze( this );
  }

}