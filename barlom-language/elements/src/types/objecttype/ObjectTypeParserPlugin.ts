import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstObjectType } from './AstObjectType';
import { AstParameter } from '../../../../ast/src/parameters/AstParameter';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a object type.
 */
export class ObjectTypeParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'object';
  }

  getTag2Text() : string {
    return 'type';
  }

  /**
   * Parses a object type after its leading annotations and tag have been consumed.
   * @returns {AstObjectType} the parsed object type.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      objectToken : BarlomToken
  ) : AstObjectType {

    let codeElementName = coreParser.parseCodeElementName();

    var parameters : AstParameter[] = [];
    if ( tokenStream.hasLookAhead1Token( BarlomTokenType.LEFT_PARENTHESIS ) ) {
      parameters = coreParser.parseParameters();
    }

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstObjectType( leadingAnnotations, objectToken, codeElementName, parameters, trailingAnnotations, codeElements );

  }

}
