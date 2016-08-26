import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an expression that is the result of an & operator.
 */
export class AstConcatenationExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      concatenationToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, concatenationToken, rightHandSide );
    Object.freeze( this );
  }

}