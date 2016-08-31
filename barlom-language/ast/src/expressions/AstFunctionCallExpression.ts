import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a function call.
 */
export class AstFunctionCallExpression
  extends AstExpression {

  constructor(
      functionExpression: AstExpression,
      leftParenthesisToken : BarlomToken,
      argExpressions : AstExpression[]
  ) {
    super( leftParenthesisToken );

    this.functionExpression = Object.freeze( functionExpression );
    this.argExpressions = Object.freeze( argExpressions );

    Object.freeze( this );
  }

  public argExpressions : AstExpression[];

  public functionExpression : AstExpression;

}