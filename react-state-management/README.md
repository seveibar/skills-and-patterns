# React State Management

There are two different ways to manage state in React depending on the scenario:
* There is a small amount of state that is easy to understand
* There is a lot of state, the state needs to be tested, etc.


## 1. There is a small amount of state that is easy to understand

Use some hooks. Here's an example of a stateful component that has two simple hooks.

```javascript
const SomeComponent = () => {
  const [documents, setDocuments] = useState(null)
  
  useEffect(() => {
    fetch("https://myapi.com/documents").then(r => r.json()).then(docs => {
      setDocuments(docs)
    })
  }, [])
  
  return <pre>{JSON.stringify(documents,null,"  ")}</pre>
}
```

If you have more than 4 hooks for managing state, go to 2.

### Anti-Pattern: Repeated Async API Calls

If you have a component making calls to an API based on a one-time `useEffect(() => {/* ... */}, [])` and the
component is being mounted multiple times, you're making extra API requests. Go to 2.


## 2. There is a lot of state, the state needs to be tested, etc.

You must use a global state pattern.

### 2.1 Recoil Pattern (preferred)

This is a new pattern that is better than Redux. See [Recoil](https://recoiljs.org/)
for details.

* [10 minute Video Course on Recoil](https://egghead.io/lessons/react-set-up-recoil-in-a-new-react-app)

### 2.2 Context Pattern

React Context is very useful for managing global state. There are many contexts in an App at any given
time, usually broken down by their specific domain. For example, this is a typical `App.js`.

Notice the different purposes of context:
* Displaying Toasts (notifications)
* Storing data in localStorage
* Providing Authentication

```javascript
import React from "react"
import Theme from "./components/Theme"
import LocalStorageApp from "./components/LocalStorageApp"
import DesktopApp from "./components/DesktopApp"
import { ToastProvider } from "./components/Toasts"
import useElectron from "./utils/use-electron.js"
import { AppConfigProvider } from "./components/AppConfig"
import { AuthProvider } from "./utils/auth-handlers/use-auth.js"
import { HotkeyStorageProvider } from "./components/HotkeyStorage"
import "./App.css"

export const App = () => {
  const electron = useElectron()
  return (
    <Theme>
      <AppConfigProvider>
        <AuthProvider>
          <ToastProvider>
            <HotkeyStorageProvider>
              {Boolean(electron) ? <DesktopApp /> : <LocalStorageApp />}
            </HotkeyStorageProvider>
          </ToastProvider>
        </AuthProvider>
      </AppConfigProvider>
    </Theme>
  )
}

export default App
```

A provider is defined like this:

```javascript
import { createContext, useContext, useState } from "react"

const ToastContext = createContext({
  messages: [],
  addMessage: () => {/* by default, does nothing */}
})

export const useToasts = () => {
  return useContext(ToastContext)
}

export const ToastProvider = ({ children }) => {
  const [messages, addMessage] = useReducer((messages, newMessage) => messages.concat(newMessage), [])
  const contextValue = useMemo(() => ({ messages, addMessage }), [messages, addMessage])
  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>
}

```

### Deprecated Pattern: Redux

Redux is too verbose (you have to write a lot to get things done), but is often used in older libraries and applications.

That said, it is important to know because although it has a lot of code, it is an effective pattern.
