import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElementName } from '../../../../ast/src/core/AstCodeElementName';
import { AstNamedCodeElement } from '../../../../ast/src/core/AstNamedCodeElement';
import { AstParameter } from '../../../../ast/src/parameters/AstParameter';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing one option in a variant type (aka ADT, union type, sum type).
 */
export class AstVariant
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      variantToken : BarlomToken,
      codeElementName : AstCodeElementName,
      parameters : AstParameter[],
      trailingAnnotations : AstAnnotation[]
  ) {
    super( leadingAnnotations, variantToken, codeElementName, trailingAnnotations );

    this.parameters = Object.freeze( parameters );

    Object.freeze( this );
  }

  public parameters : AstParameter[];

}
