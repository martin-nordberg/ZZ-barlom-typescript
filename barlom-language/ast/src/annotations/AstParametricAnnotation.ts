import { AstAnnotation } from './AstAnnotation';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { AstExpression } from '../expressions/AstExpression';

/**
 * AST Node representing an annotation with arguments.
 */
export class AstParametricAnnotation extends AstAnnotation {

  constructor(
      identifier : BarlomToken,
      argExpressions : AstExpression[]
  ) {
    super( identifier );

    this.identifier = Object.freeze( identifier );
    this.argExpressions = Object.freeze( argExpressions );

    Object.freeze( this );
  }

  public argExpressions : AstExpression[];

  public identifier : BarlomToken;

}