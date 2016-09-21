import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstBehavior } from './AstBehavior';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a behavior (abstract function).
 */
export class BehaviorParserPlugin
  extends CodeElementParserPlugin {

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
