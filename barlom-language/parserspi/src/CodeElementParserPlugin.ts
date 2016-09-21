import { AstAnnotation } from '../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../ast/src/core/AstCodeElement';
import { BarlomToken } from '../../lexer/src/BarlomToken';
import { ICoreParser } from './ICoreParser';
import { ITokenStream } from './ITokenStream';

/**
 * Abstract definition of a plugin that will parse one kind of code element.
 */
export abstract class CodeElementParserPlugin {

  /**
   * Returns an array of auxiliary tags (additional keywords found in the middle of a code element).
   * By default a parser plugin has no auxiliary tags.
   */
  getAuxiliaryTags() : string[] {
    return [];
  }

  /**
   * Returns the text of the tag that triggers the beginning of code elements recognized by this parser.
   */
  abstract getTagText() : string;

  /**
   * Returns the text of the optional second tag that triggers the beginning of code elements recognized by this parser.
   * By default there is no second tag, so the result is null.
   */
  getTag2Text() : string {
    return null;
  }

  /**
   * Parses a code element after its leading annotations and initial tag have been recognized.
   * @param tokenStream the token stream to read from during the parse.
   * @param coreParser the core parser with reusable capabilities.
   * @param leadingAnnotations the already parsed leading annotations.
   * @param tagToken the token that tags the code element.
   */
  abstract parseCodeElement(
      tokenStream : ITokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      tagToken : BarlomToken
  ) : AstCodeElement;

}