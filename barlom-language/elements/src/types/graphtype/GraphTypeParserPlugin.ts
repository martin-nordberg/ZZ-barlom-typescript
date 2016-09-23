import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstGraphType } from './AstGraphType';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a graph type.
 */
export class GraphTypeParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'graph';
  }

  getTag2Text() : string {
    return 'type';
  }

  /**
   * Parses a graph type after its leading annotations and tag have been consumed.
   * @returns {AstGraphType} the parsed graph type.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      graphToken : BarlomToken
  ) : AstGraphType {

    let codeElementName = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstGraphType( leadingAnnotations, graphToken, codeElementName, trailingAnnotations, codeElements );

  }

}
