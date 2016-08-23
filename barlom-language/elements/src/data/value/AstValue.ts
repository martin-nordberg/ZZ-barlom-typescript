import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElementName } from '../../../../ast/src/core/AstCodeElementName';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { AstNamedCodeElement } from '../../../../ast/src/core/AstNamedCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing an immutable value.
 */
export class AstValue
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      valueToken : BarlomToken,
      codeElementName : AstCodeElementName,
      trailingAnnotations : AstAnnotation[],
      valueExpression : AstExpression
  ) {
    super( leadingAnnotations, valueToken, codeElementName, trailingAnnotations );

    this.valueExpression = Object.freeze( valueExpression );

    Object.freeze( this );
  }

  public valueExpression : AstExpression;

}
