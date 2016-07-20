import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * AST Node representing an annotation.
 */
export abstract class AstAnnotation extends AstNode {

  constructor(
      keyToken : BarlomToken
  ) {
    super( keyToken );
  }

}