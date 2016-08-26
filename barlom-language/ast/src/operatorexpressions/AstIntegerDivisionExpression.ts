import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an integer division (div) expression.
 */
export class AstIntegerDivisionExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      divToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, divToken, rightHandSide );
    Object.freeze( this );
  }

}