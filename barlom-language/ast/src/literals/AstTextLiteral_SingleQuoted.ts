import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a single quoted text literal constant.
 */
export class AstTextLiteral_SingleQuoted
  extends AstExpression {

  constructor(
      literalToken : BarlomToken
  ) {
    super( literalToken );

    Object.freeze( this );
  }

}