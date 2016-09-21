import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstRepeatUntilStatement } from './AstRepeatUntilStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a repeat-until statement.
 */
export class RepeatUntilStatementParserPlugin
  implements ICodeElementParserPlugin {

  getAuxiliaryTags() : string[] {
    return [];
  }

  getTagText() : string {
    return 'repeat_until';
  }

  /**
   * Parses a repeat-until statement after its leading annotations and tag have been consumed.
   * @returns {AstRepeatUntilStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      repeatUntilToken : BarlomToken
  ) : AstRepeatUntilStatement {

    let guardExpression = coreParser.parseExpression();

    let statements = coreParser.parseCodeElements();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstRepeatUntilStatement( leadingAnnotations, repeatUntilToken, guardExpression, statements, trailingAnnotations );

  }

}
