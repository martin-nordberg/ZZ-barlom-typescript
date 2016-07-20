import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * Base class for AST nodes.
 */
export abstract class AstNode {

  constructor( keyToken : BarlomToken ) {
    this.keyToken = keyToken;
  }

  public keyToken : BarlomToken;

}