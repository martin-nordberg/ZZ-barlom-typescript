# Barlom Operators

## Annotation Operators

Operator | Meaning
-------- | -------
`is`     | Annotation (including type) checking
`isnot`  | Inverse annotation checking

## Arithmetic Operators

Operator     | Meaning
------------ | -------
`div`        | Integer division
`mod`        | Integer modulo
`+` (infix)  | Addition
`+` (prefix) | Identity (no-op)
`-` (infix)  | Subtraction
`-` (prefix) | Negation
`*`          | Multiplication
`/`          | Division
`^`          | Exponentiation
`+=`         | Addition assignment
`-=`         | Subtraction assignment
`*=`         | Multiplication assignment
`/=`         | Division assignment
`^=`         | Exponentiation assignment
`=`          | Assignment

## Arrow Operators

Operator | Meaning
-------- | -------
`<-`     |
`->`     | Used in function literals
`---`    |
`<--`    |
`-->`    |
`<->`    |
`<-->`   |
`<<--`   |
`-->>`   |
`<>--`   |
`--<>`   |
`=>`     | Used in match statements
`<==`    |
`==>`    |
`<<==`   |
`==>>`   |
`<>==`   |
`==<>`   |
`<~`     |
`~>`     | Used in map literals
`~~~`    |
`<~~`    |
`~~>`    |
`<~>`    |
`<~~>`   |
`<<~~`   |
`~~>>`   |
`<>~~`   |
`~~<>`   |
`<:`     |
`:>`     |
`<::`    |
`::>`    |
`<:>`    |
`<::>`   |

## Bitwise Operators

Operator         | Meaning
---------------- | -------
`~and~`          | Bitwise AND
`~nand~`         | Bitwise NAND
`~nor~`          | Bitwise NOR
`~not~` (prefix) | Bitwise NOT
`~or~`           | Bitwise OR
`~shl~`          | Shift left
`~shr~`          | Shift right with sign propagation
`~xor~`          | Bitwise XOR
`~zshr~`         | Shift right with zero fill

## Comparison Operators

Operator | Meaning
-------- | -------
`=`      | Equality
`<`      | Less than
`<=`     | Less than or equal to
`>`      | Greater than
`>=`     | Greater than or equal to
`<>`     | Not equal to
`<=>`    | Comparison operator: smaller, same, bigger
`===`    | Same identity

## Logic Operators

Operator       | Meaning
-------------- | -------
`and`          | Logical AND
`nand`         | Logical NAND
`nor`          | Logical NOR
`not` (prefix) | Logical NOT (unary prefix)
`or`           | Logical OR
`xor`          | Logical XOR

## Text Operators

Operator     | Meaning
------------ | -------
`$` (prefix) | Conversion to string
`&`          | String concatenation
`&=`         | String concatenation assignment

## Type Operators

Operator      | Meaning
------------- | -------
`as`          | Type cast
`?` (postfix) | Nullable type

## Punctuation

Symbol                                     | Meaning
------------------------------------------ | -------
`.`                                        | Field reference or method call
`,`                                        | Separator
`:` (prefix)                               | Trailing annotation
`::`                                       | Method of a class
`[`...`]` (postfix)                        | Index operator (see also several kinds of literal)
`(`...`)`                                  | Expression grouping (see also tuple literals)
`(`...`)` (postfix)                        | Function parameters
`#`                                        | Start of user-defined keyword
`#[`...`]`                                 | User-defined literal
`#{`...`}`                                 | User-defined literal
`#/`...`/`                                 | User-defined literal
<code>#&vert;</code>...<code>&vert;</code> | User-defined literal

## TODO: Candidates

Symbol   | Meaning
------   | -------
`!`      |
`@`      |
`%`      |
`%%`     |
`<<`     |
`<<<`    |
`<<=`    |
`>>`     |
`>>>`    |
`>>=`    |
`==`     |
`~`      |
`~=`     |
<code>&#124;=</code> |
`in`     |
`notin`  |
`%/%`    | Integer division (R)

