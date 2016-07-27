/**
 * Specification for BarlomParser.
 */
describe(
  "BarlomParser", function () {

    var BarlomParser = require( '../../js/parser/src/BarlomParser' ).BarlomParser;

    it(
      "should parse a simple module definition", function () {

        var code = [
          "use x.y                                 ",
          "                                        ",
          "/* my empty module */                   ",
          "module a.b.c.mymodule                   ",
          "                                        ",
          "end                                     ",
          "                                        "
        ].join( '\n' );

        var parser = new BarlomParser( code, "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.useDeclarations.length ).toBe( 1 );
        expect( cmpUnit.useDeclarations[0].codeElementName.entries.length ).toBe( 2 );

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.leadingAnnotations.length ).toBe( 1 );
        expect( cmpUnit.codeElement.trailingAnnotations.length ).toBe( 0 );
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 0 );

      }
    );

    it(
      "should parse use declarations and an enumeration type", function () {

        var code = [
          "use x.y                                 ",
          "use a.b.c as q                          ",
          "use p.q.r.z                             ",
          "                                        ",
          "/* a good one */                        ",
          "enumeration_type a.b.c.MyEnumeration    ",
          "  : exported                            ",
          "                                        ",
          "  symbol A : /* First Letter */         ",
          "                                        ",
          "  an_annotation                         ",
          "  symbol B : /* Second Letter */        ",
          "                                        ",
          "  /* Third Letter */                    ",
          "  symbol C                              ",
          "                                        ",
          "end                                     ",
          "                                        "
        ].join( '\n' );

        var parser = new BarlomParser( code, "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.useDeclarations.length ).toBe( 3 );
        expect( cmpUnit.useDeclarations[0].codeElementName.entries.length ).toBe( 2 );
        expect( cmpUnit.useDeclarations[1].codeElementName.entries.length ).toBe( 3 );
        expect( cmpUnit.useDeclarations[2].codeElementName.entries.length ).toBe( 4 );

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.leadingAnnotations.length ).toBe( 1 );
        expect( cmpUnit.codeElement.trailingAnnotations.length ).toBe( 1 );
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 3 );

      }
    );

  }
);
