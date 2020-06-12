# React Styling

There are two ways to style a React component, each for different scenarios:
* General case (use `styled`)
* You have a tiny amount of styling that is changed by javascript (inline style)


* Directly use inline style
* Use `styled` from Material UI
* Use `makeStyles` from Material UI

## Directly use inline style

## Use `styled`

```javascript
//             you can use any component, not just "div"
const SomeComponent = styled("div")({
  border: "1px solid #000",
  "& .titleText": {
    fontSize: 28
  },
  "&:hover": {
    border: "2px dashed #000"
  }
})
```

Styled can also use props you pass to it:

```javascript
//             you can use any component, not just "div"
const SomeComponent = styled("div")(({ isFocused }) => ({
  border: "1px solid #000",
  backgroundColor: isFocused ? "#f00" : #fff",
  "& .titleText": {
    fontSize: 28
  },
  "&:hover": {
    border: "2px dashed #000"
  }
}))
```

## Anti-pattern: Use `makeStyles`

`styled` has optimization advantages because each component's prop changes only effect that
component's style changing. Plus, it's easier to use the same technique everywhere.
