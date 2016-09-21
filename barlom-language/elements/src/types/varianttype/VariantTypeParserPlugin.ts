import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstVariantType } from './AstVariantType';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a variant type.
 */
export class VariantTypeParserPlugin
  implements ICodeElementParserPlugin {

  getAuxiliaryTags() : string[] {
    return [];
  }

  getTagText() : string {
    return 'variant_type';
  }

  /**
   * Parses a variant type after its leading annotations and tag have been consumed.
   * @returns {AstVariantType} the parsed variant type.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      variantTypeToken : BarlomToken
  ) : AstVariantType {

    let codeElementName = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstVariantType( leadingAnnotations, variantTypeToken, codeElementName, trailingAnnotations, codeElements );

  }

}
