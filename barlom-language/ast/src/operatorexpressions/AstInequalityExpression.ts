import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of an inequality operator.
 */
export class AstInequalityExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      notEqualsToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, notEqualsToken, rightHandSide );

    Object.freeze( this );
  }

}