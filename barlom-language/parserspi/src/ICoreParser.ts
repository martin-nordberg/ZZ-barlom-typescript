import { AstAnnotation } from '../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../ast/src/core/AstCodeElement';
import { AstCodeElementName } from '../../ast/src/core/AstCodeElementName';
import { AstExpression } from '../../ast/src/expressions/AstExpression';
import { AstParameter } from '../../ast/src/parameters/AstParameter';

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
   * Parses a general expression.
   */
  parseExpression() : AstExpression;

  /**
   * Parses annotations coming before the keyword of a code element.
   * @returns {Array<AstAnnotation>}
   * @private
   */
  parseLeadingAnnotations() : AstAnnotation[];

  /**
   * Parses a series of parameters within parentheses.
   */
  parseParameters() : AstParameter[];

  /**
   * Parses annotations coming after the keyword of a code element.
   * @returns {Array<AstAnnotation>}
   * @private
   */
  parseTrailingAnnotations() : AstAnnotation[];

}
