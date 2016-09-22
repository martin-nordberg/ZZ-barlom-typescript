import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';
import { AstConstant } from './AstConstant';

/**
 * Parser plugin that recognizes a constant.
 */
export class ConstantParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'constant';
  }

  /**
   * Parses a constant after its leading annotations and tag have been consumed.
   * @returns {AstConstant} the parsed constant definition.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      constantToken : BarlomToken
  ) : AstConstant {

    let path = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    tokenStream.consumeExpectedToken( BarlomTokenType.EQUALS );

    let constantExpression = coreParser.parseExpression();

    return new AstConstant( leadingAnnotations, constantToken, path, trailingAnnotations, constantExpression );

  }

}
