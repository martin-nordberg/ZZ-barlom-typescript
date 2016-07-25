import { AstAnnotation } from './AstAnnotation';
import { AstCodeElement } from './AstCodeElement';
import { AstCodeElementName } from './AstCodeElementName';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * AST Node representing a code element with a name.
 */
export abstract class AstNamedCodeElement
  extends AstCodeElement {

  constructor(
      tagToken : BarlomToken,
      codeElementName : AstCodeElementName,
      leadingAnnotations : AstAnnotation[],
      trailingAnnotations : AstAnnotation[]
  ) {
    super( tagToken, leadingAnnotations, trailingAnnotations );
    this.codeElementName = Object.freeze( codeElementName );
  }

  public codeElementName : AstCodeElementName;

}