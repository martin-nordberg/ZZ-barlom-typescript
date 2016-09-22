import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElementName } from '../../../../ast/src/core/AstCodeElementName';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { AstNamedCodeElement } from '../../../../ast/src/core/AstNamedCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a value known at compile time.
 */
export class AstConstant
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      constantToken : BarlomToken,
      codeElementName : AstCodeElementName,
      trailingAnnotations : AstAnnotation[],
      constantExpression : AstExpression
  ) {

    super( leadingAnnotations, constantToken, codeElementName, trailingAnnotations );

    this.constantExpression = Object.freeze( constantExpression );

    Object.freeze( this );

  }

  public constantExpression : AstExpression;

}
