import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a map literal.
 */
export class AstMapLiteral
  extends AstExpression {

  constructor(
      leftBraceToken : BarlomToken,
      keys : AstExpression[],
      values : AstExpression[],
      rightBraceToken : BarlomToken
  ) {

    super( leftBraceToken );

    this.keys = Object.freeze( keys );
    this.values = Object.freeze( values );
    this.rightBraceToken = Object.freeze( rightBraceToken );

    Object.freeze( this );

  }

  public keys : AstExpression[];

  public rightBraceToken : BarlomToken;

  public values : AstExpression[];

}