import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCallStatement } from './AstCallStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a call statement.
 */
export class CallStatementParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'call';
  }

  /**
   * Parses a call statement after its leading annotations and tag have been consumed.
   * @returns {AstCallStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      callToken : BarlomToken
  ) : AstCallStatement {

    let calledExpression = coreParser.parseExpression();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstCallStatement( leadingAnnotations, callToken, calledExpression, trailingAnnotations );

  }

}
