import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a hexadecimal integer literal constant.
 */
export class AstIntegerLiteral_Hexadecimal
  extends AstExpression {

  constructor(
      literalToken : BarlomToken
  ) {
    super( literalToken );
    Object.freeze( this );
  }

}