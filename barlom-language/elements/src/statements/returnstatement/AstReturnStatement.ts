import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a return statement.
 */
export class AstReturnStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      returnToken : BarlomToken,
      returnedExpression : AstExpression,
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, returnToken, trailingAnnotations );

    this.returnedExpression = Object.freeze( returnedExpression );

    Object.freeze( this );

  }

  private returnedExpression : AstExpression;

}
