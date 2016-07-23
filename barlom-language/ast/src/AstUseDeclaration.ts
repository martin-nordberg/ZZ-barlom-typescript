import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstPath } from './AstPath';

/**
 * AST Node representing a use declaration.
 */
export class AstUseDeclaration extends AstNode {

  constructor(
      useToken : BarlomToken,
      path : AstPath,
      synonym: BarlomToken
  ) {
    super( useToken );
    this.path = Object.freeze( path );
    this.synonym = Object.freeze( synonym );
    Object.freeze( this );
  }

  public path : AstPath;

  public synonym : BarlomToken;

}