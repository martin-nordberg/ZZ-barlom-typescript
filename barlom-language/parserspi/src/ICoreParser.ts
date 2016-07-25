import { AstAnnotation } from '../../ast/src/AstAnnotation';
import { AstCodeElement } from '../../ast/src/AstCodeElement';
import { AstCodeElementName } from '../../ast/src/AstCodeElementName';

/**
 * Central parsing capability for the Barlom language.
 */
export interface ICoreParser {

  /**
   * Parses one code element, starting with its leading annotations.
   */
  parseCodeElement() : AstCodeElement;

  /**
   * Parses a dot-delimited path, i.e. a qualified name.
   * @returns AstCodeElementName
   * @private
   */
  parseCodeElementName() : AstCodeElementName;

  /**
   * Parses a series of code elements end with either 'end' or EOF.
   */
  parseCodeElements() : AstCodeElement[];

  /**
   * Parses annotations coming before the keyword of a code element.
   * @returns {Array<AstAnnotation>}
   * @private
   */
  parseLeadingAnnotations() : AstAnnotation[];

  /**
   * Parses annotations coming after the keyword of a code element.
   * @returns {Array<AstAnnotation>}
   * @private
   */
  parseTrailingAnnotations() : AstAnnotation[];

}
