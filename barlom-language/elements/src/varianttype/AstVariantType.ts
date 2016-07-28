import { AstAnnotation } from '../../../ast/src/AstAnnotation';
import { AstCodeElement } from '../../../ast/src/AstCodeElement';
import { AstCodeElementName } from '../../../ast/src/AstCodeElementName';
import { AstNamedCodeElement } from '../../../ast/src/AstNamedCodeElement';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST Node representing a variant type (aka ADT, union type, sum type).
 */
export class AstVariantType
  extends AstNamedCodeElement {

  constructor(
      variantTypeToken : BarlomToken,
      codeElementName : AstCodeElementName,
      leadingAnnotations : AstAnnotation[],
      trailingAnnotations : AstAnnotation[],
      codeElements : AstCodeElement[]
  ) {
    super( variantTypeToken, codeElementName, leadingAnnotations, trailingAnnotations );
    this.codeElements = Object.freeze( codeElements );
    Object.freeze( this );
  }

  public codeElements : AstCodeElement[];

}
