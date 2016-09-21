import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstRaiseErrorStatement } from './AstRaiseErrorStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a raise error statement.
 */
export class RaiseErrorStatementParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'raise';
  }

  getTag2Text() : string {
    return 'error';
  }

  /**
   * Parses a raise error statement after its leading annotations and tag have been consumed.
   * @returns {AstRaiseErrorStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      raiseToken : BarlomToken
  ) : AstRaiseErrorStatement {

    let calledExpression = coreParser.parseExpression();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstRaiseErrorStatement( leadingAnnotations, raiseToken, calledExpression, trailingAnnotations );

  }

}
