import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstAnnotation } from './AstAnnotation';

/**
 * AST Node representing an annotation with summary documentation (a text literal).
 */
export class AstSummaryDocAnnotation extends AstAnnotation {

  constructor(
      documentation : BarlomToken
  ) {
    super( documentation );
    this.documentation = Object.freeze( documentation );
    Object.freeze( this );
  }

  public documentation : BarlomToken;

}