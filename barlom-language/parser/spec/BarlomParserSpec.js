/**
 * Specification for BarlomParser
 */
describe(
  "BarlomParser", function () {

    var BarlomParser = require( '../../js/parser/src/BarlomParser' ).BarlomParser;

    it(
      "should parse use declarations and an enumeration type", function () {
        var code = "use x.y\nuse a.b.c\nuse p.q.r.z\n/* a good one */\nenumeration type x.MyEnumeration : exported end";
        var parser = new BarlomParser( code, "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.useDeclarations.length ).toBe( 3 );
        expect( cmpUnit.useDeclarations[0].path.entries.length ).toBe( 2 );
        expect( cmpUnit.useDeclarations[1].path.entries.length ).toBe( 3 );
        expect( cmpUnit.useDeclarations[2].path.entries.length ).toBe( 4 );

        expect( cmpUnit.definition ).not.toBeNull();
        expect( cmpUnit.definition.leadingAnnotations.length ).toBe(1);
        expect( cmpUnit.definition.trailingAnnotations.length ).toBe(1);

      }
    );

  }
);
