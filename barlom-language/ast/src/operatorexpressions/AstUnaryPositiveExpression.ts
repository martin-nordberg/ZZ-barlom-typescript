import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a unary positive expression.
 */
export class AstUnaryPositiveExpression
  extends AstExpression {

  constructor(
      plusToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( plusToken );

    this.rightHandSide = Object.freeze( rightHandSide );

    Object.freeze( this );
  }

  public rightHandSide : AstExpression;

}