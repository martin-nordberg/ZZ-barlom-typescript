import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a list literal.
 */
export class AstListLiteral
  extends AstExpression {

  constructor(
      leftBracketToken : BarlomToken,
      listEntries : AstExpression[],
      rightBracketToken : BarlomToken
  ) {
    super( leftBracketToken );

    this.listEntries = Object.freeze( listEntries );
    this.rightBracketToken = Object.freeze( rightBracketToken );

    Object.freeze( this );
  }

  public listEntries : AstExpression[];

  public rightBracketToken : BarlomToken;

}