import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of the is operator.
 */
export class AstIsExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      isToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, isToken, rightHandSide );

    Object.freeze( this );
  }

}