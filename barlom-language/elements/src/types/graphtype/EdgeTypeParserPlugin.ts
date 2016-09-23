import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstEdgeType } from './AstEdgeType';
import { AstParameter } from '../../../../ast/src/parameters/AstParameter';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
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

    var parameters : AstParameter[] = [];
    if ( tokenStream.hasLookAhead1Token( BarlomTokenType.LEFT_PARENTHESIS ) ) {
      parameters = coreParser.parseParameters();
    }

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstEdgeType( leadingAnnotations, edgeToken, codeElementName, parameters, trailingAnnotations, codeElements );

  }

}
