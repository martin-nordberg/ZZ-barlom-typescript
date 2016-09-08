import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstUnlessStatement } from './AstUnlessStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';

/**
 * Parser plugin that recognizes an unless statement.
 */
export class UnlessStatementParserPlugin
  implements ICodeElementParserPlugin {

  getTagText() : string {
    return 'unless';
  }

  /**
   * Parses an unless statement after its leading annotations and tag have been consumed.
   * @returns {AstUnlessStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      unlessToken : BarlomToken
  ) : AstUnlessStatement {

    let guardExpression = coreParser.parseExpression();

    let statements = coreParser.parseCodeElements();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstUnlessStatement( leadingAnnotations, unlessToken, guardExpression, statements, trailingAnnotations );

  }

}
