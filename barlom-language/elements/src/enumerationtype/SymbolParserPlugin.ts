import { AstAnnotation } from '../../../ast/src/AstAnnotation';
import { AstSymbol } from './AstSymbol';
import { BarlomToken } from '../../../lexer/src/BarlomToken';
import { ICodeElementParserPlugin } from '../../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a symbol.
 */
export class SymbolParserPlugin
  implements ICodeElementParserPlugin {

  getTagText() : string {
    return 'symbol';
  }

  /**
   * Parses a symbol within an enumeration type, starting after its leading annotations and symbol tag have been
   * consumed.
   * @returns {AstSymbol} the parsed symbol.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      symbolToken : BarlomToken
  ) : AstSymbol {

    let codeElementName = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    return new AstSymbol( leadingAnnotations, symbolToken, codeElementName, trailingAnnotations );

  }

}
