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
          "enumeration type a.b.c.MyEnumeration    ",
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
          "  variant type V1                       ",
          "    variant U(x)                        ",
          "    variant V(x,y)                      ",
          "  end                                   ",
          "                                        ",
          "  variant type V2                       ",
          "    variant A(x)                        ",
          "    variant B(x,y)                      ",
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
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 2 );

      }
    );

    it(
      "should parse a simple function", function () {

        var code = [
          "use x.y                                 ",
          "                                        ",
          "/* my sample module */                  ",
          "module a.b.c.mymodule                   ",
          "                                        ",
          "  function f()                          ",
          "    return 42                           ",
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
      "should parse a nested function", function () {

        var code = [
          "use x.y                                 ",
          "                                        ",
          "/* my sample module */                  ",
          "module a.b.c.mymodule                   ",
          "                                        ",
          "  function f()                          ",
          "    function g()                        ",
          "      return 42                         ",
          "    end                                 ",
          "    return 42                           ",
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
          "  value v00 = x                          ",
          "  value v01 = x = y                      ",
          "  value v02 = x <> y                     ",
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
          "  value v03 = {a,b,c}                    ",
          "  value v04 = {'a','b','c'}              ",
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
          "  value v03 = {1~>'one',1+1~>'two'}      ",
          "  value v04 = {'a'~>1,'b'~>2,'c'~>3}     ",
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
          "  value v03 = {a='a',b=3*6,c=3.4}        ",
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
      "should parse values initialized with function expression literals", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = (x) -> x^2                 ",
          "  value v02 = (a,b) -> a & b             ",
          "  value v03 = (p,q,r) -> ( p + q ) * r   ",
          "  value v04 = () -> 3 + 39               ",
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
      "should parse values initialized with function block literals", function () {

        var code = [
          "function myfunction()                    ",
          "  value v00 = 0                          ",
          "  value v01 = (x) -> begin               ",
          "    value y = x^2                        ",
          "    return y                             ",
          "  end                                    ",
          "  value v02 = (a,b) -> begin             ",
          "    return a & b                         ",
          "  end                                    ",
          "  value v03 = (p,q,r) -> begin           ",
          "    return ( p + q ) * r                 ",
          "  end                                    ",
          "  value v04 = () -> begin                ",
          "    value three = 3                      ",
          "    value more = 39                      ",
          "    return three + more                  ",
          "  end                                    ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 6 );

      }
    );

    it(
      "should parse values initialized with function call expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = f()                        ",
          "  value v02 = f2(17)                     ",
          "  value v03 = f3(1,2,3)                  ",
          "  value v04 = h(1+2,'a'&'b')             ",
          "  value v05 = p( g(4,5,6) )              ",
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
      "should parse values initialized with field reference expressions", function () {

        var code = [
          "function myfunction()                    ",
          "  value v01 = a.b                        ",
          "  value v02 = p.q.r                      ",
          "  value v03 = f(1,2).g('a')              ",
          "  value v04 = ('a'&'b').length           ",
          "  value v05 = 'abc'.reversed()           ",
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
      "should parse assert statements", function () {

        var code = [
          "function myfunction()                    ",
          "  assert 1 + 1 = 2                       ",
          "  assert p > 3 : message( 'too small' )  ",
          "  assert false                           ",
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
      "should parse assignment statements", function () {

        var code = [
          "function myfunction()                    ",
          "  let a = 3                              ",
          "  let q += a*b                           ",
          "  let self.q.w -= e*r*t+y                ",
          "  let x ^= 2                             ",
          "  let y *= 10                            ",
          "  let z /= 8.3                           ",
          "  let q &= 'more'                        ",
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
      "should parse call statements", function () {

        var code = [
          "function myfunction()                    ",
          "  call f()                               ",
          "  call g(1,2,3)                          ",
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
      "should parse raise error statements", function () {

        var code = [
          "function myfunction()                    ",
          "  raise error MyException()              ",
          "  raise error Problem('very bad')        ",
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
      "should parse unless statements", function () {

        var code = [
          "function myfunction()                    ",
          "  unless done call doMore() end          ",
          "  unless x > y                           ",
          "    let z = y - x                        ",
          "  end                                    ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 3 );

      }
    );

    it(
      "should parse repeat-while statements", function () {

        var code = [
          "function myfunction()                    ",
          "  repeat while not done call doIt() end  ",
          "  repeat while x > y                     ",
          "    let x = x - 3                        ",
          "  end                                    ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 3 );

      }
    );

    it(
      "should parse repeat-until statements", function () {

        var code = [
          "function myfunction()                    ",
          "  repeat until noMore() call doIt() end  ",
          "  repeat until x < y                     ",
          "    let x = x - 3                        ",
          "  end                                    ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 3 );

      }
    );

    it(
      "should parse repeat-for statements", function () {

        var code = [
          "function myfunction()                    ",
          "  repeat for n in names call f(n) end    ",
          "  repeat for line : /*laugh*/ in lines   ",
          "    call printLine( line )               ",
          "  end                                    ",
          "  return 0                               ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 3 );

      }
    );

    it(
      "should parse short function declarations", function () {

        var code = [
          "function myfunction(x)                   ",
          "  function f = (y) -> y^2                ",
          "  return f(x)                            ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 2 );

      }
    );

    it(
      "should parse behavior declarations", function () {

        var code = [
          "function myfunction(x)                   ",
          "  behavior f()                           ",
          "  behavior g(x)                          ",
          "  behavior h(x,y)                        ",
          "  return f(x)                            ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 4 );

      }
    );

    it(
      "should parse check statements", function () {

        var code = [
          "function myfunction(x)                   ",
          "  check                                  ",
          "    call f()                             ",
          "  detect e : MyException                 ",
          "    call f2(e)                           ",
          "  regardless                             ",
          "    call cleanUp()                       ",
          "  end                                    ",
          "  return f(x)                            ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 2 );

      }
    );

    it(
      "should parse if statements", function () {

        var code = [
          "function myfunction(x)                   ",
          "  if 1+1 = 2                             ",
          "    call f()                             ",
          "  end                                    ",
          "  if 1+1 = 2                             ",
          "    call f()                             ",
          "  else                                   ",
          "    call g()                             ",
          "  end                                    ",
          "  if 1+1 = 2                             ",
          "    call f()                             ",
          "  else if 1+1 = 3                        ",
          "    call g()                             ",
          "  else if 1+1 = 4                        ",
          "    call h()                             ",
          "  else                                   ",
          "    call q()                             ",
          "  end                                    ",
          "  return f(x)                            ",
          "end                                      "
        ];

        var parser = new BarlomParser( code.join( '\n' ), "example.barlom" );

        var cmpUnit = parser.parseCompilationUnit();

        expect( cmpUnit.codeElement ).not.toBeNull();
        expect( cmpUnit.codeElement.codeElements.length ).toBe( 4 );

      }
    );

    // TODO: check statements

  }
);
