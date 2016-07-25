import { AstAnnotation } from '../../../ast/src/AstAnnotation';
import { AstCodeElement } from '../../../ast/src/AstCodeElement';
import { AstCodeElementName } from '../../../ast/src/AstCodeElementName';
import { AstNamedCodeElement } from '../../../ast/src/AstNamedCodeElement';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST Node representing an enumeration type.
 */
export class AstEnumerationType
  extends AstNamedCodeElement {

  constructor(
      enumerationTypeToken : BarlomToken,
      codeElementName : AstCodeElementName,
      leadingAnnotations : AstAnnotation[],
      trailingAnnotations : AstAnnotation[],
      codeElements : AstCodeElement[]
  ) {
    super( enumerationTypeToken, codeElementName, leadingAnnotations, trailingAnnotations );
    this.codeElements = Object.freeze( codeElements );
    Object.freeze( this );
  }

  public codeElements : AstCodeElement[];

}
