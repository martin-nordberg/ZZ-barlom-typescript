import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of an and operator.
 */
export class AstConditionalAndExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      andToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, andToken, rightHandSide );

    Object.freeze( this );
  }

}