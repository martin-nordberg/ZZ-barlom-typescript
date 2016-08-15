import { AstNode } from '../core/AstNode';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing an expression.
 */
export abstract class AstExpression
  extends AstNode {

  constructor(
      keyToken : BarlomToken
  ) {
    super( keyToken );
  }

}