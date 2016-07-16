# Barlom Literals

## Arrays

Example              | Meaning
-------------------- | -------
`[]`                 | Empty array
`[ 1, 2, 3 ]`        | Array of integers
`[ "a", "b", "c" ]`  | Array of text
`[ "a", "b", "c", ]` | Trailing comma is allowed (and ignored)

## Booleans

Value   | Meaning
------- | -------
`false` | Value false
`true`  | Value true

## Code

Pattern            | Meaning
------------------ | -------
`` ` ``...`` ` ``  | Quoted code literal (multiple lines allowed)

## Dates and Times

Example                      | Meaning
---------------------------- | -------
`$2016-05-01$`               | Date
`$2016-05-31T08:00$`         | Date and time
`$T23:59$`                   | Time without date
`$2016-05-31T08:00:12$`      | Date and time with seconds
`$2016-05-31T08:00:12.3$`    | Date and time with fractional seconds
`$2016-05-31T08:00:12.345$`  | Date and time with milliseconds
`$2016-05-31T08:00+01:00$`   | Date and time with timezone offset
`$2016-05-31T08:00-05:00$`   | Date and time with timezone offset
`$2016-05-31T08:00:12.345Z$` | Date and time in UTC timezone

## Documentation

Pattern     | Meaning
----------- | -------
`/*`...`*/` | Documentation (multiple lines allowed, no nesting)

## Functions

Pattern | Meaning
------- | -------
`(x) -> x + 1`     | Function with one parameter
`(a,b,c) -> a*b+c` | Function with three parameters
`() -> p^q`        | Function with no parameters acting as a closure
`(x) -> begin`<br>&nbsp;`if x=0 return 0 end`<br>&nbsp;`return 100/x`<br>`end` | Function body with multiple statements

## Graphs

Pattern         | Meaning
--------------- | -------
`[%%` ... `%%]` | Overall graph literal
`[a]`           | Vertex
`[a]---[b]`     | Undirected edge between vertices a and b
`[a]-->[b]`     | Directed edge from vertex a to vertex b
`[a]<--[b]`     | Directed edge from vertex b to vertex a
`[a]--(e)--[b]` | Undirected edge named e between vertices a and b
`[a]--(e)->[b]` | Directed edge named e from vertex a to vertex b
`[a]<-(e)--[b]` | Directed edge named e from vertex b to vertex a

## Integers

Example                  | Meaning
------------------------ | -------
`0`                      | 32 bit decimal integer
`0x0`                    | 32 bit hexadecimal integer
`0b0`                    | 32 bit binary integer
`0y`                     | 8 bit decimal integer
`0x0000s`                | 16 bit integer
`0b0000_0000i`           | binary integer with "infinite" precision
`123_456`                | 32 bit decimal integer with underscore separator
`0b1010101000011`        | 32 bit binary integer
`0xabcd_ef01`            | 32 bit hexadecimal integer
`123456789L`             | 64 bit decimal integer
`0xCAFE_BABE_1234_0000L` | 64 bit hexadecimal integer

## Lists

Example              | Meaning
-------------------- | -------
`[;]`                | Empty list
`[ 1; ]`             | List containing one integer
`[ 1; 2; 3 ]`        | List of integers
`[ "a"; "b"; "c" ]`  | List of strings
`[ "a"; "b"; "c"; ]` | Trailing semicolon is allowed (and ignored)

## Locations

Example                                            | Meaning
-------------------------------------------------- | -------
<code>@&vert;http://barlom.org/homepage &vert;</code> | URL location
TODO | More examples

## Maps

Example                                   | Meaning
----------------------------------------- | -------
`{~>}`                                    | Empty map
`{ "one"~>1 }`                            | Map with one entry
`{ "one"~>1, "two"~>2, "three"~>3 }`      | Map with multiple entries
`{ "a" ~> "A", "b" ~> "B", "c" ~> "C", }` | Trailing comma is allowed (and ignored)

## Numbers

Example      | Meaning
------------ | -------
`0.0`        | 64 bit zero
`0E0`        | 64 bit zero using scientific/exponential notation
`0E+0`       | The exponent can have a sign
`0f`         | 32 bit zero using 'f' or 'F'
`0D`         | Explicit 'D' or 'd' suffix for 64 bit values
`123_456.0`  | Underscore separators are allowed
`123E-45`    | Exponent can be negative
`123.456E03` | Number can have both decimals and exponent
`123.456G`   | Arbitrary precision numbers using 'g' or 'G' suffix

## Ranges

Example      | Meaning
------------ | -------
`1..10`      | From one to ten inclusive
`1..<10`     | Equivalent to `1..9`
`'a'..'z'`   | Range of characters
`1.0..<10.0` | Range of numbers

TODO (maybe): `1..10 by 2`

## Regular Expressions

Pattern       | Meaning
------------- | -------
`~/`...`/`    | Regular expression
`~/`...`/i`   | Case insensitive regular expression
`~/`...`/g`   | Regular expression matching whole (global) string
`~/`...`/m`   | Regular expression matching multiple lines

## Sets

Example              | Meaning
-------------------- | -------
`{}`                 | Empty set
`{ 1 }`              | Integer set with one element
`{ 1, 2, 3 }`        | Integer set
`{ "a", "b", "c" }`  | Text set
`{ "a", "b", "c", }` | Trailing comma is allowed (and ignored)

## Structures

Example                          | Meaning
-------------------------------- | -------
`{=}`                            | Empty structure
`{ one=1 }`                      | Structure instance with one field
`{ one=1, two=2, three=3 }`      | Structure instance with three fields
`{ a = "A", b = "B", c = "C" }`  | Structure instance with text-valued fields
`{ a = "A", b = "B", c = "C", }` | Trailing comma is allowed (and ignored)

## Templates

Example                        | Meaning
------------------------------ | -------
`{{{abcdefgh sfasf {{a.b}} qwert asdf ghjk}}}` | Simple template with one placeholder
`{{{`<br>&nbsp;`line "1"`<br>&nbsp;`line "2"`<br>`}}}` | Multiline template
`{{{`<br>&nbsp;`{{a}}`<br>&nbsp;`{{b}}`<br>`}}}` | Multiline template with two placeholders
TODO: Mustache loops, etc.

## Text

Pattern       | Meaning
------------- | -------
`'`...`'`     | Single-quoted text literal
`"`...`"`     | Double-quoted text literal
`'''`...`'''` | Single-quoted text literal (multiple lines allowed)
`"""`...`"""` | Double-quoted text literal (multiple lines allowed)

## Tuples

Example | Meaning
------- | -------
`()` | Empty tuple (note: no interior comma)
`( "one", 1 )` | Tuple of a string and an integer
`( "a", "b", "c" )` | Tuple of three strings (no trailing comma allowed)

## Versions

Example               | Meaning
--------------------- | -------
`1.0.1`               | Simple three level version
`2.3.9-ALPHA.1`       | Version with release moniker
`1.1.0+234`           | Version with build number
`2.3.9-beta-1+002`    | Version with release moniker and build number
`1.2.3-rc1+build-789` | Another example with more explicit build number

