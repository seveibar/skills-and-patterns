# React Styling

There are two ways to style a React component, each for different scenarios:
* General case (use `styled` from Material UI)
* You have a tiny amount of styling that is changed by javascript (inline style)

## Directly use inline style

If you have a small amount of variably applied styling, you can use an inline style.

### Example

```javascript
const MyComponent = ({ isClicked }) => {
  const style = useMemo(() => isClicked ? { color: "#f00" } : {})
  return <div style={style}>this is red when isClicked=true</div>
}
```

## Use `styled`

```javascript
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

import Button from "@material-ui/core/Button"

const SomeComponent = styled(Button)(({ isFocused }) => ({
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
