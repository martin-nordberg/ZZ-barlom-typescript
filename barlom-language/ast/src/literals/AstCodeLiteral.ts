import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a back-tick quoted code literal.
 */
export class AstCodeLiteral
  extends AstExpression {

  constructor(
      literalToken : BarlomToken
  ) {
    super( literalToken );

    Object.freeze( this );
  }

}