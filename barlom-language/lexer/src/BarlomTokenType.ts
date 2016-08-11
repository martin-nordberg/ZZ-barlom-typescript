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

  AND,    // Keyword `and`
  ANONYMOUS_LITERAL,    // Literal `_`
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
  AT,    // Operator `@`
  BITWISE_AND,    // Operator `~and~`    Bitwise AND
  BITWISE_NAND,    // Operator `~nand~`    Bitwise NAND
  BITWISE_NOR,    // Operator `~nor~`    Bitwise NOR
  BITWISE_NOT,    // Operator `~not~`    Bitwise NOT (prefix)
  BITWISE_OR,    // Operator `~or~`    Bitwise OR
  BITWISE_SHIFT_LEFT,    // Operator `~shl~`    Bitwise SHIFT LEFT
  BITWISE_SHIFT_RIGHT,    // Operator `~shr~`    Bitwise SHIFT RIGHT (sign extend)
  BITWISE_XOR,    // Operator `~xor~`    Bitwise XOR
  BITWISE_ZERO_SHIFT_RIGHT,    // Operator `~zshr~`    Bitwise SHIFT RIGHT (zero extend)
  CodeLiteral,    // Literal ``...``
  COLON,    // Punctuation `:`
  COLON_COLON,    // Punctuation `::`
  COMMA,    // Punctuation `,`
  COMPARE,    // Operator `<=>`
  CONCAT_EQUALS,    // Operator `&=`
  CONCATENATE,    // Operator `&`
  DateTimeLiteral,    // Literal `$2016-12-31T12:01:14.001-05:00$`
  DIV,    // Keyword `div`
  DIVIDE_EQUALS,    // Operator `/=`
  DIVIDED_BY,    // Operator `/`
  Documentation,    // Documentation `/*...*/`    Annotation documentation for an element
  DOT,    // Punctuation `.`
  DOT_DOT_DOT,    // Punctuation `...`
  DOT_QUESTION,    // Punctuation `.?`
  END,    // Keyword `end`
  EQUALS,    // Operator `=`
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
  FALSE,    // Keyword `false`
  GRAPH_END,    // Punctuation `%%]`    End of a graph literal
  GRAPH_START,    // Punctuation `[%%`    Start of a graph literal
  GREATER_THAN,    // Operator `>`
  GREATER_THAN_OR_EQUAL,    // Operator `>=`
  Identifier,    // Identifier `z_z1`
  IN,    // Keyword `in`
  IntegerLiteral_Binary,    // Literal `0b101010`
  IntegerLiteral_Decimal,    // Literal `0`
  IntegerLiteral_Hex,    // Literal `0x12AB`
  IS,    // Keyword `is`
  ISNOT,    // Keyword `isnot`
  LEFT_BRACE,    // Punctuation `{`
  LEFT_BRACKET,    // Punctuation `[`
  LEFT_PARENTHESIS,    // Punctuation `(`
  LESS_THAN,    // Operator `<`
  LESS_THAN_OR_EQUAL,    // Operator `<=`
  LocationLiteral,    // Literal `@| ... |`
  MINUS,    // Operator `-`    Subtraction (infix); Negation (prefix)
  MINUS_EQUALS,    // Operator `-=`
  MOD,    // Keyword `mod`
  NOT,    // Keyword `not`
  NOT_EQUAL_TO,    // Operator `<>`
  NOTIN,    // Keyword `notin`
  NumberLiteral,    // Literal `123.45`
  OR,    // Keyword `or`
  PERCENT,    // Operator `%`
  PLUS,    // Operator `+`
  PLUS_EQUALS,    // Operator `+=`
  POWER,    // Operator `^`
  POWER_EQUALS,    // Operator `^=`
  QUESTION,    // Punctuation `?`
  QUESTION_QUESTION,    // Operator `??`    Null coalescence
  RANGE_EXCLUSIVE,    // Operator `..<`    Range from lower inclusive to upper exclusive
  RANGE_INCLUSIVE,    // Operator `..`    Range from lower to upper inclusive
  RegularExpressionLiteral,    // Literal `~/ ... /igm`
  RIGHT_BRACE,    // Punctuation `}`
  RIGHT_BRACKET,    // Punctuation `]`
  RIGHT_PARENTHESIS,    // Punctuation `)`
  SELF,    // Keyword `self`
  SEMICOLON,    // Punctuation `;`
  Tag,    // Tag `#abc_def`
  TemplateLiteral,    // Literal `{{{...}}}`
  TextLiteral_DoubleQuoted,    // Literal `"..."`
  TextLiteral_DoubleQuotedMultiline,    // Literal `"""..."""`
  TextLiteral_SingleQuoted,    // Literal `'...'`
  TextLiteral_SingleQuotedMultiline,    // Literal `'''...'''`
  TILDE,    // Operator `~`
  TILDE_EQUALS,    // Operator `~=`
  TIMES,    // Operator `*`
  TIMES_EQUALS,    // Operator `*=`
  TO_STRING,    // Operator `$`    Conversion to string (prefix)
  TRUE,    // Keyword `true`
  UNDEFINED,    // Keyword `undefined`
  USE,    // Keyword `use`
  UserDefinedLiteral_Braces,    // Literal `#{...}`    User-defined literal B
  UserDefinedLiteral_Brackets,    // Literal `#[...]`    User-defined literal A
  UserDefinedLiteral_Slashes,    // Literal `#/.../`    User-defined literal C
  VersionLiteral,    // Literal `2.3.4`
  XOR    // Keyword `xor`

}
