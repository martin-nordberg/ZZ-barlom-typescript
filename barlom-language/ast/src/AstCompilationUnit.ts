import { AstNode } from './AstNode';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * AST Node representing a compilation unit.
 */
export class AstCompilationUnit extends AstNode {

  constructor(
      firstToken : BarlomToken
  ) {
    super( firstToken );
  }

}