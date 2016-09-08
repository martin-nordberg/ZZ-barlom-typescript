import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a raise error statement.
 */
export class AstRaiseErrorStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      raiseErrorToken : BarlomToken,
      errorExpression : AstExpression,
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, raiseErrorToken, trailingAnnotations );

    this.errorExpression = Object.freeze( errorExpression );

    Object.freeze( this );

  }

  public errorExpression : AstExpression;

}
