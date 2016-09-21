import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { AstDetectFragment } from './AstDetectFragment';
import { AstRegardlessFragment } from './AstRegardlessFragment';

/**
 * AST node representing a check statement.
 */
export class AstCheckStatement
  extends AstCodeElement {

  constructor(
      leadingAnnotations : AstAnnotation[],
      checkToken : BarlomToken,
      checkedStatements : AstCodeElement[],
      detectFragments : AstDetectFragment[],
      regardlessFragment : AstRegardlessFragment,
      trailingAnnotations : AstAnnotation[]
  ) {

    super( leadingAnnotations, checkToken, trailingAnnotations );

    this.checkedStatements = Object.freeze( checkedStatements );
    this.detectFragments = Object.freeze( detectFragments );
    this.regardlessFragment = Object.freeze( regardlessFragment );

    Object.freeze( this );

  }

  public checkedStatements : AstCodeElement[];

  public detectFragments : AstDetectFragment[];

  public regardlessFragment : AstRegardlessFragment;

}
