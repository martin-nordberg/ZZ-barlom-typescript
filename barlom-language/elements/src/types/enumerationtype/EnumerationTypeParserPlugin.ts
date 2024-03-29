import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstEnumerationType } from './AstEnumerationType';
import { AstParameter } from '../../../../ast/src/parameters/AstParameter';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes an enumeration type.
 */
export class EnumerationTypeParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'enumeration';
  }

  getTag2Text() : string {
    return 'type';
  }

  /**
   * Parses an enumeration type after its leading annotations and tag have been consumed.
   * @returns {AstEnumerationType} the parsed enumeration type.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      enumerationToken : BarlomToken
  ) : AstEnumerationType {

    let codeElementName = coreParser.parseCodeElementName();

    var parameters : AstParameter[] = [];
    if ( tokenStream.hasLookAhead1Token( BarlomTokenType.LEFT_PARENTHESIS ) ) {
      parameters = coreParser.parseParameters();
    }

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstEnumerationType( leadingAnnotations, enumerationToken, codeElementName, parameters, trailingAnnotations, codeElements );

  }

}
