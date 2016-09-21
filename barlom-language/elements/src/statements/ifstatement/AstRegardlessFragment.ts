import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { AstNode } from '../../../../ast/src/core/AstNode';

/**
 * AST node representing a regardless fragment within a check statement.
 */
export class AstRegardlessFragment
  extends AstNode {

  constructor(
      regardlessToken : BarlomToken,
      regardlessStatements : AstCodeElement[]
  ) {

    super( regardlessToken );

    this.regardlessStatements = Object.freeze( regardlessStatements );

    Object.freeze( this );

  }

  public regardlessStatements : AstCodeElement[];

}
