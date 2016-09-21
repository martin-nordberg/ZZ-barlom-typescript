import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { AstNode } from '../../../../ast/src/core/AstNode';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing one branch (if or else if) of an if statement.
 */
export class AstIfFragment
  extends AstNode {

  constructor(
      ifOrElseToken : BarlomToken,
      condition : AstExpression,
      statements : AstCodeElement[]
  ) {

    super( ifOrElseToken );

    this.condition = Object.freeze( condition );
    this.statements = Object.freeze( statements );

    Object.freeze( this );

  }

  public condition : AstExpression;

  public statements : AstCodeElement[];

}
