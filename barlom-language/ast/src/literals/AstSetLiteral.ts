import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a set literal.
 */
export class AstSetLiteral
  extends AstExpression {

  constructor(
      leftBraceToken : BarlomToken,
      setEntries : AstExpression[],
      rightBraceToken : BarlomToken
  ) {

    super( leftBraceToken );

    this.setEntries = Object.freeze( setEntries );
    this.rightBraceToken = Object.freeze( rightBraceToken );

    Object.freeze( this );

  }

  public setEntries : AstExpression[];

  public rightBraceToken : BarlomToken;

}