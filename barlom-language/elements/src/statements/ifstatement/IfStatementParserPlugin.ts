import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../../../ast/src/core/AstCodeElement';
import { AstIfFragment } from './AstIfFragment';
import { AstIfStatement } from './AstIfStatement';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes an assert statement.
 */
export class IfStatementParserPlugin
  extends CodeElementParserPlugin {

  getAuxiliaryTags() : string[] {
    return ['else'];
  }

  getTagText() : string {
    return 'if';
  }

  /**
   * Parses an assert statement after its leading annotations and tag have been consumed.
   * @returns {AstAssertStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      ifToken : BarlomToken
  ) : AstIfStatement {

    let ifFragments : AstIfFragment[] = [];
    let elseStatements : AstCodeElement[] = [];

    let ifExpression = coreParser.parseExpression();
    var statements : AstCodeElement[] = [];
    while ( !tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'else' ) &&
            !tokenStream.hasLookAhead1Token( BarlomTokenType.END ) ) {
      statements.push( coreParser.parseCodeElement() );
    }
    ifFragments.push( new AstIfFragment( ifToken, ifExpression, statements ) );

    while ( tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'else' ) &&
            tokenStream.hasLookAhead2TokenValue( BarlomTokenType.Tag, 'if' )) {

      let elseToken = tokenStream.consumeBufferedToken();
      tokenStream.consumeBufferedToken();
      let elseExpression = coreParser.parseExpression();
      statements = [];

      while ( !tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'else' ) &&
              !tokenStream.hasLookAhead1Token( BarlomTokenType.END ) ) {
        statements.push( coreParser.parseCodeElement() );
      }

      ifFragments.push( new AstIfFragment( elseToken, elseExpression, statements ) );

    }

    if ( tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'else' ) ) {

      tokenStream.consumeBufferedToken();

      while ( !tokenStream.hasLookAhead1Token( BarlomTokenType.END ) ) {
        elseStatements.push( coreParser.parseCodeElement() );
      }

    }

    tokenStream.consumeExpectedToken( BarlomTokenType.END );

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstIfStatement( leadingAnnotations, ifToken, ifFragments, elseStatements, trailingAnnotations );

  }

}
