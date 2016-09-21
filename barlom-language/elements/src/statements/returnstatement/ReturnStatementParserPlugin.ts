import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstReturnStatement } from './AstReturnStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a return statement.
 */
export class ReturnStatementParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'return';
  }

  /**
   * Parses a return statement after its leading annotations and tag have been consumed.
   * @returns {AstReturnStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      returnToken : BarlomToken
  ) : AstReturnStatement {

    let returnedExpression = coreParser.parseExpression();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstReturnStatement( leadingAnnotations, returnToken, returnedExpression, trailingAnnotations );

  }

}
