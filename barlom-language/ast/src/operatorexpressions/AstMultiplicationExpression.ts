import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing a multiplication expression.
 */
export class AstMultiplicationExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      timesToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, timesToken, rightHandSide );
    Object.freeze( this );
  }

}