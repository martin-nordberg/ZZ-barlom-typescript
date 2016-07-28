
import { AstAnnotation } from './AstAnnotation';
import { AstCodeElementName } from './AstCodeElementName';
import { AstNamedCodeElement } from './AstNamedCodeElement';

/**
 * AST Node representing a parameter.
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
