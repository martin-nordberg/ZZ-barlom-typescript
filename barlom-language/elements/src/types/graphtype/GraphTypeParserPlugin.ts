import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstGraphType } from './AstGraphType';
import { AstParameter } from '../../../../ast/src/parameters/AstParameter';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
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

    var parameters : AstParameter[] = [];
    if ( tokenStream.hasLookAhead1Token( BarlomTokenType.LEFT_PARENTHESIS ) ) {
      parameters = coreParser.parseParameters();
    }

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstGraphType( leadingAnnotations, graphToken, codeElementName, parameters, trailingAnnotations, codeElements );

  }

}
