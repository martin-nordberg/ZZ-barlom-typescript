import { AstAnnotation } from '../../../ast/src/AstAnnotation';
import { AstVariantType } from './AstVariantType';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../lexer/src/BarlomTokenType';
import { ICodeElementParserPlugin } from '../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes an variant type.
 */
export class VariantTypeParserPlugin
  implements ICodeElementParserPlugin {

  getTagText() : string {
    return 'variant_type';
  }

  /**
   * Parses an enumeration type after its leading annotations and tag have been consumed.
   * @returns {AstEnumerationType} the parsed enumeration type.
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

    tokenStream.consumeExpectedToken( BarlomTokenType.END );

    return new AstVariantType( variantTypeToken, codeElementName, leadingAnnotations, trailingAnnotations, codeElements );

  }

}
