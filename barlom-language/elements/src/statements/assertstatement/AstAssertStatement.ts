import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing an assert statement.
 */
export class AstAssertStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      returnToken : BarlomToken,
      assertedExpression : AstExpression,
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, returnToken, trailingAnnotations );

    this.assertedExpression = Object.freeze( assertedExpression );

    Object.freeze( this );

  }

  public assertedExpression : AstExpression;

}
