import { AstNode } from './AstNode';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing the name (possibly qualified) of a code element.
 */
export class AstCodeElementName extends AstNode {

  constructor(
      firstIdentifier : BarlomToken
  ) {
    super( firstIdentifier );

    this._entries = [ firstIdentifier ];
  }

  get entries() {
    return this._entries;
  }

  /**
   * Adds an additional identifier to the end of the path of this qualified name.
   * @param identifierToken the additional name to add.
   */
  public extendPath( identifierToken : BarlomToken ) {
    this._entries.push( identifierToken );
    this.keyToken = identifierToken;
  }

  public _entries : BarlomToken[];

}