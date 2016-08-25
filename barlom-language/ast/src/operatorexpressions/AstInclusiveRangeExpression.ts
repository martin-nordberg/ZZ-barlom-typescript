import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of a .. operator.
 */
export class AstInclusiveRangeExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      inclusiveRangeToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, inclusiveRangeToken, rightHandSide );

    Object.freeze( this );
  }

}