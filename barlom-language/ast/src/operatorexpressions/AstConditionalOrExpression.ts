import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of an or operator.
 */
export class AstConditionalOrExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      orToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, orToken, rightHandSide );

    Object.freeze( this );
  }

}