/**
 * Main application for Barlom IDE.
 */
var BarlomLexer = require( '../../barlom-language/js/lexer/src/BarlomLexer' ).BarlomLexer;
var BarlomTokenType = require( '../../barlom-language/js/lexer/src/BarlomTokenType' ).BarlomTokenType;
var BarlomToken = require( '../../barlom-language/js/lexer/src/BarlomToken' ).BarlomToken;

var greeter = new BarlomLexer( "Hello, brave Barlom world.", "example.barlom", { skipWhiteSpace: false } );

var tokens = greeter.readAllTokens();

var greeting = "" + tokens.length + "<br>";

for ( var i=0 ; i< tokens.length ; i+=1 ) {
  greeting += tokens[i].text;
}

greeting += "<br>";

for ( i=0 ; i< tokens.length ; i+=1 ) {
  greeting += BarlomTokenType[ tokens[i].tokenType ];
  greeting += " "
}

document.body.innerHTML = greeting;

var stupidToken = new BarlomToken();

