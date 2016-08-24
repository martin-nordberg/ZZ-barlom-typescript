import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of the < operator.
 */
export class AstLessThanExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      lessThanToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, lessThanToken, rightHandSide );

    Object.freeze( this );
  }

}