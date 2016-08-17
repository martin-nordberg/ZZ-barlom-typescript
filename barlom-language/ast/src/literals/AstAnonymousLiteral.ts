import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing the anonymous literal.
 */
export class AstAnonymousLiteral
  extends AstExpression {

  constructor(
      literalToken : BarlomToken
  ) {
    super( literalToken );

    Object.freeze( this );
  }

}