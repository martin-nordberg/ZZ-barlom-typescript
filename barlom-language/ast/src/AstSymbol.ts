import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstAnnotation } from './AstAnnotation';
import { AstCodeElement } from './AstCodeElement';
import { AstPath } from './AstPath';

/**
 * AST Node representing a symbol within an enumeration type.
 */
export class AstSymbol extends AstCodeElement {

  constructor(
      symbolToken : BarlomToken,
      identifier : BarlomToken,
      leadingAnnotations : AstAnnotation[],
      trailingAnnotations : AstAnnotation[]
  ) {
    super( symbolToken, leadingAnnotations, trailingAnnotations );
    this.identifier = Object.freeze( identifier );
    Object.freeze( this );
  }

  public identifier : BarlomToken;

}