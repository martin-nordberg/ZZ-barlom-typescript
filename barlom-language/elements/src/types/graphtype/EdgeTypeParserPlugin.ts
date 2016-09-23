import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstEdgeType } from './AstEdgeType';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a edge type.
 */
export class EdgeTypeParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'edge';
  }

  getTag2Text() : string {
    return 'type';
  }

  /**
   * Parses a edge type after its leading annotations and tag have been consumed.
   * @returns {AstEdgeType} the parsed edge type.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      edgeToken : BarlomToken
  ) : AstEdgeType {

    let codeElementName = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstEdgeType( leadingAnnotations, edgeToken, codeElementName, trailingAnnotations, codeElements );

  }

}
