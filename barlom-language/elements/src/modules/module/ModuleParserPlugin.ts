import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstModule } from './AstModule';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a module.
 */
export class ModuleParserPlugin
  extends CodeElementParserPlugin {

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

    return new AstModule( leadingAnnotations, moduleToken, path, trailingAnnotations, codeElements );

  }

}
