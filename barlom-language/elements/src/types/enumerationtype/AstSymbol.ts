import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElementName } from '../../../../ast/src/core/AstCodeElementName';
import { AstNamedCodeElement } from '../../../../ast/src/core/AstNamedCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a symbol within an enumeration type.
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