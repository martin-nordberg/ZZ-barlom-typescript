import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElementName } from '../../../../ast/src/core/AstCodeElementName';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { AstNamedCodeElement } from '../../../../ast/src/core/AstNamedCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a function declared via a function literal.
 */
export class AstShortFunction
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      functionToken : BarlomToken,
      codeElementName : AstCodeElementName,
      functionExpression : AstExpression
  ) {

    super( leadingAnnotations, functionToken, codeElementName, [] );

    this.functionExpression = Object.freeze( functionExpression );

    Object.freeze( this );

  }

  public functionExpression : AstExpression;

}
