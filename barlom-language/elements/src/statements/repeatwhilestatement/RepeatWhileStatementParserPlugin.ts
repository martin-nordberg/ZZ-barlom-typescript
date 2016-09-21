import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstRepeatWhileStatement } from './AstRepeatWhileStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a repeat-while statement.
 */
export class RepeatWhileStatementParserPlugin
  implements ICodeElementParserPlugin {

  getAuxiliaryTags() : string[] {
    return [];
  }

  getTagText() : string {
    return 'repeat_while';
  }

  /**
   * Parses a repeat-while statement after its leading annotations and tag have been consumed.
   * @returns {AstRepeatWhileStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      repeatWhileToken : BarlomToken
  ) : AstRepeatWhileStatement {

    let guardExpression = coreParser.parseExpression();

    let statements = coreParser.parseCodeElements();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstRepeatWhileStatement( leadingAnnotations, repeatWhileToken, guardExpression, statements, trailingAnnotations );

  }

}
