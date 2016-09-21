import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a repeat-until statement.
 */
export class AstRepeatUntilStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      repeatToken : BarlomToken,
      guardExpression : AstExpression,
      statements : AstCodeElement[],
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, repeatToken, trailingAnnotations );

    this.guardExpression = Object.freeze( guardExpression );
    this.statements = Object.freeze( statements );

    Object.freeze( this );

  }

  public guardExpression : AstExpression;

  public statements : AstCodeElement[];

}
