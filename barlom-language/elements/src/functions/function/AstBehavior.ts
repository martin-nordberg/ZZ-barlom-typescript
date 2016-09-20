import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstCodeElementName } from '../../../../ast/src/core/AstCodeElementName';
import { AstNamedCodeElement } from '../../../../ast/src/core/AstNamedCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { AstParameter } from '../../../../ast/src/parameters/AstParameter';

/**
 * AST node representing a behavior.
 */
export class AstBehavior
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      functionToken : BarlomToken,
      codeElementName : AstCodeElementName,
      parameters : AstParameter[],
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, functionToken, codeElementName, trailingAnnotations );

    this.parameters = Object.freeze( parameters );

    Object.freeze( this );

  }

  public parameters : AstParameter[];

}
