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
      symbolToken : BarlomToken,
      codeElementName : AstCodeElementName,
      leadingAnnotations : AstAnnotation[],
      trailingAnnotations : AstAnnotation[]
  ) {
    super( symbolToken, codeElementName, leadingAnnotations, trailingAnnotations );
    Object.freeze( this );
  }

}