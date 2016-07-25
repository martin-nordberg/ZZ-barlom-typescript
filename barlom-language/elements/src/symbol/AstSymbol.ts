import { AstAnnotation } from '../../../ast/src/AstAnnotation';
import { AstCodeElement } from '../../../ast/src/AstCodeElement';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

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