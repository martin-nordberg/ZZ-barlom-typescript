import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstUseDeclaration } from './AstUseDeclaration';
import { AstCodeElement } from './AstCodeElement';

/**
 * AST Node representing a compilation unit.
 */
export class AstCompilationUnit extends AstNode {

  constructor(
      firstToken : BarlomToken
  ) {
    super( firstToken );
    this.useDeclarations = [];
  }

  public definition : AstCodeElement;

  public useDeclarations : AstUseDeclaration[];

}