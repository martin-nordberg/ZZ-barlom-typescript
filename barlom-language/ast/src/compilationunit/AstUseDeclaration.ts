import { AstCodeElementName } from '../core/AstCodeElementName';
import { AstNode } from '../core/AstNode';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a use declaration.
 */
export class AstUseDeclaration extends AstNode {

  constructor(
      useToken : BarlomToken,
      codeElementName : AstCodeElementName,
      synonym: BarlomToken
  ) {
    super( useToken );

    this.codeElementName = Object.freeze( codeElementName );
    this.synonym = Object.freeze( synonym );

    Object.freeze( this );
  }

  public codeElementName : AstCodeElementName;

  public synonym : BarlomToken;

}