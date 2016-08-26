import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a structure literal.
 */
export class AstStructureLiteral
  extends AstExpression {

  constructor(
      leftBraceToken : BarlomToken,
      identifiers : AstExpression[],
      values : AstExpression[],
      rightBraceToken : BarlomToken
  ) {

    super( leftBraceToken );

    this.identifiers = Object.freeze( identifiers );
    this.values = Object.freeze( values );
    this.rightBraceToken = Object.freeze( rightBraceToken );

    Object.freeze( this );

  }

  public identifiers : AstExpression[];

  public rightBraceToken : BarlomToken;

  public values : AstExpression[];

}