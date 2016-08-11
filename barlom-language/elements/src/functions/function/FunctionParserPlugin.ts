import { AstAnnotation } from '../../../../ast/src/AstAnnotation';
import { AstFunction } from './AstFunction';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a function.
 */
export class FunctionParserPlugin
  implements ICodeElementParserPlugin {

  getTagText() : string {
    return 'function';
  }

  /**
   * Parses a function after its leading annotations and tag have been consumed.
   * @returns {AstFunction} the parsed function.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      functionToken : BarlomToken
  ) : AstFunction {

    let path = coreParser.parseCodeElementName();

    let parameters = coreParser.parseParameters();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    tokenStream.consumeExpectedToken( BarlomTokenType.END );

    return new AstFunction( leadingAnnotations, functionToken, path, parameters, trailingAnnotations, codeElements );

  }

}
