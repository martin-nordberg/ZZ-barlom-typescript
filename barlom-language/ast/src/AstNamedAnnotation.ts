import { AstAnnotation } from './AstAnnotation';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * AST Node representing a named annotation.
 */
export class AstNamedAnnotation extends AstAnnotation {

  constructor(
      identifier : BarlomToken
  ) {
    super( identifier );
    this.identifier = Object.freeze( identifier );
    Object.freeze( this );
  }

  public identifier : BarlomToken;

}