import { ICodeElementParserPlugin } from './ICodeElementParserPlugin';
import { AstAnnotation } from '../../ast/src/AstAnnotation';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { BarlomTokenStream } from './BarlomTokenStream';
import { AstSymbol } from '../../ast/src/AstSymbol';
import { ICoreParser } from './ICoreParser';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * Parser plugin that recognizes a symbol.
 */
export class SymbolParserPlugin
  implements ICodeElementParserPlugin {

  getTagText() : string {
    return '#symbol';
  }

  /**
   * Parses a symbol within an enumeration type, starting after its leading annotations and symbol tag have been
   * consumed.
   * @returns {AstSymbol} the parsed symbol.
   */
  parseCodeElement(
      tokenStream : BarlomTokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      symbolToken : BarlomToken
  ) : AstSymbol {

    let identifier = tokenStream.consumeExpectedToken( BarlomTokenType.Identifier );

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstSymbol( symbolToken, identifier, leadingAnnotations, trailingAnnotations );

  }

}