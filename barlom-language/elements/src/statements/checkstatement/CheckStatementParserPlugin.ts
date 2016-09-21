import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { ICodeElementParserPlugin } from '../../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';
import { AstCheckStatement } from './AstCheckStatement';
import { BarlomTokenType } from '../../../../lexer/src/BarlomTokenType';
import { AstDetectFragment } from './AstDetectFragment';
import { AstRegardlessFragment } from './AstRegardlessFragment';

/**
 * Parser plugin that recognizes an assert statement.
 */
export class CheckStatementParserPlugin
  implements ICodeElementParserPlugin {

  getAuxiliaryTags() : string[] {
    return ['detect','regardless'];
  }

  getTagText() : string {
    return 'check';
  }

  /**
   * Parses an assert statement after its leading annotations and tag have been consumed.
   * @returns {AstAssertStatement} the parsed statement.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      checkToken : BarlomToken
  ) : AstCheckStatement {

    let checkedStatements = [];
    let detectFragments = [];

    while ( !tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'detect' ) &&
            !tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'regardless' ) &&
            !tokenStream.hasLookAhead1Token( BarlomTokenType.END ) ) {
      checkedStatements.push( coreParser.parseCodeElement() );
    }

    while ( tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'detect' ) ) {

      let detectToken = tokenStream.consumeBufferedToken();
      let parameterName = tokenStream.consumeExpectedToken( BarlomTokenType.Identifier );
      let parameterTrailingAnnotations = coreParser.parseTrailingAnnotations();

      let detectStatements = [];
      while ( !tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'detect' ) &&
              !tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'regardless' ) &&
              !tokenStream.hasLookAhead1Token( BarlomTokenType.END ) ) {
        detectStatements.push( coreParser.parseCodeElement() );
      }

      detectFragments.push( new AstDetectFragment(detectToken, parameterName, parameterTrailingAnnotations, detectStatements ) );

    }

    var regardlessFragment = null;
    if ( tokenStream.hasLookAhead1TokenValue( BarlomTokenType.Tag, 'regardless' ) ) {

      let regardlessToken = tokenStream.consumeBufferedToken();

      let regardlessStatements = [];
      while ( !tokenStream.hasLookAhead1Token( BarlomTokenType.END ) ) {
        regardlessStatements.push( coreParser.parseCodeElement() );
      }

      regardlessFragment = new AstRegardlessFragment( regardlessToken, regardlessStatements );

    }

    tokenStream.consumeExpectedToken( BarlomTokenType.END );

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstCheckStatement( leadingAnnotations, checkToken, checkedStatements, detectFragments, regardlessFragment, trailingAnnotations );

  }

}
