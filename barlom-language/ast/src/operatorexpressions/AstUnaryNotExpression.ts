import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a unary logical negation expression.
 */
export class AstUnaryNotExpression
  extends AstExpression {

  constructor(
      notToken : BarlomToken,
      rightHandSide : AstExpression
  ) {

    super( notToken );

    this.rightHandSide = Object.freeze( rightHandSide );

    Object.freeze( this );

  }

  public rightHandSide : AstExpression;

}