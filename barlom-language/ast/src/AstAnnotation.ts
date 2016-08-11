import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * AST node representing an annotation.
 */
export abstract class AstAnnotation extends AstNode {

  constructor(
      keyToken : BarlomToken
  ) {
    super( keyToken );
  }

}