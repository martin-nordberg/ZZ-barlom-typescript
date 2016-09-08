import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a call statement.
 */
export class AstCallStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      callToken : BarlomToken,
      calledExpression : AstExpression,
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, callToken, trailingAnnotations );

    this.calledExpression = Object.freeze( calledExpression );

    Object.freeze( this );

  }

  private calledExpression : AstExpression;

}
