# Exporting React Components

React components should always be exported with a default and named export.

```javascript
import React from "react"

export const SomeComponent = () => {
  return null
}

export default SomeComponent
```

## Anti-pattern: Default-only Export

If only a default export is used, the React Devtools Extension will label the component as "anonymous".

```javascript
import React from "react"

export default () => {
  return null
}
```
