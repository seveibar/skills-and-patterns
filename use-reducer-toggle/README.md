# useReducer toggle

This is a simple pattern for managing something that toggles. It has the benefit of reducing the need for a `useCallback`
in many cases.


```javascript
() => {
  const [dialogOpen, toggleDialog] = useReducer(state => !state, false);
  
  return <div>
    <button onClick={toggleDialog}>toggle</button>
    {/* ... */}
  </div>
}
```
