import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstPath } from './AstPath';

/**
 * AST Node representing a use declaration.
 */
export class AstUseDeclaration extends AstNode {

  constructor(
      useToken : BarlomToken,
      path : AstPath
  ) {
    super( useToken );
    this.path = path;
  }

  public path : AstPath;

  public synonym : BarlomToken;

}