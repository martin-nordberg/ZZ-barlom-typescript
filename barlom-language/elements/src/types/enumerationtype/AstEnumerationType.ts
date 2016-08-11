import { AstAnnotation } from '../../../../ast/src/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/AstCodeElement';
import { AstCodeElementName } from '../../../../ast/src/AstCodeElementName';
import { AstNamedCodeElement } from '../../../../ast/src/AstNamedCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing an enumeration type.
 */
export class AstEnumerationType
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      enumerationTypeToken : BarlomToken,
      codeElementName : AstCodeElementName,
      trailingAnnotations : AstAnnotation[],
      codeElements : AstCodeElement[]
  ) {
    super( leadingAnnotations, enumerationTypeToken, codeElementName, trailingAnnotations );

    this.codeElements = Object.freeze( codeElements );

    Object.freeze( this );
  }

  public codeElements : AstCodeElement[];

}
