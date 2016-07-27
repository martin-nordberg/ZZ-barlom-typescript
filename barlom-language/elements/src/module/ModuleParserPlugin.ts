import { AstAnnotation } from '../../../ast/src/AstAnnotation';
import { AstModule } from './AstModule';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../lexer/src/BarlomTokenType';
import { ICodeElementParserPlugin } from '../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a module.
 */
export class ModuleParserPlugin
  implements ICodeElementParserPlugin {

  getTagText() : string {
    return 'module';
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
  ) : AstModule {

    let path = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    tokenStream.consumeExpectedToken( BarlomTokenType.END );

    return new AstModule( enumTypeToken, path, leadingAnnotations, trailingAnnotations, codeElements );

  }

}
