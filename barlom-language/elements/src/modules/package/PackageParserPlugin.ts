import { AstAnnotation } from '../../../../ast/src/annotations/AstAnnotation';
import { AstPackage } from './AstPackage';
import { BarlomToken } from '../../../../lexer/src/BarlomToken';
import { CodeElementParserPlugin } from '../../../../parserspi/src/CodeElementParserPlugin';
import { ICoreParser } from '../../../../parserspi/src/ICoreParser';
import { ITokenStream } from '../../../../parserspi/src/ITokenStream';

/**
 * Parser plugin that recognizes a package.
 */
export class PackageParserPlugin
  extends CodeElementParserPlugin {

  getTagText() : string {
    return 'package';
  }

  /**
   * Parses a package after its leading annotations and tag have been consumed.
   * @returns {AstPackage} the parsed package.
   */
  parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      packageToken : BarlomToken
  ) : AstPackage {

    let path = coreParser.parseCodeElementName();

    let trailingAnnotations = coreParser.parseTrailingAnnotations();

    let codeElements = coreParser.parseCodeElements();

    return new AstPackage( leadingAnnotations, packageToken, path, trailingAnnotations, codeElements );

  }

}
