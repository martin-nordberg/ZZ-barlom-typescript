
import { AstAnnotation } from '../annotations/AstAnnotation';
import { AstCodeElementName } from '../core/AstCodeElementName';
import { AstNamedCodeElement } from '../core/AstNamedCodeElement';

/**
 * AST node representing a parameter.
 */
export class AstParameter
  extends AstNamedCodeElement {

  constructor(
      name : AstCodeElementName,
      trailingAnnotations : AstAnnotation[]
      // TODO: default value
  ) {
    super( [], name.entries[0], name, trailingAnnotations );

    Object.freeze( this );
  }

}
