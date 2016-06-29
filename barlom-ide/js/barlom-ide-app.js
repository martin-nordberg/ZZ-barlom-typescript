/**
 * Main application for Barlom IDE.
 */
var BarlomLexer = require( '../../barlom-language/lexer/js/BarlomLexer' ).BarlomLexer;

var greeter = new BarlomLexer( "Hello, brave new world!" );

document.body.innerHTML = greeter.readToken().text;
