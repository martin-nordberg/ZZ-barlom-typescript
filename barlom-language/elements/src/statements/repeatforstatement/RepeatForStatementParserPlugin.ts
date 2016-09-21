import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstRepeatForStatement } from './AstRepeatForStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';

/**
 * Parser plugin that recognizes a repeat-for statement.
 */
export class RepeatForStatementParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'repeat';
  }

  getTag2Text() : string {
    return 'for';
  }

  /**
   * Parses a repeat-for statement after its leading annotations and tag have been consumed.
   * @returns {AstRepeatForStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      repeatToken : BarlomToken
  ) : AstRepeatForStatement {

    let iteratorExpression = coreParser.parseCodeElementName();

    let iteratorAnnotations = coreParser.parseTrailingAnnotations();

    tokenStream.consumeExpectedToken( BarlomTokenType.IN );

    let collectionExpression = coreParser.parseExpression();

    let statements = coreParser.parseCodeElements();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstRepeatForStatement( leadingAnnotations, repeatToken, iteratorExpression, iteratorAnnotations,
                                      collectionExpression, statements, trailingAnnotations );

  }

}
