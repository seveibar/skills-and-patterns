# Avoid Try Catch

"Try catch" is an old pattern and often decreased readability by causing high levels of nesting.

```javascript
// BAD, traditional try catch
try {
  // some code
} catch (e) {
  // some error handling
}
```

Sometimes try catch is necessary (particularly, in synchronous functions) but for promise functions it can usually be
avoided.

## Pattern: Move `.catch` outside of function

```javascript
async main() {
  await couldPossiblyThrowError()
  await alsoCouldThrowError()
}

main().catch(e => {
  console.log("Error: ", e.toString())
})
```

## Pattern: Catch without then

```javascript
async main() {
  const myVal = await somethingThatCouldThrow().catch((e) => {
    console.log("Warning: " + e.toString())
    return null
  })
  if (!myVal) {
    // Handle not having value
    // this is similar to a try catch but doesn't have the same scoping issue (myVal is in the
    // parent scope)
  }
}

main()
```
