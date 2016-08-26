import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an addition expression.
 */
export class AstAdditionExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      plusToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, plusToken, rightHandSide );
    Object.freeze( this );
  }

}