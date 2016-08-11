import { AstAnnotation } from '../../../../ast/src/AstAnnotation';
import { AstModule } from './AstModule';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a module.
 */
export class ModuleParserPlugin
  implements ICodeElementParserPlugin {

  getTagText() : string {
    return 'module';
  }

  /**
   * Parses a module after its leading annotations and tag have been consumed.
   * @returns {AstModule} the parsed module.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      moduleToken : BarlomToken
  ) : AstModule {

    let path = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    tokenStream.consumeExpectedToken( BarlomTokenType.END );

    return new AstModule( leadingAnnotations, moduleToken, path, trailingAnnotations, codeElements );

  }

}
