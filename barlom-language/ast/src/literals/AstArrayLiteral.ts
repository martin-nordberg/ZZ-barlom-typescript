import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing an array literal.
 */
export class AstArrayLiteral
  extends AstExpression {

  constructor(
      leftBracketToken : BarlomToken,
      arrayEntries : AstExpression[],
      rightBracketToken : BarlomToken
  ) {
    super( leftBracketToken );

    this.arrayEntries = Object.freeze( arrayEntries );
    this.rightBracketToken = Object.freeze( rightBracketToken );

    Object.freeze( this );
  }

  public arrayEntries : AstExpression[];

  public rightBracketToken : BarlomToken;

}