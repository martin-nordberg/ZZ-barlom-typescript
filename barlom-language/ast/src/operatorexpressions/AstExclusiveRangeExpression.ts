import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of a ..< operator.
 */
export class AstExclusiveRangeExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      exclusiveRangeToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, exclusiveRangeToken, rightHandSide );

    Object.freeze( this );
  }

}