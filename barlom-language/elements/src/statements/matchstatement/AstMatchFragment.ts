import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { AstNode } from '../../../../ast/src/core/AstNode';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing one branch of a match statement.
 */
export class AstMatchFragment
  extends AstNode {

  constructor(
      arrowToken : BarlomToken,
      patternExpression : AstExpression,
      whereExpression : AstExpression,
      statements : AstCodeElement[]
  ) {

    super( arrowToken );

    this.patternExpression = Object.freeze( patternExpression );
    this.whereExpression = Object.freeze( whereExpression );
    this.statements = Object.freeze( statements );

    Object.freeze( this );

  }

  public patternExpression : AstExpression;

  public statements : AstCodeElement[];

  public whereExpression : AstExpression;

}
