import { AstAnnotation } from '../../../ast/src/AstAnnotation';
import { AstCodeElement } from '../../../ast/src/AstCodeElement';
import { AstCodeElementName } from '../../../ast/src/AstCodeElementName';
import { AstNamedCodeElement } from '../../../ast/src/AstNamedCodeElement';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST Node representing a module.
 */
export class AstModule
  extends AstNamedCodeElement {

  constructor(
      moduleToken : BarlomToken,
      codeElementName : AstCodeElementName,
      leadingAnnotations : AstAnnotation[],
      trailingAnnotations : AstAnnotation[],
      codeElements : AstCodeElement[]
  ) {
    super( moduleToken, codeElementName, leadingAnnotations, trailingAnnotations );
    this.codeElements = Object.freeze( codeElements );
    Object.freeze( this );
  }

  public codeElements : AstCodeElement[];

}
