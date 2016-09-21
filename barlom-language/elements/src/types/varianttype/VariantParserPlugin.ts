import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstVariant } from './AstVariant';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a variant within a variant type.
 */
export class VariantParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'variant';
  }

  /**
   * Parses a variant after its leading annotations and tag have been consumed.
   * @returns {AstVariant} the parsed variant.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      variantToken : BarlomToken
  ) : AstVariant {

    let codeElementName = coreParser.parseCodeElementName();

    let parameters = coreParser.parseParameters();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstVariant( leadingAnnotations, variantToken, codeElementName, parameters, trailingAnnotations );

  }

}
