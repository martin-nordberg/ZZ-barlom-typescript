import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * AST Node representing the path of a module.
 */
export class AstPath extends AstNode {

  constructor(
      firstToken : BarlomToken
  ) {
    super( firstToken );

    this.pathEntries = [ firstToken ];
  }

  public pathEntries : BarlomToken[];

  // TOD: version argument

}