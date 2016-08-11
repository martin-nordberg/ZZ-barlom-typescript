import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstUseDeclaration } from './AstUseDeclaration';
import { AstCodeElement } from './AstCodeElement';

/**
 * AST node representing a compilation unit.
 */
export class AstCompilationUnit extends AstNode {

  constructor(
      firstToken : BarlomToken,
      useDeclarations : AstUseDeclaration[],
      codeElement : AstCodeElement
  ) {
    super( firstToken );

    this.useDeclarations = Object.freeze( useDeclarations );
    this.codeElement = Object.freeze( codeElement );

    Object.freeze( this );
  }

  public codeElement : AstCodeElement;

  public useDeclarations : AstUseDeclaration[];

}