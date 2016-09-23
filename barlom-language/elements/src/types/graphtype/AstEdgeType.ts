import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstCodeElementName } from '../../../../ast/src/core/AstCodeElementName';
import { AstNamedCodeElement } from '../../../../ast/src/core/AstNamedCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing an edge type.
 */
export class AstEdgeType
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      edgeToken : BarlomToken,
      codeElementName : AstCodeElementName,
      trailingAnnotations : AstAnnotation[],
      codeElements : AstCodeElement[]
  ) {

    super( leadingAnnotations, edgeToken, codeElementName, trailingAnnotations );

    this.codeElements = Object.freeze( codeElements );

    Object.freeze( this );

  }

  public codeElements : AstCodeElement[];

}
