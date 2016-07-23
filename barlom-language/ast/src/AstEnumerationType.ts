import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstAnnotation } from './AstAnnotation';
import { AstCodeElement } from './AstCodeElement';
import { AstPath } from './AstPath';

/**
 * AST Node representing an enumeration type.
 */
export class AstEnumerationType extends AstCodeElement {

  constructor(
      enumerationTypeToken : BarlomToken,
      identifier : BarlomToken,
      leadingAnnotations : AstAnnotation[],
      trailingAnnotations : AstAnnotation[],
      codeElements : AstCodeElement[]
  ) {
    super( enumerationTypeToken, leadingAnnotations, trailingAnnotations );
    this.identifier = Object.freeze( identifier );
    this.codeElements = Object.freeze( codeElements );
    Object.freeze( this );
  }

  public identifier : BarlomToken;

  public codeElements : AstCodeElement[];

}