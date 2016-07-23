import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstAnnotation } from './AstAnnotation';

/**
 * AST Node representing an element of code.
 */
export abstract class AstCodeElement extends AstNode {

  constructor(
      keyToken : BarlomToken,
      leadingAnnotations : AstAnnotation[],
      trailingAnnotations : AstAnnotation[]
  ) {
    super( keyToken );
    this.leadingAnnotations = Object.freeze( leadingAnnotations );
    this.trailingAnnotations = Object.freeze( trailingAnnotations );
  }

  public leadingAnnotations : AstAnnotation[];

  public trailingAnnotations : AstAnnotation[];

}