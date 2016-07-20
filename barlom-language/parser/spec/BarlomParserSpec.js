/**
 * Specification for BarlomParser
 */
describe(
  "BarlomParser", function () {

    var BarlomParser = require( '../../js/parser/src/BarlomParser' ).BarlomParser;

    it(
      "should parse use declarations", function () {
        var code = "use x.y\nuse a.b.c.e\nuse p.q.r.z";
        var parser = new BarlomParser( code, "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.childNodes.length ).toBe( 3 );

      }
    );

  }
);
