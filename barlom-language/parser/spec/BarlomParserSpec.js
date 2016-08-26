/**
 * Specification for BarlomParser.
 */
describe(
  "BarlomParser", function () {

    var BarlomParser = require( '../../js/parser/src/BarlomParser' ).BarlomParser;

    it(
      "should parse an empty module definition", function () {

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

    it(
      "should parse a variant type", function () {

        var code = [
          "use x.y                                 ",
          "                                        ",
          "/* my sample module */                  ",
          "module a.b.c.mymodule                   ",
          "                                        ",
          "  variant_type V1                       ",
          "    variant U(x)                        ",
          "    variant V(x,y)                      ",
          "  end                                   ",
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
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 1 );

      }
    );

    it(
      "should parse an empty function", function () {

        var code = [
          "use x.y                                 ",
          "                                        ",
          "/* my sample module */                  ",
          "module a.b.c.mymodule                   ",
          "                                        ",
          "  function f()                          ",
          "  end                                   ",
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
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 1 );

      }
    );

    it(
      "should parse a function compilation unit", function () {

        var code = [
          "use x.y                                 ",
          "                                        ",
          "/* my sample function */                ",
          "function a.b.c.myfunction(p,q)          ",
          "  : /* TODO */                          ",
          "  /* just a constant */                 ",
          "  return 100                            ",
          "end                                     ",
          "                                        "
        ].join( '\n' );

        var parser = new BarlomParser( code, "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.useDeclarations.length ).toBe( 1 );
        expect( cmpUnit.useDeclarations[0].codeElementName.entries.length ).toBe( 2 );

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.leadingAnnotations.length ).toBe( 1 );
        expect( cmpUnit.codeElement.trailingAnnotations.length ).toBe( 1 );
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 1 );

      }
    );

    it(
      "should parse values initialized by various primary expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = ('example')                ",
          "  value v02 = $2016-01-01$               ",
          "  value v03 = 123_456                    ",
          "  value v04 = 0b0101001100               ",
          "  value v05 = true                       ",
          "  value v06 = false                      ",
          "  value v07 = 123.456                    ",
          "  value v08 = 123E45                     ",
          "  value v09 = self                       ",
          "  value v10 = {{{ abc {{x}} def }}}      ",
          "  value v11 = \"text\"                   ",
          "  value v12 = ''' abc\ndef\nghi '''      ",
          "  value v13 = undefined                  ",
          "  value v14 = 1.2.3                      ",
          "  value v15 = ~/[a-z1-2]+/ig             ",
          "  value v16 = q                          ",
          "  value v16 = (1,2,3)                    ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized by conditional expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = true                       ",
          "  value v02 = false                      ",
          "  value v03 = v01 or v02                 ",
          "  value v04 = v01 or v03 or v03          ",
          "  value v05 = v01 and v02                ",
          "  value v06 = v01 and v02 and v03        ",
          "  value v07 = v01 and v02 or v03         ",
          "  value v08 = v01 or v02 and v03         ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized by concatenation expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = 'x' & 'y'                  ",
          "  value v02 = 'x' & 'y' & 'z' & v01      ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with xor expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = x xor y                    ",
          "  value v02 = x or y xor z and p xor q   ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with equality expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = x = y                      ",
          "  value v02 = x =/= y                    ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with additive expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = x + y                      ",
          "  value v02 = x - y                      ",
          "  value v02 = x - y + z - q              ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with arithmetic expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = x + y / 3                  ",
          "  value v02 = x - y * z                  ",
          "  value v03 = x div y div q              ",
          "  value v04 = x div y mod q              ",
          "  value v05 = x * y * z + a / b / c      ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with exponentiation expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = x ^ 2                      ",
          "  value v02 = x ^ y ^ z                  ",
          "  value v03 = x ^ 3 + x ^ 2 + x + 3      ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with unary expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = -y                         ",
          "  value v02 = x * -y                     ",
          "  value v03 = -(a*b+c)                   ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with range expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = 1..10                      ",
          "  value v02 = 'a'..'z'                   ",
          "  value v03 = x-3 ..< x+3                ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with array literals", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = []                         ",
          "  value v02 = [a,b,c]                    ",
          "  value v03 = [x+2,x*2,x^2]              ",
          "  value v04 = ['a','b']                  ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with array literals", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = [;]                        ",
          "  value v02 = [a;b;c]                    ",
          "  value v03 = [x+2; x*2; x^2]            ",
          "  value v04 = ['a';'b']                  ",
          "  value v05 = [1.0]                      ",
          "  value v06 = [[1,2],[3,4]]              ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with set literals", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = {}                         ",
          "  value v02 = {theOne}                   ",
          "  value v02 = {a,b,c}                    ",
          "  value v03 = {'a','b','c'}              ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with map literals", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = {~>}                       ",
          "  value v02 = {one~>1}                   ",
          "  value v02 = {1~>'one',1+1~>'two'}      ",
          "  value v03 = {'a'~>1,'b'~>2,'c'~>3}     ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

    it(
      "should parse values initialized with structure literals", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = {one=1}                    ",
          "  value v02 = {one=1,two=2}              ",
          "  value v02 = {a='a',b=3*6,c=3.4}        ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( code.length-2 );

      }
    );

  }
);
