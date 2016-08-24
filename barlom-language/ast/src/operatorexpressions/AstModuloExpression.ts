import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstOperatorExpression } from './AstOperatorExpression';

/**
 * AST node representing an modulo division expression.
 */
export class AstModuloExpression
  extends AstOperatorExpression {

  constructor(
      leftHandSide : AstExpression,
      modToken : BarlomToken,
      rightHandSide : AstExpression
  ) {
    super( leftHandSide, modToken, rightHandSide );

    Object.freeze( this );
  }

}