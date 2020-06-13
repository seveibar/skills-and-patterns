# Two Parameter Limit

Functions can have no more than two positional parameters. Prefer named parameters.

```javascript
function addAndDivide({ add1, add2, divide }) {
  return (add1 + add2) / divide
}
```

## Anti-Pattern:

```javascript
function addAndDivide(add1,add2,divide) {
  return (add1 + add2) / divide
}
```
