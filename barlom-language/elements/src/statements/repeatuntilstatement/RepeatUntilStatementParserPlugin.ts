import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstRepeatUntilStatement } from './AstRepeatUntilStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a repeat-until statement.
 */
export class RepeatUntilStatementParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'repeat';
  }

  getTag2Text() : string {
    return 'until';
  }

  /**
   * Parses a repeat-until statement after its leading annotations and tag have been consumed.
   * @returns {AstRepeatUntilStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      repeatToken : BarlomToken
  ) : AstRepeatUntilStatement {

    let guardExpression = coreParser.parseExpression();

    let statements = coreParser.parseCodeElements();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstRepeatUntilStatement( leadingAnnotations, repeatToken, guardExpression, statements, trailingAnnotations );

  }

}
