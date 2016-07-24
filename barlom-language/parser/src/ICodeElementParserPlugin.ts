import { AstAnnotation } from '../../ast/src/AstAnnotation';
import { AstCodeElement } from '../../ast/src/AstCodeElement';
import { BarlomTokenStream } from './BarlomTokenStream';
import { ICoreParser } from './ICoreParser';
import { BarlomToken } from '../../lexer/src/BarlomToken';

/**
 * Interface to a plugin that will parse one kind of code element.
 */
export interface ICodeElementParserPlugin {

  /**
   * Returns the text of the tag that triggers the beginning of code elements recognized by this parser.
   */
  getTagText() : string;

  /**
   * Parses a code element after its leading annotations and initial tag have been recognized.
   * @param tokenStream the token stream to read from during the parse. TODO: possibly wrap this with ICoreParser.
   * @param coreParser the core parser with reusable capabilities.
   * @param leadingAnnotations the already parsed leading annotations.
   * @param tagToken the token that tags the code element.
   */
  parseCodeElement(
      tokenStream : BarlomTokenStream,
      coreParser : ICoreParser,
      leadingAnnotations : AstAnnotation[],
      tagToken : BarlomToken
  ) : AstCodeElement;

}