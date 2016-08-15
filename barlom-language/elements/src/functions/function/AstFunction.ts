import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstCodeElementName } from '../../../../ast/src/core/AstCodeElementName';
import { AstNamedCodeElement } from '../../../../ast/src/core/AstNamedCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { AstParameter } from '../../../../ast/src/parameters/AstParameter';

/**
 * AST node representing a function.
 */
export class AstFunction
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      functionToken : BarlomToken,
      codeElementName : AstCodeElementName,
      parameters : AstParameter[],
      trailingAnnotations : AstAnnotation[],
      codeElements : AstCodeElement[]
  ) {
    super( leadingAnnotations, functionToken, codeElementName, trailingAnnotations );

    this.parameters = Object.freeze( parameters );
    this.codeElements = Object.freeze( codeElements );

    Object.freeze( this );
  }

  public codeElements : AstCodeElement[];

  public parameters : AstParameter[];

}
