import { BarlomToken } from '../../lexer/src/BarlomToken';
/**
 * Base class for AST nodes.
 */
export class AstNode {

  constructor( firstToken : BarlomToken ) {
    this.childNodes = [];
    this.firstToken = firstToken;
  }

  public childNodes: AstNode[];

  public firstToken : BarlomToken;

}