import { AssertStatementParserPlugin } from '../../elements/src/statements/assertstatement/AssertStatementParserPlugin';
import { AssignmentStatementParserPlugin } from '../../elements/src/statements/assignmentstatement/AssignmentStatementParserPlugin';
import { AstAnnotation } from '../../ast/src/annotations/AstAnnotation';
import { AstCodeElement } from '../../ast/src/core/AstCodeElement';
import { AstCompilationUnit } from '../../ast/src/compilationunit/AstCompilationUnit';
import { AstCodeElementName } from '../../ast/src/core/AstCodeElementName';
import { AstExpression } from '../../ast/src/expressions/AstExpression';
import { AstParameter } from '../../ast/src/parameters/AstParameter';
import { AstParametricAnnotation } from '../../ast/src/annotations/AstParametricAnnotation';
import { AstNamedAnnotation } from '../../ast/src/annotations/AstNamedAnnotation';
import { AstSummaryDocAnnotation } from '../../ast/src/annotations/AstSummaryDocAnnotation';
import { AstUseDeclaration } from '../../ast/src/compilationunit/AstUseDeclaration';
import { BarlomExpressionParser } from './BarlomExpressionParser';
import { BarlomTokenStream } from './BarlomTokenStream';
import { BarlomTokenType } from '../../lexer/src/BarlomTokenType';
import { BehaviorParserPlugin } from '../../elements/src/functions/function/BehaviorParserPlugin';
import { CallStatementParserPlugin } from '../../elements/src/statements/callstatement/CallStatementParserPlugin';
import { CheckStatementParserPlugin } from '../../elements/src/statements/checkstatement/CheckStatementParserPlugin';
import { EnumerationTypeParserPlugin } from '../../elements/src/types/enumerationtype/EnumerationTypeParserPlugin';
import { FunctionParserPlugin } from '../../elements/src/functions/function/FunctionParserPlugin';
import { ICodeElementParserPlugin } from '../../parserspi/src/ICodeElementParserPlugin';
import { ICoreParser } from '../../parserspi/src/ICoreParser';
import { ModuleParserPlugin } from '../../elements/src/modules/module/ModuleParserPlugin';
import { RaiseErrorStatementParserPlugin } from '../../elements/src/statements/raiseerrorstatement/RaiseErrorStatementParserPlugin';
import { RepeatForStatementParserPlugin } from '../../elements/src/statements/repeatforstatement/RepeatForStatementParserPlugin';
import { RepeatUntilStatementParserPlugin } from '../../elements/src/statements/repeatuntilstatement/RepeatUntilStatementParserPlugin';
import { RepeatWhileStatementParserPlugin } from '../../elements/src/statements/repeatwhilestatement/RepeatWhileStatementParserPlugin';
import { ReturnStatementParserPlugin } from '../../elements/src/statements/returnstatement/ReturnStatementParserPlugin';
import { SymbolParserPlugin } from '../../elements/src/types/enumerationtype/SymbolParserPlugin';
import { UnlessStatementParserPlugin } from '../../elements/src/statements/unlessstatement/UnlessStatementParserPlugin';
import { VariantParserPlugin } from '../../elements/src/types/varianttype/VariantParserPlugin';
import { VariantTypeParserPlugin } from '../../elements/src/types/varianttype/VariantTypeParserPlugin';
import { ValueParserPlugin } from '../../elements/src/data/value/ValueParserPlugin';



/**
 * Parser for the Barlom language.
 */
export class BarlomParser
  implements ICoreParser {

  /**
   * Constructs a new parser for the given code that came from the given file.
   * @param code the source code to parse.
   * @param fileName the name of the source file.
   */
  constructor(
      code : string,
      fileName : string
  ) {
    this._tokenStream = new BarlomTokenStream( code, fileName );

    this._codeElementParsers = {};
    this._isParsingCodeElements = false;

    this._registerCodeElementParser( new AssertStatementParserPlugin() );
    this._registerCodeElementParser( new AssignmentStatementParserPlugin() );
    this._registerCodeElementParser( new BehaviorParserPlugin() );
    this._registerCodeElementParser( new CallStatementParserPlugin() );
    this._registerCodeElementParser( new CheckStatementParserPlugin() );
    this._registerCodeElementParser( new EnumerationTypeParserPlugin() );
    this._registerCodeElementParser( new FunctionParserPlugin() );
    this._registerCodeElementParser( new ModuleParserPlugin() );
    this._registerCodeElementParser( new RaiseErrorStatementParserPlugin() );
    this._registerCodeElementParser( new RepeatForStatementParserPlugin() );
    this._registerCodeElementParser( new RepeatUntilStatementParserPlugin() );
    this._registerCodeElementParser( new RepeatWhileStatementParserPlugin() );
    this._registerCodeElementParser( new ReturnStatementParserPlugin() );
    this._registerCodeElementParser( new SymbolParserPlugin() );
    this._registerCodeElementParser( new UnlessStatementParserPlugin() );
    this._registerCodeElementParser( new ValueParserPlugin() );
    this._registerCodeElementParser( new VariantParserPlugin() );
    this._registerCodeElementParser( new VariantTypeParserPlugin() );
  }

  /**
   * Parses one code element. After parsing the leading annotations, chooses the right plugin according to the
   * code element's tag token.
   * @returns {AstCodeElement} the parsed code element.
   */
  public parseCodeElement() : AstCodeElement {

    let leadingAnnotations = this.parseLeadingAnnotations();

    let tagToken = this._tokenStream.consumeExpectedToken( BarlomTokenType.Tag );

    let codeElementParser : ICodeElementParserPlugin = this._codeElementParsers[tagToken.text];

    return codeElementParser.parseCodeElement( this._tokenStream, this, leadingAnnotations, tagToken );

  }

  /**
   * Parses the namespace, name, and arguments of a code element path, or just the identifier for its name.
   */
  public parseCodeElementName() : AstCodeElementName {

    let result = new AstCodeElementName( this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier ) );

    while ( !this._isParsingCodeElements && this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.DOT ) ) {

      result.extendPath( this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier ) );

      // TODO: arguments in the path

    }

    return result;

  }

  /**
   * Parses a sequence of code elements terminated by 'end' (inclusive).
   * @returns {AstCodeElement[]} the code elements parsed.
   */
  public parseCodeElements() : AstCodeElement[] {

    let result : AstCodeElement[] = [];

    let wasParsingCodeElements = this._isParsingCodeElements;

    try {

      // TODO: this is a rather clunky way of making nested code element names not be qualified
      this._isParsingCodeElements = true;

      while ( !this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.END ) ) {
        result.push( this.parseCodeElement() );
      }

    }
    finally {
      this._isParsingCodeElements = wasParsingCodeElements;
    }

    return result;
  }

  /**
   * Parses an entire Barlom source file.
   * @returns the abstract syntax tree for the parse.
   */
  public parseCompilationUnit() : AstCompilationUnit {

    let firstToken = this._tokenStream.lookAhead1Token();

    // use declarations
    let useDeclarations = this._parseUseDeclarations();

    // code element
    let codeElement = this.parseCodeElement();

    // end of file
    this._tokenStream.consumeExpectedToken( BarlomTokenType.EOF );

    return new AstCompilationUnit( firstToken, useDeclarations, codeElement );

  }

  /**
   * Parses a general expression.
   * @returns {AstExpression} the parsed expression.
   */
  parseExpression() : AstExpression {
    return new BarlomExpressionParser( this._tokenStream, this ).parseExpression();
  }

  /**
   * Parses annotations coming before the keyword of a code element.
   * @returns {Array<AstAnnotation>} the parsed annotations.
   * @private
   */
  public parseLeadingAnnotations() : AstAnnotation[] {

    let result : AstAnnotation[] = [];

    while ( true ) {

      let token = this._tokenStream.lookAhead1Token();

      switch ( token.tokenType ) {

        case BarlomTokenType.Documentation:

          // TODO: decide how to distinguish one-line summary from multi-line details
          result.push( new AstSummaryDocAnnotation( this._tokenStream.consumeBufferedToken() ) );
          break;

        case BarlomTokenType.Identifier:

          result.push( new AstNamedAnnotation( this._tokenStream.consumeBufferedToken() ) );

          // TODO: optional arguments

          break;

        default:

          return result;

      }

    }

  }

  /**
   * Parses an expression that can be assigned to.
   * @returns {AstExpression} the parsed expression.
   */
  parseLValueExpression() : AstExpression {
    return new BarlomExpressionParser( this._tokenStream, this ).parseLValueExpression();
  }

  /**
   * Parses a sequence of parameters within parentheses.
   * @returns {AstParameter[]} the parameters parsed.
   */
  public parseParameters() : AstParameter[] {

    let result : AstParameter[] = [];

    this._tokenStream.consumeExpectedToken( BarlomTokenType.LEFT_PARENTHESIS );

    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.RIGHT_PARENTHESIS ) ) {
      return result;
    }

    let wasParsingCodeElements = this._isParsingCodeElements;

    try {

      // TODO: this is a rather clunky way of making nested code element names not be qualified
      this._isParsingCodeElements = true;

      while ( true ) {

        let name = this.parseCodeElementName();
        let trailingAnnotations = this.parseTrailingAnnotations();
        // TODO: default value
        result.push( new AstParameter( name, trailingAnnotations ) );

        if ( !this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COMMA ) ) {
          break;
        }

      }

    }
    finally {
      this._isParsingCodeElements = wasParsingCodeElements;
    }

    this._tokenStream.consumeExpectedToken( BarlomTokenType.RIGHT_PARENTHESIS );

    return result;

  }

  /**
   * Parses annotations coming after the keyword of a code element.
   * @returns {Array<AstAnnotation>} the annotations parsed.
   * @private
   */
  public parseTrailingAnnotations() : AstAnnotation[] {

    let result : AstAnnotation[] = [];

    while ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.COLON ) ) {

      let token = this._tokenStream.consumeToken();

      switch ( token.tokenType ) {

        case BarlomTokenType.Documentation:
          // TODO: decide how to distinguish one-line summary from multi-line details
          result.push( new AstSummaryDocAnnotation( token ) );
          break;

        case BarlomTokenType.Identifier:
          if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.LEFT_PARENTHESIS ) ) {
            let argExpressions = new BarlomExpressionParser( this._tokenStream, this ).parseArguments();
            result.push( new AstParametricAnnotation( token, argExpressions ) );
          }
          else {
            result.push( new AstNamedAnnotation( token ) );
          }

          break;

        default:
          // TODO: error for unexpected token
          break;

      }

    }

    return result;

  }

  /**
   * Parses a use declaration after the "use" keyword has been seen but not yet consumed.
   */
  private _parseUseDeclaration() : AstUseDeclaration {

    let useToken = this._tokenStream.consumeBufferedToken();
    let codeElementName = this.parseCodeElementName();
    let synonym = null;

    if ( this._tokenStream.advanceOverLookAhead1Token( BarlomTokenType.AS ) ) {
      synonym = this._tokenStream.consumeExpectedToken( BarlomTokenType.Identifier );
    }

    return new AstUseDeclaration( useToken, codeElementName, synonym );

  }

  /**
   * Parses zero or more use declarations.
   */
  private _parseUseDeclarations() : AstUseDeclaration[] {

    let result : AstUseDeclaration[] = [];

    while ( this._tokenStream.hasLookAhead1Token( BarlomTokenType.USE ) ) {
      result.push( this._parseUseDeclaration() );
    }

    return result;

  }

  /**
   * Adds the given plugin to this parser. Registers the plugin's tag(s) for token conversion and plugin activation.
   * @param parserPlugin the plugin to register.
   * @private
   */
  private _registerCodeElementParser( parserPlugin : ICodeElementParserPlugin ) {

    var tagText = parserPlugin.getTagText();

    this._tokenStream.registerTag( tagText );

    this._codeElementParsers[tagText] = parserPlugin;

    let auxTags = parserPlugin.getAuxiliaryTags();
    for ( var i=0 ; i<auxTags.length ; i+=1 ) {
      this._tokenStream.registerTag( auxTags[i] );
    }

  }

  private _codeElementParsers : Object;

  private _isParsingCodeElements : boolean;

  private _tokenStream : BarlomTokenStream;

}
