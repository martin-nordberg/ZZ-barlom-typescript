import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing a field reference operation.
 */
export class AstFieldReferenceExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      dotToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, dotToken, rightHandSide );
    Object.freeze( this );
  }

}