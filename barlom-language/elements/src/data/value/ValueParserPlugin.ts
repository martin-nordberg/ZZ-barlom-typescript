import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';
import { AstValue } from './AstValue';

/**
 * Parser plugin that recognizes a value.
 */
export class ValueParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'value';
  }

  /**
   * Parses a value after its leading annotations and tag have been consumed.
   * @returns {AstValue} the parsed value definition.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      valueToken : BarlomToken
  ) : AstValue {

    let path = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    tokenStream.consumeExpectedToken( BarlomTokenType.EQUALS );

    let valueExpression = coreParser.parseExpression();

    return new AstValue( leadingAnnotations, valueToken, path, trailingAnnotations, valueExpression );

  }

}
