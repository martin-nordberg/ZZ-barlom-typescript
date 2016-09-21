import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstFunction } from './AstFunction';
import { AstShortFunction } from './AstShortFunction';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';
import { AstBehavior } from './AstBehavior';

/**
 * Parser plugin that recognizes a behavior (abstract function).
 */
export class BehaviorParserPlugin
  implements ICodeElementParserPlugin {

  getAuxiliaryTags() : string[] {
    return [];
  }

  getTagText() : string {
    return 'behavior';
  }

  /**
   * Parses a behavior after its leading annotations and tag have been consumed.
   * @returns {AstBehavior} the parsed function.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      functionToken : BarlomToken
  ) : AstBehavior {

    let path = coreParser.parseCodeElementName();

    let parameters = coreParser.parseParameters();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstBehavior( leadingAnnotations, functionToken, path, parameters, trailingAnnotations );

  }

}
