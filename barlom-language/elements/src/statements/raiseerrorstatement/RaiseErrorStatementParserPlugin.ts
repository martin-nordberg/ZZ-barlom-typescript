import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstRaiseErrorStatement } from './AstRaiseErrorStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a raise error statement.
 */
export class RaiseErrorStatementParserPlugin
  implements ICodeElementParserPlugin {

  getTagText() : string {
    return 'raise_error';
  }

  /**
   * Parses a raise error statement after its leading annotations and tag have been consumed.
   * @returns {AstRaiseErrorStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      callToken : BarlomToken
  ) : AstRaiseErrorStatement {

    let calledExpression = coreParser.parseExpression();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstRaiseErrorStatement( leadingAnnotations, callToken, calledExpression, trailingAnnotations );

  }

}
