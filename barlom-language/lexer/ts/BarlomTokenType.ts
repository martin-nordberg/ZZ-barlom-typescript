/**
 * Enumeration of Barlom token types.
 */

export enum BarlomTokenType {

  //-------------------------------------------------------------------------------------------------
  // END OF FILE
  //-------------------------------------------------------------------------------------------------

  EOF,
      
  //-------------------------------------------------------------------------------------------------
  // KEYWORDS
  //-------------------------------------------------------------------------------------------------

  AND,
  ANNOTATION,
  AS,
  ASSERT,
  BEGIN,
  BEHAVIOR,
  CALL,
  CHECK,
  CLEANUP,
  CONSTANT,
  DETECT,
  EDGE,
  ELSE,
  END,
  ENUMERATION,
  ERROR,
  EXPECT,
  FALSE,
  GIVEN,
  GRAPH,
  IF,
  FOR,
  FUNCTION,
  IN,
  INSTANCE,
  INTERFACE,
  IS,
  ISNOT,
  LET,
  MATCH,
  MODULE,
  NOT,
  OBJECT,
  OR,
  PACKAGE,
  RAISE,
  REGARDLESS,
  REPEAT,
  RETURN,
  SAMPLING,
  SCENARIO,
  SELF,
  SETUP,
  SPECIFICATION,
  STRUCTURE,
  SYMBOL,
  TEST,
  THEN,
  TRUE,
  TYPE,
  UNDEFINED,
  UNLESS,
  UNTIL,
  USE,
  VALUE,
  VARIABLE,
  VARIANT,
  VERTEX,
  WHEN,
  WHERE,
  WHILE,
  WITH,
  XOR,


/** TODO: reserve these and more ...
 after
 alias
 around
 aspect
 before
 case
 class
 data
 default
 defer
 define
 delete
 do
 import
 insert
 intersection
 namespace
 protocol
 rule
 select
 transform
 translate
 union
 update
 version
 where
 with
 yield
 **/

//-------------------------------------------------------------------------------------------------
// PUNCTUATION
//-------------------------------------------------------------------------------------------------

  ARROW,              // '->'
  COLON,              // ':'
  COLON_COLON,        // '::'
  COMMA,              // ','
  DOT,                // '.'
  DOT_DOT_DOT,        // '...'
  EQUAL_ARROW,        // '=>'
  LEFT_BRACE,         // '{'
  LEFT_BRACKET,       // '['
  LEFT_PARENTHESIS,   // '('
  QUESTION,           // '?'
  RIGHT_BRACE,        // '}'
  RIGHT_BRACKET,      // ']'
  RIGHT_PARENTHESIS,  // ')'
  SEMICOLON,          // ';'
  TILDE_ARROW,        // '~>';


//-------------------------------------------------------------------------------------------------
// COMPARISON OPERATORS
//-------------------------------------------------------------------------------------------------

  COMPARE,                // '<=>'
  GREATER_THAN_OR_EQUAL,  // '>='
  GREATER_THAN,           // '>'
  LESS_THAN_OR_EQUAL,     // '<='
  LESS_THAN,              // '<'
  NOT_EQUAL_TO,           // '=/=';   // ( a =/= b )


//-------------------------------------------------------------------------------------------------
// ARITHMETIC OPERATORS
//-------------------------------------------------------------------------------------------------

  DIVIDED_BY,   // '/'
  MINUS,        // '-'
  MODULO,       // '%'
  PLUS,         // '+'
  POWER,        // '^'
  TIMES,        // '*'


//-------------------------------------------------------------------------------------------------
// STRING OPERATORS
//-------------------------------------------------------------------------------------------------

  CONCAT,       // '&'


//-------------------------------------------------------------------------------------------------
// ASSIGNMENT OPERATORS
//-------------------------------------------------------------------------------------------------

  EQUALS,         // '='
  DIVIDE_EQUALS,  // '/='
  MINUS_EQUALS,   // '-='
  MODULO_EQUALS,  // '%='
  PLUS_EQUALS,    // '+='
  POWER_EQUALS,   // '^='
  TIMES_EQUALS,   // '*='

  CONCAT_EQUALS,  // '&='


//-------------------------------------------------------------------------------------------------
// RANGE OPERATORS
//-------------------------------------------------------------------------------------------------

  RANGE_INCLUSIVE,  // '..'
  RANGE_EXCLUSIVE,  // '..<'


//-------------------------------------------------------------------------------------------------
// GRAPH PUNCTUATION
//-------------------------------------------------------------------------------------------------

  GRAPH_START,        // '[%%'
  GRAPH_END,          // '%%]'

  EDGE_PLAIN,         // '---'
  EDGE_LPAREN,        // '--('
  EDGE_RPAREN,        // ')--'

  EDGE_LEFT,          // '<--'
  EDGE_LEFT_LPAREN,   // '<-(';

  EDGE_RIGHT,         // '-->'
  EDGE_RIGHT_RPAREN,  // ')->'


//-------------------------------------------------------------------------------------------------
// TEXT LITERALS
//-------------------------------------------------------------------------------------------------

  TextLiteral,              // ' ... ' or " ... "
  TextMultilineLiteral,     // ''' ... ''' or """ ... """


//-------------------------------------------------------------------------------------------------
// CODE LITERALS
//-------------------------------------------------------------------------------------------------

  CodeLiteral,       // ` ... `


//-------------------------------------------------------------------------------------------------
// TEMPLATE LITERALS
//-------------------------------------------------------------------------------------------------

  TemplateLiteral,    // "{" ... "}" or '{' ... '}' or "{' ... '}" or '{" ... "}'


//-------------------------------------------------------------------------------------------------
// INTEGER LITERALS
//-------------------------------------------------------------------------------------------------

  BinaryIntegerLiteral,     // 0b1111_0000
  IntegerLiteral,           // 123_456
  HexIntegerLiteral,        // 0x12AB


//-------------------------------------------------------------------------------------------------
// NUMBER LITERALS
//-------------------------------------------------------------------------------------------------

  NumberLiteral,      // 123.0  123_456E-78


//-------------------------------------------------------------------------------------------------
// VERSION LITERALS
//-------------------------------------------------------------------------------------------------

  VersionLiteral,     // 1.2.3


//-------------------------------------------------------------------------------------------------
// DATE-TIME LITERALS
//-------------------------------------------------------------------------------------------------

  DateTimeLiteral,        // $YYYY-MM-DDThh:mm$
                          // $YYYY-MM-DDThh:mm:ss.ddd+hh:mm$
                          // $YYYY-MM-DDThh:mm:ss.ddd-hh:mm$
                          // $YYYY-MM-DDThh:mm:ss.dddZ$


//-------------------------------------------------------------------------------------------------
// REGULAR EXPRESSION LITERALS
//-------------------------------------------------------------------------------------------------

  RegularExpressionLiteral,    // ~/ ... /igm


//-------------------------------------------------------------------------------------------------
// LOCATION LITERALS
//-------------------------------------------------------------------------------------------------

  LocationLiteral,     // @| ... |


//-------------------------------------------------------------------------------------------------
// ANONYMOUS LITERAL
//-------------------------------------------------------------------------------------------------

  AnonymousLiteral,    // '_'


//-------------------------------------------------------------------------------------------------
// IDENTIFIERS
//-------------------------------------------------------------------------------------------------

  Identifier,          // _?_?[a-zA-Z][a-zA-Z0-9_]*'?


//-------------------------------------------------------------------------------------------------
// USER-DEFINED KEYWORDS
//-------------------------------------------------------------------------------------------------

  UserDefinedKeyWord,  // #[a-z]+


//-------------------------------------------------------------------------------------------------
// COMMENTS
//-------------------------------------------------------------------------------------------------

  BLOCK_COMMENT,       // /* ... */

  LINE_COMMENT,        // // ...


//-------------------------------------------------------------------------------------------------
// WHITE SPACE
//-------------------------------------------------------------------------------------------------

  WHITE_SPACE,         // ' ' or '\r' or '\n'


//-------------------------------------------------------------------------------------------------
// UNEXPECTED CHARACTERS
//-------------------------------------------------------------------------------------------------

  ERROR_INVALID_IDENTIFIER,    
  ERROR_INVALID_TIME_LITERAL,    
  ERROR_UNCLOSED_BLOCK_COMMENT,
  ERROR_UNCLOSED_CODE,
  ERROR_UNCLOSED_TEMPLATE,
  ERROR_UNCLOSED_TEXT,
  ERROR_UNEXPECTED_CHARACTER


//-------------------------------------------------------------------------------------------------


}
