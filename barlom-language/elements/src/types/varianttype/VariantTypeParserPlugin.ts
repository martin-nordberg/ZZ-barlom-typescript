import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstVariantType } from './AstVariantType';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a variant type.
 */
export class VariantTypeParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'variant';
  }

  getTag2Text() : string {
    return 'type';
  }

  /**
   * Parses a variant type after its leading annotations and tag have been consumed.
   * @returns {AstVariantType} the parsed variant type.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      variantToken : BarlomToken
  ) : AstVariantType {

    let codeElementName = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstVariantType( leadingAnnotations, variantToken, codeElementName, trailingAnnotations, codeElements );

  }

}
