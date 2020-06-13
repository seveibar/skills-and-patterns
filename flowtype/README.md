# Flow Type

Flow type is a type system for javascript that many projects use. Flowtypes are always optional, but preferred over
repeated duck typing or untyped complex systems of variables.

## Flowtype in Node

Use [flow-node](https://www.npmjs.com/package/flow-node).

## Anti-pattern: Typescript

Typescript is much more constrained than flow and adds significant project complexity.

> *Typescript enables developers to build very complex systems. Complex systems are the anti-thesis of KISS and
>  [burnable-projects](../burnable-projects). Typescript is good at managing complex projects- but
>  a project with enough complexity to justify Typescript is too complex.

## Anti-pattern: Repeated Duck Typing

Repeated duck typing is when you use duck types repeatedly for more than 2-3 variables.

```javascript
// BAD
var aString = "some string"
var bNumber = 5
var cNestedRequest = { request: { body: "hi" } }

// Good
type NestedRequest = { request: { body: string } }

var a:string = "some string"
var b:number = 5
var c:NestedRequest = { request: { body: "hi } }
```
