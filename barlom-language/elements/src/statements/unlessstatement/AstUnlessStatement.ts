import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing an unless statement.
 */
export class AstUnlessStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      unlessToken : BarlomToken,
      guardExpression : AstExpression,
      statements : AstCodeElement[],
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, unlessToken, trailingAnnotations );

    this.guardExpression = Object.freeze( guardExpression );
    this.statements = Object.freeze( statements );

    Object.freeze( this );

  }

  public guardExpression : AstExpression;

  public statements : AstCodeElement[];

}
