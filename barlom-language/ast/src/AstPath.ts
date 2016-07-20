import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * AST Node representing the path of a module.
 */
export class AstPath extends AstNode {

  constructor(
      keyToken : BarlomToken
  ) {
    super( keyToken );

    this._entries = [ keyToken ];
  }

  get entries() {
    return this._entries;
  }

  public extendPath( identifierToken : BarlomToken ) {
    this._entries.push( identifierToken );
    this.keyToken = identifierToken;
  }

  public _entries : BarlomToken[];

}