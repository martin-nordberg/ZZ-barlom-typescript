import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing an assignment statement.
 */
export class AstAssignmentStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      letToken : BarlomToken,
      leftHandSide : AstExpression,
      operatorToken : BarlomToken,
      rightHandSide : AstExpression,
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, letToken, trailingAnnotations );

    this.leftHandSide = Object.freeze( leftHandSide );
    this.operatorToken = Object.freeze( operatorToken );
    this.rightHandSide = Object.freeze( rightHandSide );

    Object.freeze( this );

  }

  public leftHandSide : AstExpression;

  public operatorToken : BarlomToken;

  public rightHandSide : AstExpression;

}
