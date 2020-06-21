# Javascript (style guide)

> This document is incomplete, partially because it's a large undertaking. The [Airbnb javascript style guide](https://github.com/airbnb/javascript) is a good reference
> until this document is complete.


## Antipattern: `forEach`

Use for loops instead of `forEach`. `forEach` has unexpected behavior with asynchronous functions, is slower [[1]](https://coderwall.com/p/kvzbpa/don-t-use-array-foreach-use-for-instead)
and has more characters.

> p.s. you might be looking for `map`, which is good. `forEach` is not used in functional-style programming.

## Antipattern: `new Object(), new Array()`

Always use "literal" syntax when creating objects and arrays.

```javascript
// Good
const array = []
const obj = {}

// Bad
const array = new Array()
const obj = new Object()
```
