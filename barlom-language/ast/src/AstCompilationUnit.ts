import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstUseDeclaration } from './AstUseDeclaration';
import { AstCodeElement } from './AstCodeElement';
import { AstContext } from './AstContext';

/**
 * AST Node representing a compilation unit.
 */
export class AstCompilationUnit extends AstNode {

  constructor(
      firstToken : BarlomToken,
      useDeclarations : AstUseDeclaration[],
      context : AstContext,
      codeElements : AstCodeElement[]
  ) {
    super( firstToken );
    this.useDeclarations = Object.freeze( useDeclarations );
    this.context = Object.freeze( context );
    this.codeElements = Object.freeze( codeElements );
    Object.freeze( this );
  }

  public codeElements : AstCodeElement[];

  public context : AstContext;

  public useDeclarations : AstUseDeclaration[];

}