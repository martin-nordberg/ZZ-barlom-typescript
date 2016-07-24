import { ICodeElementParserPlugin } from './ICodeElementParserPlugin';
import { AstAnnotation } from '../../ast/src/AstAnnotation';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { BarlomTokenStream } from './BarlomTokenStream';
import { ICoreParser } from './ICoreParser';
import { AstEnumerationType } from '../../ast/src/AstEnumerationType';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * Parser plugin that recognizes an enumeration type.
 */
export class EnumerationTypeParserPlugin
  implements ICodeElementParserPlugin {

  getTagText() : string {
    return '#enumeration_type';
  }

  /**
   * Parses an enumeration type after its leading annotations and tag have been consumed.
   * @returns {AstEnumerationType} the parsed enumeration type.
   */
  parseCodeElement(
      tokenStream : BarlomTokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      enumTypeToken : BarlomToken
  ) : AstEnumerationType {

    let identifier = tokenStream.consumeExpectedToken( BarlomTokenType.Identifier );

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    tokenStream.consumeExpectedTokenValue( BarlomTokenType.Tag, '#end' );

    return new AstEnumerationType( enumTypeToken, identifier, leadingAnnotations, trailingAnnotations, codeElements );

  }

}