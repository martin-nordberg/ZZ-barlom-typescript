import { AstExpression } from '../expressions/AstExpression';
import { BarlomToken } from '../../../lexer/src/BarlomToken';

/**
 * AST node representing a tuple literal.
 */
export class AstTupleLiteral
  extends AstExpression {

  constructor(
      leftParenthesisToken : BarlomToken,
      tupleEntries : AstExpression[]
  ) {
    super( leftParenthesisToken );

    this.tupleEntries = Object.freeze( tupleEntries );

    Object.freeze( this );
  }

  public tupleEntries : AstExpression[];
}