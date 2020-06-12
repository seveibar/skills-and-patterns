# How to Build Hooks

Hooks are a powerful paradigm for managing state or side effects in React components.

When building a hook, there are several things you'll want to watch out for:
* Unnecessary renders
* Hook Antipatterns

## Anti-pattern: Infinite Loop

This anti-pattern will crash a browser with an infinite number of rerenders. Make sure useEffects
only rerun when the most minimal set of things needed for them to rerun change.

```javascript
() => {
  const [state, setState] = useState(false)
  useEffect(() => {
    fetch("...").then(() => {
      setState(state)
    })
  },[state])
}
```

## Anti-pattern: useRef

You'll want to avoid `useRef` whenever you can. Most of the time `useRef` is used incorrectly. Try
to stick with a combination `useState`, `useMemo`, `useEffect` and `useReducer`.

Usually, the only acceptable use for `useRef` is for tracking a dom element or as a requirement
of a third-party library.
