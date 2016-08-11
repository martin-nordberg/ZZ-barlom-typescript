import { AstAnnotation } from '../../../../ast/src/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/AstCodeElement';
import { AstCodeElementName } from '../../../../ast/src/AstCodeElementName';
import { AstNamedCodeElement } from '../../../../ast/src/AstNamedCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a module.
 */
export class AstModule
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      moduleToken : BarlomToken,
      codeElementName : AstCodeElementName,
      trailingAnnotations : AstAnnotation[],
      codeElements : AstCodeElement[]
  ) {
    super( leadingAnnotations, moduleToken, codeElementName, trailingAnnotations );

    this.codeElements = Object.freeze( codeElements );

    Object.freeze( this );
  }

  public codeElements : AstCodeElement[];

}
