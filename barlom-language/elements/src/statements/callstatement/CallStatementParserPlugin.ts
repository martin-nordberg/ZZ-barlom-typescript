import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCallStatement } from './AstCallStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a call statement.
 */
export class CallStatementParserPlugin
  implements ICodeElementParserPlugin {

  getAuxiliaryTags() : string[] {
    return [];
  }

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
