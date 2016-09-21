import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstIfFragment } from './AstIfFragment';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';

/**
 * AST node representing an if statement.
 */
export class AstIfStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      ifToken : BarlomToken,
      ifFragments : AstIfFragment[],
      elseStatements : AstCodeElement[],
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, ifToken, trailingAnnotations );

    this.ifFragments = Object.freeze( ifFragments );
    this.elseStatements = Object.freeze( elseStatements );

    Object.freeze( this );

  }

  public ifFragments : AstIfFragment[];

  public elseStatements : AstCodeElement[];

}
