import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a tuple literal.
 */
export class AstTupleLiteral
  extends AstExpression {

  constructor(
      leftParenthesisToken : BarlomToken,
      tupleEntries : AstExpression[],
      rightParenthesisToken : BarlomToken
  ) {

    super( leftParenthesisToken );

    this.tupleEntries = Object.freeze( tupleEntries );
    this.rightParenthesisToken = Object.freeze( rightParenthesisToken );

    Object.freeze( this );

  }

  public rightParenthesisToken : BarlomToken;

  public tupleEntries : AstExpression[];

}