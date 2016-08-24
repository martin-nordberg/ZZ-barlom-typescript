import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an division expression.
 */
export class AstDivisionExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      dividedByToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, dividedByToken, rightHandSide );

    Object.freeze( this );
  }

}