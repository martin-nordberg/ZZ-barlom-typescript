import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { AstNode } from '../../../../ast/src/core/AstNode';

/**
 * AST node representing a detect fragment within a check statement.
 */
export class AstDetectFragment
  extends AstNode {

  constructor(
      detectToken : BarlomToken,
      parameterName : BarlomToken,
      parameterTrailingAnnotations : AstAnnotation[],
      detectStatements : AstCodeElement[]
  ) {

    super( detectToken );

    this.detectStatements = Object.freeze( detectStatements );
    this.parameterName = Object.freeze( parameterName );
    this.parameterTrailingAnnotations = Object.freeze( parameterTrailingAnnotations );

    Object.freeze( this );

  }

  public detectStatements : AstCodeElement[];

  public parameterName : BarlomToken;

  public parameterTrailingAnnotations : AstAnnotation[];

}
