import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstCodeElementName } from '../../../../ast/src/core/AstCodeElementName';
import { AstNamedCodeElement } from '../../../../ast/src/core/AstNamedCodeElement';
import { AstParameter } from '../../../../ast/src/parameters/AstParameter';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a structure type (aka record type).
 */
export class AstStructureType
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      structureToken : BarlomToken,
      codeElementName : AstCodeElementName,
      parameters : AstParameter[],
      trailingAnnotations : AstAnnotation[],
      codeElements : AstCodeElement[]
  ) {

    super( leadingAnnotations, structureToken, codeElementName, trailingAnnotations );

    this.codeElements = Object.freeze( codeElements );
    this.parameters = Object.freeze( parameters );

    Object.freeze( this );

  }

  public codeElements : AstCodeElement[];

  public parameters : AstParameter[];

}
