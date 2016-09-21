import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstAssertStatement } from './AstAssertStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes an assert statement.
 */
export class AssertStatementParserPlugin
  implements ICodeElementParserPlugin {

  getAuxiliaryTags() : string[] {
    return [];
  }

  getTagText() : string {
    return 'assert';
  }

  /**
   * Parses an assert statement after its leading annotations and tag have been consumed.
   * @returns {AstAssertStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      assertToken : BarlomToken
  ) : AstAssertStatement {

    let assertedExpression = coreParser.parseExpression();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstAssertStatement( leadingAnnotations, assertToken, assertedExpression, trailingAnnotations );

  }

}
