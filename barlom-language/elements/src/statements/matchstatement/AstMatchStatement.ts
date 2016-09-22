import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { AstMatchFragment } from './AstMatchFragment';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing a match statement.
 */
export class AstMatchStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      matchToken : BarlomToken,
      matchedExpression : AstExpression,
      matchFragments : AstMatchFragment[],
      elseStatements : AstCodeElement[],
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, matchToken, trailingAnnotations );

    this.matchedExpression = Object.freeze( matchedExpression );
    this.matchFragments = Object.freeze( matchFragments );
    this.elseStatements = Object.freeze( elseStatements );

    Object.freeze( this );

  }

  public matchedExpression : AstExpression;

  public matchFragments : AstMatchFragment[];

  public elseStatements : AstCodeElement[];

}
