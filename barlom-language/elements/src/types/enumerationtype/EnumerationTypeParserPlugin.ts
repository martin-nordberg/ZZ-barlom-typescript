import { AstAnnotation } from '../../../../ast/src/AstAnnotation';
import { AstEnumerationType } from './AstEnumerationType';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes an enumeration type.
 */
export class EnumerationTypeParserPlugin
  implements ICodeElementParserPlugin {

  getTagText() : string {
    return 'enumeration_type';
  }

  /**
   * Parses an enumeration type after its leading annotations and tag have been consumed.
   * @returns {AstEnumerationType} the parsed enumeration type.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      enumTypeToken : BarlomToken
  ) : AstEnumerationType {

    let codeElementName = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    tokenStream.consumeExpectedToken( BarlomTokenType.END );

    return new AstEnumerationType( leadingAnnotations, enumTypeToken, codeElementName, trailingAnnotations, codeElements );

  }

}
