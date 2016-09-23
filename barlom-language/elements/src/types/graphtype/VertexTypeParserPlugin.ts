import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstParameter } from '../../../../ast/src/parameters/AstParameter';
import { AstVertexType } from './AstVertexType';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a vertex type.
 */
export class VertexTypeParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'vertex';
  }

  getTag2Text() : string {
    return 'type';
  }

  /**
   * Parses a vertex type after its leading annotations and tag have been consumed.
   * @returns {AstVertexType} the parsed vertex type.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      vertexToken : BarlomToken
  ) : AstVertexType {

    let codeElementName = coreParser.parseCodeElementName();

    var parameters : AstParameter[] = [];
    if ( tokenStream.hasLookAhead1Token( BarlomTokenType.LEFT_PARENTHESIS ) ) {
      parameters = coreParser.parseParameters();
    }

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstVertexType( leadingAnnotations, vertexToken, codeElementName, parameters, trailingAnnotations, codeElements );

  }

}
