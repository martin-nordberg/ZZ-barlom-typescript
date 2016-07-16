/**
 * Enumeration of Barlom token types.
 */

export enum BarlomTokenType {

  /* End of File */
  EOF,

  //-------------------------------------------------------------------------------------------------
  // NOTE: The following token types are generated from the spreadsheet TokenTypes.xlsx.
  //       Sort that spreadsheet by token name then paste in the column for token types code.
  //-------------------------------------------------------------------------------------------------

  AFTER,    // Keyword `after`
  ALIAS,    // Keyword `alias`
  AND,    // Keyword `and`
  ANNOTATION,    // Keyword `annotation`
  ANONYMOUS_LITERAL,    // Literal `_`
  AROUND,    // Keyword `around`
  ARROW_COLON_COLON_LEFT,    // Arrow `<::`
  ARROW_COLON_COLON_LEFT_RIGHT,    // Arrow `<::>`
  ARROW_COLON_COLON_RIGHT,    // Arrow `::>`
  ARROW_COLON_LEFT,    // Arrow `<:`
  ARROW_COLON_LEFT_RIGHT,    // Arrow `<:>`
  ARROW_COLON_RIGHT,    // Arrow `:>`
  ARROW_DASH_DASH_DASH,    // Arrow `---`
  ARROW_DASH_DASH_DIAMOND_LEFT,    // Arrow `<>--`
  ARROW_DASH_DASH_DIAMOND_RIGHT,    // Arrow `--<>`
  ARROW_DASH_DASH_DOUBLE_LEFT,    // Arrow `<<--`
  ARROW_DASH_DASH_DOUBLE_RIGHT,    // Arrow `-->>`
  ARROW_DASH_DASH_LEFT,    // Arrow `<--`
  ARROW_DASH_DASH_LEFT_RIGHT,    // Arrow `<-->`
  ARROW_DASH_DASH_RIGHT,    // Arrow `-->`
  ARROW_DASH_LEFT,    // Arrow `<-`
  ARROW_DASH_LEFT_RIGHT,    // Arrow `<->`
  ARROW_DASH_RIGHT,    // Arrow `->`
  ARROW_EQUAL_EQUAL_DIAMOND_LEFT,    // Arrow `<>==`
  ARROW_EQUAL_EQUAL_DIAMOND_RIGHT,    // Arrow `==<>`
  ARROW_EQUAL_EQUAL_DOUBLE_LEFT,    // Arrow `<<==`
  ARROW_EQUAL_EQUAL_DOUBLE_RIGHT,    // Arrow `==>>`
  ARROW_EQUAL_EQUAL_LEFT,    // Arrow `<==`
  ARROW_EQUAL_EQUAL_LEFT_RIGHT,    // Arrow `<==>`
  ARROW_EQUAL_EQUAL_RIGHT,    // Arrow `==>`
  ARROW_EQUAL_RIGHT,    // Arrow `=>`
  ARROW_TILDE_LEFT,    // Arrow `<~`
  ARROW_TILDE_LEFT_RIGHT,    // Arrow `<~>`
  ARROW_TILDE_RIGHT,    // Arrow `~>`
  ARROW_TILDE_TILDE_DIAMOND_LEFT,    // Arrow `<>~~`
  ARROW_TILDE_TILDE_DIAMOND_RIGHT,    // Arrow `~~<>`
  ARROW_TILDE_TILDE_DOUBLE_LEFT,    // Arrow `<<~~`
  ARROW_TILDE_TILDE_DOUBLE_RIGHT,    // Arrow `~~>>`
  ARROW_TILDE_TILDE_LEFT,    // Arrow `<~~`
  ARROW_TILDE_TILDE_LEFT_RIGHT,    // Arrow `<~~>`
  ARROW_TILDE_TILDE_RIGHT,    // Arrow `~~>`
  ARROW_TILDE_TILDE_TILDE,    // Arrow `~~~`
  AS,    // Keyword `as`
  ASPECT,    // Keyword `aspect`
  ASSERT,    // Keyword `assert`
  AT,    // Operator `@`
  BEFORE,    // Keyword `before`
  BEGIN,    // Keyword `begin`
  BEHAVIOR,    // Keyword `behavior`
  BITWISE_AND,    // Operator `~and~`    Bitwise AND
  BITWISE_NAND,    // Operator `~nand~`    Bitwise NAND
  BITWISE_NOR,    // Operator `~nor~`    Bitwise NOR
  BITWISE_NOT,    // Operator `~not~`    Bitwise NOT (prefix)
  BITWISE_OR,    // Operator `~or~`    Bitwise OR
  BITWISE_SHIFT_LEFT,    // Operator `~shl~`    Bitwise SHIFT LEFT
  BITWISE_SHIFT_RIGHT,    // Operator `~shr~`    Bitwise SHIFT RIGHT (sign extend)
  BITWISE_XOR,    // Operator `~xor~`    Bitwise XOR
  BITWISE_ZERO_SHIFT_RIGHT,    // Operator `~zshr~`    Bitwise SHIFT RIGHT (zero extend)
  CALL,    // Keyword `call`
  CASE,    // Keyword `case`
  CHECK,    // Keyword `check`
  CLASS,    // Keyword `class`
  CLEANUP,    // Keyword `cleanup`
  CodeLiteral,    // Literal ``...``
  COLON,    // Punctuation `:`
  COLON_COLON,    // Punctuation `::`
  COMMA,    // Punctuation `,`
  COMPARE,    // Operator `<=>`
  CONCAT_EQUALS,    // Operator `&=`
  CONCATENATE,    // Operator `&`
  CONSTANT,    // Keyword `constant`
  DATA,    // Keyword `data`
  DateTimeLiteral,    // Literal `$2016-12-31T12:01:14.001-05:00$`
  DEFAULT,    // Keyword `default`
  DEFER,    // Keyword `defer`
  DEFINE,    // Keyword `define`
  DELETE,    // Keyword `delete`
  DETECT,    // Keyword `detect`
  DIV,    // Keyword `div`
  DIVIDE_EQUALS,    // Operator `/=`
  DIVIDED_BY,    // Operator `/`
  DO,    // Keyword `do`
  Documentation,    // Documentation `/*...*/`    Annotation documentation for an element
  DOT,    // Punctuation `.`
  DOT_DOT_DOT,    // Punctuation `...`
  DOT_QUESTION,    // Punctuation `.?`
  EDGE,    // Keyword `edge`
  ELSE,    // Keyword `else`
  END,    // Keyword `end`
  ENUMERATION,    // Keyword `enumeration`
  EQUALS,    // Operator `=`
  ERROR,    // Keyword `error`
  ErrorInvalidIdentifier,    // Error ``
  ErrorInvalidMultilineTextLiteral,    // Error ``
  ErrorInvalidTextLiteral,    // Error ``
  ErrorInvalidTimeLiteral,    // Error ``
  ErrorUnclosedBlockComment,    // Error ``
  ErrorUnclosedCodeLiteral,    // Error ``
  ErrorUnclosedLocationLiteral,    // Error ``
  ErrorUnclosedRegularExpression,    // Error ``
  ErrorUnclosedTemplate,    // Error ``
  ErrorUnclosedTextLiteral,    // Error ``
  ErrorUnclosedTextLiteralMultiline,    // Error ``
  ErrorUnexpectedCharacter,    // Error ``
  EXPECT,    // Keyword `expect`
  FALSE,    // Keyword `false`
  FOR,    // Keyword `for`
  FUNCTION,    // Keyword `function`
  GIVEN,    // Keyword `given`
  GRAPH,    // Keyword `graph`
  GRAPH_END,    // Punctuation `%%]`    End of a graph literal
  GRAPH_START,    // Punctuation `[%%`    Start of a graph literal
  GREATER_THAN,    // Operator `>`
  GREATER_THAN_OR_EQUAL,    // Operator `>=`
  Identifier,    // Identifier `z_z1`
  IF,    // Keyword `if`
  IMPORT,    // Keyword `import`
  IN,    // Keyword `in`
  INSERT,    // Keyword `insert`
  INSTANCE,    // Keyword `instance`
  IntegerLiteral_Binary,    // Literal `0b101010`
  IntegerLiteral_Decimal,    // Literal `0`
  IntegerLiteral_Hex,    // Literal `0x12AB`
  INTERFACE,    // Keyword `interface`
  INTERSECTION,    // Keyword `intersection`
  IS,    // Keyword `is`
  ISNOT,    // Keyword `isnot`
  LEFT_BRACE,    // Punctuation `{`
  LEFT_BRACKET,    // Punctuation `[`
  LEFT_PARENTHESIS,    // Punctuation `(`
  LESS_THAN,    // Operator `<`
  LESS_THAN_OR_EQUAL,    // Operator `<=`
  LET,    // Keyword `let`
  LocationLiteral,    // Literal `@| ... |`
  MATCH,    // Keyword `match`
  MINUS,    // Operator `-`    Subtraction (infix); Negation (prefix)
  MINUS_EQUALS,    // Operator `-=`
  MOD,    // Keyword `mod`
  MODULE,    // Keyword `module`
  NAMESPACE,    // Keyword `namespace`
  NOT,    // Keyword `not`
  NOT_EQUAL_TO,    // Operator `<>`
  NOTIN,    // Keyword `notin`
  NumberLiteral,    // Literal `123.45`
  OBJECT,    // Keyword `object`
  OR,    // Keyword `or`
  PACKAGE,    // Keyword `package`
  PERCENT,    // Operator `%`
  PLUS,    // Operator `+`
  PLUS_EQUALS,    // Operator `+=`
  POWER,    // Operator `^`
  POWER_EQUALS,    // Operator `^=`
  PROTOCOL,    // Keyword `protocol`
  QUESTION,    // Punctuation `?`
  QUESTION_QUESTION,    // Operator `??`    Null coalescence
  RAISE,    // Keyword `raise`
  RANGE_EXCLUSIVE,    // Operator `..<`    Range from lower inclusive to upper exclusive
  RANGE_INCLUSIVE,    // Operator `..`    Range from lower to upper inclusive
  REGARDLESS,    // Keyword `regardless`
  RegularExpressionLiteral,    // Literal `~/ ... /igm`
  REPEAT,    // Keyword `repeat`
  RETURN,    // Keyword `return`
  RIGHT_BRACE,    // Punctuation `}`
  RIGHT_BRACKET,    // Punctuation `]`
  RIGHT_PARENTHESIS,    // Punctuation `)`
  RULE,    // Keyword `rule`
  SAMPLING,    // Keyword `sampling`
  SCENARIO,    // Keyword `scenario`
  SELECT,    // Keyword `select`
  SELF,    // Keyword `self`
  SEMICOLON,    // Punctuation `;`
  SETUP,    // Keyword `setup`
  SPECIFICATION,    // Keyword `specification`
  STRUCTURE,    // Keyword `structure`
  SYMBOL,    // Keyword `symbol`
  TemplateLiteral,    // Literal `{{{...}}}`
  TEST,    // Keyword `test`
  TextLiteral_DoubleQuoted,    // Literal `"..."`
  TextLiteral_DoubleQuotedMultiline,    // Literal `"""..."""`
  TextLiteral_SingleQuoted,    // Literal `'...'`
  TextLiteral_SingleQuotedMultiline,    // Literal `'''...'''`
  THEN,    // Keyword `then`
  TILDE,    // Operator `~`
  TILDE_EQUALS,    // Operator `~=`
  TIMES,    // Operator `*`
  TIMES_EQUALS,    // Operator `*=`
  TO_STRING,    // Operator `$`    Conversion to string (prefix)
  TRANSFORM,    // Keyword `transform`
  TRANSLATE,    // Keyword `translate`
  TRUE,    // Keyword `true`
  TYPE,    // Keyword `type`
  UNDEFINED,    // Keyword `undefined`
  UNION,    // Keyword `union`
  UNLESS,    // Keyword `unless`
  UNTIL,    // Keyword `until`
  UPDATE,    // Keyword `update`
  USE,    // Keyword `use`
  UserDefinedKeyWord,    // Keyword `#abc`
  UserDefinedLiteral_Braces,    // Literal `#{...}`    User-defined literal B
  UserDefinedLiteral_Brackets,    // Literal `#[...]`    User-defined literal A
  UserDefinedLiteral_Slashes,    // Literal `#/.../`    User-defined literal C
  VALUE,    // Keyword `value`
  VARIABLE,    // Keyword `variable`
  VARIANT,    // Keyword `variant`
  VERSION,    // Keyword `version`
  VersionLiteral,    // Literal `2.3.4`
  VERTEX,    // Keyword `vertex`
  WHEN,    // Keyword `when`
  WHERE,    // Keyword `where`
  WHILE,    // Keyword `while`
  WITH,    // Keyword `with`
  XOR,    // Keyword `xor`
  YIELD,    // Keyword `yield`

}
