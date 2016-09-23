import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';
import { AstVariable } from './AstVariable';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';

/**
 * Parser plugin that recognizes a variable.
 */
export class VariableParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'variable';
  }

  /**
   * Parses a variable after its leading annotations and tag have been consumed.
   * @returns {AstVariable} the parsed variable definition.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      variableToken : BarlomToken
  ) : AstVariable {

    let path = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    var variableExpression : AstExpression = null;
    if ( tokenStream.advanceOverLookAhead1Token( BarlomTokenType.EQUALS ) ) {
      variableExpression = coreParser.parseExpression();
    }

    return new AstVariable( leadingAnnotations, variableToken, path, trailingAnnotations, variableExpression );

  }

}
