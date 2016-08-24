import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of the isnot operator.
 */
export class AstIsNotExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      isNotToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, isNotToken, rightHandSide );

    Object.freeze( this );
  }

}