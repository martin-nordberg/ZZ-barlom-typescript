import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstRepeatWhileStatement } from './AstRepeatWhileStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a repeat-while statement.
 */
export class RepeatWhileStatementParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'repeat';
  }

  getTag2Text() : string {
    return 'while';
  }

  /**
   * Parses a repeat-while statement after its leading annotations and tag have been consumed.
   * @returns {AstRepeatWhileStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      repeatToken : BarlomToken
  ) : AstRepeatWhileStatement {

    let guardExpression = coreParser.parseExpression();

    let statements = coreParser.parseCodeElements();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstRepeatWhileStatement( leadingAnnotations, repeatToken, guardExpression, statements, trailingAnnotations );

  }

}
