import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of an xor operator.
 */
export class AstExclusiveOrExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      xorToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, xorToken, rightHandSide );
    Object.freeze( this );
  }

}