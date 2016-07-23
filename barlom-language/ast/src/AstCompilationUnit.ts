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
      codeElement : AstCodeElement
  ) {
    super( firstToken );
    this.useDeclarations = Object.freeze( useDeclarations );
    this.context = Object.freeze( context );
    this.codeElement = Object.freeze( codeElement );
    Object.freeze( this );
  }

  public codeElement : AstCodeElement;

  public context : AstContext;

  public useDeclarations : AstUseDeclaration[];

}