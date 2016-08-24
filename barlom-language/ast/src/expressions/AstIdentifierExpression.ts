import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing an identifier within an expression.
 */
export class AstIdentifierExpression
  extends AstExpression {

  constructor(
      identifierToken : BarlomToken
  ) {
    super( identifierToken );

    Object.freeze( this );
  }

}