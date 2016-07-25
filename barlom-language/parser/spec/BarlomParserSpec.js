/**
 * Specification for BarlomParser
 */
describe(
  "BarlomParser", function () {

    var BarlomParser = require( '../../js/parser/src/BarlomParser' ).BarlomParser;

    it(
      "should parse use declarations and an enumeration type", function () {

        var code = [
          "use x.y                           ",
          "use a.b.c as q                    ",
          "use p.q.r.z                       ",
          "                                  ",
          "context g.h.j                     ",
          "                                  ",
          "/* a good one */                  ",
          "enumeration_type MyEnumeration    ",
          "  : exported                      ",
          "                                  ",
          "  symbol A : /* First Letter */   ",
          "                                  ",
          "  symbol B : /* Second Letter */  ",
          "                                  ",
          "  /* Third Letter */              ",
          "  symbol C                        ",
          "                                  ",
          "end                               ",
          "                                  "
        ].join( '\n' );

        var parser = new BarlomParser( code, "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.useDeclarations.length ).toBe( 3 );
        expect( cmpUnit.useDeclarations[0].path.entries.length ).toBe( 2 );
        expect( cmpUnit.useDeclarations[1].path.entries.length ).toBe( 3 );
        expect( cmpUnit.useDeclarations[2].path.entries.length ).toBe( 4 );

        expect( cmpUnit.codeElements.length ).toBe( 1 );
        expect( cmpUnit.codeElements[0] ).not.toBeNull();
        expect( cmpUnit.codeElements[0].leadingAnnotations.length ).toBe( 1 );
        expect( cmpUnit.codeElements[0].trailingAnnotations.length ).toBe( 1 );
        expect( cmpUnit.codeElements[0].codeElements.length ).toBe( 3 );

      }
    );

  }
);
