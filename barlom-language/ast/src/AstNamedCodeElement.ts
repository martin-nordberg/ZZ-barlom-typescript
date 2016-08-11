import { AstAnnotation } from './AstAnnotation';
import { AstCodeElement } from './AstCodeElement';
import { AstCodeElementName } from './AstCodeElementName';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * AST node representing a code element with a name.
 */
export abstract class AstNamedCodeElement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      tagToken : BarlomToken,
      codeElementName : AstCodeElementName,
      trailingAnnotations : AstAnnotation[]
  ) {
    super( leadingAnnotations, tagToken, trailingAnnotations );

    this.codeElementName = Object.freeze( codeElementName );
  }

  public codeElementName : AstCodeElementName;

}