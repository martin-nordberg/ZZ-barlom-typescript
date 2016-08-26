import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of the <=> operator.
 */
export class AstCompareExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      compareToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, compareToken, rightHandSide );
    Object.freeze( this );
  }

}