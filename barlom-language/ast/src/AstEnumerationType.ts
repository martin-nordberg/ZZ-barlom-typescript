import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstAnnotation } from './AstAnnotation';
import { AstCodeElement } from './AstCodeElement';
import { AstPath } from './AstPath';

/**
 * AST Node representing an enumeration type.
 */
export class AstEnumerationType extends AstCodeElement {

  constructor(
      identifier : BarlomToken,
      leadingAnnotations : AstAnnotation[],
      trailingAnnotations : AstAnnotation[]
      // TODO: contents
  ) {
    super( identifier, leadingAnnotations, trailingAnnotations );
    Object.freeze( this );
  }

  public get identifier() {
    return this.keyToken;
  }

}