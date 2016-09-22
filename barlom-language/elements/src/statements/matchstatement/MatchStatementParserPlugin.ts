import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstMatchFragment } from './AstMatchFragment';
import { AstMatchStatement } from './AstMatchStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';
import { AstExpression } from '../../../../ast/src/expressions/AstExpression';

/**
 * Parser plugin that recognizes a match statement.
 */
export class MatchStatementParserPlugin
  extends CodeElementParserPlugin {

  getAuxiliaryTags() : string[] {
    return ['else', 'where'];
  }

  getTagText() : string {
    return 'match';
  }

  /**
   * Parses a match statement after its leading annotations and tag have been consumed.
   * @returns {AstAssertStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      matchToken : BarlomToken
  ) : AstMatchStatement {

    let matchFragments : AstMatchFragment[] = [];

    let matchedExpression = coreParser.parseExpression();

    while ( !tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'else' ) &&
            !tokenStream.hasLookAhead1Token( BarlomTokenType.END ) ) {

      let patternExpression = coreParser.parseExpression();

      var whereExpression: AstExpression = null;
      if ( tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'where' ) ) {
        tokenStream.consumeBufferedToken();
        whereExpression = coreParser.parseExpression();
      }

      let arrowToken = tokenStream.consumeExpectedToken( BarlomTokenType.ARROW_EQUAL_RIGHT );

      // TODO: decide how to punctuate multiple statements per match
      var statements = [ coreParser.parseCodeElement() ];

      matchFragments.push( new AstMatchFragment( arrowToken, patternExpression, whereExpression, statements ) );

    }

    let elseStatements : AstCodeElement[] = [];

    if ( tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'else' ) ) {

      tokenStream.consumeBufferedToken();

      while ( !tokenStream.hasLookAhead1Token( BarlomTokenType.END ) ) {
        elseStatements.push( coreParser.parseCodeElement() );
      }

    }

    tokenStream.consumeExpectedToken( BarlomTokenType.END );

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstMatchStatement( leadingAnnotations, matchToken, matchedExpression, matchFragments, elseStatements, trailingAnnotations );

  }

}
