import { AstAnnotation } from '../../../ast/src/AstAnnotation';
import { AstCodeElementName } from '../../../ast/src/AstCodeElementName';
import { AstNamedCodeElement } from '../../../ast/src/AstNamedCodeElement';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST Node representing a symbol within an enumeration type.
 */
export class AstSymbol
  extends AstNamedCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      symbolToken : BarlomToken,
      codeElementName : AstCodeElementName,
      trailingAnnotations : AstAnnotation[]
  ) {
    super( leadingAnnotations, symbolToken, codeElementName, trailingAnnotations );
    Object.freeze( this );
  }

}