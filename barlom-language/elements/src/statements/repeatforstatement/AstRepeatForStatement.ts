import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a repeat-for statement.
 */
export class AstRepeatForStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      repeatToken : BarlomToken,
      iteratorExpression : AstExpression,
      iteratorAnnotations : AstAnnotation[],
      collectionExpression : AstExpression,
      statements : AstCodeElement[],
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, repeatToken, trailingAnnotations );

    this.iteratorExpression = Object.freeze( iteratorExpression );
    this.iteratorAnnotations = Object.freeze( iteratorAnnotations );
    this.collectionExpression = Object.freeze( collectionExpression );
    this.statements = Object.freeze( statements );

    Object.freeze( this );

  }

  public collectionExpression : AstExpression;

  public iteratorAnnotations : AstAnnotation[];

  public iteratorExpression : AstExpression;

  public statements : AstCodeElement[];

}
