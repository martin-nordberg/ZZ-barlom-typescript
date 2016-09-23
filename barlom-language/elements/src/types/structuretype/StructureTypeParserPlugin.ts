import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstStructureType } from './AstStructureType';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a structure type.
 */
export class StructureTypeParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'structure';
  }

  getTag2Text() : string {
    return 'type';
  }

  /**
   * Parses a structure type after its leading annotations and tag have been consumed.
   * @returns {AstStructureType} the parsed structure type.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      structureToken : BarlomToken
  ) : AstStructureType {

    let codeElementName = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstStructureType( leadingAnnotations, structureToken, codeElementName, trailingAnnotations, codeElements );

  }

}
