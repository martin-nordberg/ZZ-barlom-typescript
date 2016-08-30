import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a function expression literal.
 */
export class AstFunctionExpressionLiteral
  extends AstExpression {

  constructor(
      arrowToken : BarlomToken,
      parameters : AstExpression[],
      resultExpression : AstExpression
  ) {

    super( arrowToken );

    this.parameters = Object.freeze( parameters );
    this.resultExpression = Object.freeze( resultExpression );

    Object.freeze( this );

  }

  public parameters : AstExpression[];

  public resultExpression : AstExpression;

}