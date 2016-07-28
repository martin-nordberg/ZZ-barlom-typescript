import { AstAnnotation } from './AstAnnotation';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstNode } from './AstNode';

/**
 * AST Node representing an element of code.
 */
export abstract class AstCodeElement extends AstNode {

  constructor(
      leadingAnnotations : AstAnnotation[],
      tagToken : BarlomToken,
      trailingAnnotations : AstAnnotation[]
  ) {
    super( tagToken );
    this.leadingAnnotations = Object.freeze( leadingAnnotations );
    this.trailingAnnotations = Object.freeze( trailingAnnotations );
  }

  public leadingAnnotations : AstAnnotation[];

  public trailingAnnotations : AstAnnotation[];

}