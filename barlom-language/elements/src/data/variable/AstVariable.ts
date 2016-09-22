import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElementName } from '../../../../ast/src/core/AstCodeElementName';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { AstNamedCodeElement } from '../../../../ast/src/core/AstNamedCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a value that can be changed over time.
 */
export class AstVariable
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      variableToken : BarlomToken,
      codeElementName : AstCodeElementName,
      trailingAnnotations : AstAnnotation[],
      variableExpression : AstExpression
  ) {

    super( leadingAnnotations, variableToken, codeElementName, trailingAnnotations );

    this.variableExpression = Object.freeze( variableExpression );

    Object.freeze( this );

  }

  public variableExpression : AstExpression;

}
