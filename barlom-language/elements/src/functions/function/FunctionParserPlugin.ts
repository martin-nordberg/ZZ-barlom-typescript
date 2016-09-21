import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstFunction } from './AstFunction';
import { AstShortFunction } from './AstShortFunction';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a function.
 */
export class FunctionParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'function';
  }

  /**
   * Parses a function after its leading annotations and tag have been consumed.
   * @returns {AstCodeElement} the parsed function.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      functionToken : BarlomToken
  ) : AstCodeElement {

    let path = coreParser.parseCodeElementName();

    if ( tokenStream.hasLookAhead1Token( BarlomTokenType.LEFT_PARENTHESIS ) ) {

      let parameters = coreParser.parseParameters();

      let trailingAnnotations = coreParser.parseTrailingAnnotations();

      let codeElements = coreParser.parseCodeElements();

      return new AstFunction( leadingAnnotations, functionToken, path, parameters, trailingAnnotations, codeElements );

    }
    else {

      tokenStream.consumeExpectedToken( BarlomTokenType.EQUALS );

      let functionExpression = coreParser.parseExpression();

      return new AstShortFunction( leadingAnnotations, functionToken, path, functionExpression );
    }

  }

}
