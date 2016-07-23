import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstPath } from './AstPath';

/**
 * AST Node representing the context of a compilation unit.
 */
export class AstContext extends AstNode {

  constructor(
      contextToken : BarlomToken,
      path : AstPath
  ) {
    super( contextToken );
    this.path = Object.freeze( path );
    Object.freeze( this );
  }

  public path : AstPath;

}