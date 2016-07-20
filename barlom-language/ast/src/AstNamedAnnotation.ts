import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstAnnotation } from './AstAnnotation';

/**
 * AST Node representing a named annotation.
 */
export class AstNamedAnnotation extends AstAnnotation {

  constructor(
      identifier : BarlomToken
  ) {
    super( identifier );
    this.identifier = identifier;
  }

  public identifier : BarlomToken;

}