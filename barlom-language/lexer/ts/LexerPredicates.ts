
/**
 * Determines whether the given character is a numeric digit.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character is a digit.
 */
export function isBinaryDigitOrUnderscore( ch : string ) {
  return '0' === ch || ch === '1' || ch === '_';
}

/**
 * Determines whether the given character is a numeric digit.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character is a digit.
 */
export function isDigit( ch : string ) {
  return '0' <= ch && ch <= '9';
}

/**
 * Determines whether the given character is a numeric digit or else an underscore spacer.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character is a digit or an underscore.
 */
export function isDigitOrUnderscore( ch : string ) {
  return isDigit( ch ) || ch === '_';
}

/**
 * Determines whether the given character is a hexadecimal digit.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character is a hex digit.
 */
export function isHexDigit( ch : string ) {
  return ( '0' <= ch && ch <= '9' ) ||
      ( 'a' <= ch && ch <= 'f' ) ||
      ( 'A' <= ch && ch <= 'F' );
}

/**
 * Determines whether the given character is a hexadecimal digit or else an underscore spacer.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character is a hex digit or an underscore.
 */
export function isHexDigitOrUnderscore( ch : string ) {
  return isHexDigit( ch ) || ch === '_';
}

/**
 * Determines whether the given character is alphabetical and can start an identifier.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character can start an identifier.
 */
export function isIdentifierChar( ch : string ) {
  return ( 'a' <= ch && ch <= 'z' ) ||
      ( 'A' <= ch && ch <= 'Z' );
  // TODO: Unicode ?
}

/**
 * Determines whether the given character can be part of an identifier.
 * @param ch the character to check (assumed single character).
 * @returns {boolean} true if the character can be part of an identifier.
 */
export function isIdentifierBodyChar( ch : string ) {
  return isIdentifierChar( ch ) || isDigitOrUnderscore( ch );
}

/**
 * Determines whether a character is white space.
 * NOTE: Tab characters are NOT recognized. Tools are expected to automatically adjust indenting
 * when needed to suit the taste of an individual developer, but in the absence of a tool, there
 * is no possibility of tab munging. Also form feeds are a relic of the past not recognized either.
 * @param ch the character to check.
 * @returns {boolean} true if it's a whitespace character.
 */
export function isWhiteSpace( ch : string ) {
  return ch === ' ' || ch === '\n' || ch === '\r';
}

