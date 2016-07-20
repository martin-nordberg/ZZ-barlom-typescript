import { BarlomToken } from '../../lexer/src/BarlomToken';
import { AstAnnotation } from './AstAnnotation';
import { AstCodeElement } from './AstCodeElement';
import { AstPath } from './AstPath';

/**
 * AST Node representing an enumeration type at the compilation unit level.
 */
export class AstNamespacedEnumerationType extends AstCodeElement {

  constructor(
      keyToken : BarlomToken,
      annotations : AstAnnotation[]
  ) {
    super( keyToken, annotations );
  }

  public path : AstPath;

}