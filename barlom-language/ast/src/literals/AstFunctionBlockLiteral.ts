import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a function block literal.
 */
export class AstFunctionBlockLiteral
  extends AstExpression {

  constructor(
      arrowToken : BarlomToken,
      parameters : AstExpression[],
      statements : AstExpression[]
  ) {

    super( arrowToken );

    this.parameters = Object.freeze( parameters );
    this.statements = Object.freeze( statements );

    Object.freeze( this );

  }

  public parameters : AstExpression[];

  public statements : AstExpression[];

}