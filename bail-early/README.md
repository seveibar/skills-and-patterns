# Bail Early

Bailing early is a technique for reducing the size and complexity of javascript methods. It greatly reduces the
amount of nesting in javascript methods by returning, or failing, early in the function's execution.

## Examples

```javascript
// An example in a micro endpoint
const { send } = require("micro")

module.exports = async (req, res) => {
  if (!req.headers["Authorization"]) return micro.send(res, 500, "Need Authorization Header")
  if (!await isAuthorized(req.headers["Authorization"])) return micro.send(res, 401, "Not Authorized")
  
  return res.end("You are authorized!")
}
```


```javascript
// An example in a utility method

function joinPath(rowPath, columnPath) {
    if (!rowPath) throw new Error(`Column path is empty!`)
    if (!columnPath) throw new Error(`Row path is empty!`)
    
    rowPath = rowPath.trim()
    columnPath = columnPath.trim()
    
    // Remove dots from beginning and end of rowPath, make sure columnPath has
    // a dot in front of it
    if (rowPath.endsWith(".")) rowPath = rowPath.slice(0, -1)
    if (rowPath.endsWith(".")) columnPath = columnPath.slice(0, -1)
    if (rowPath.startsWith(".")) rowPath = rowPath.slice(1)
    if (!columnPath.startsWith(".")) columnPath = "." + columnPath
    
    if (rowPath === "") return columnPath.slice(1) || "."
    if (columnPath === ".") return rowPath
    
    return rowPath + columnPath
}
```


## Anti-pattern: Nested Functions

It's really hard to read long functions with big if/else conditions.

```javascript
// An example in a utility method

function joinPath(rowPath, columnPath) {
    if (rowPath) {
      rowPath = rowPath.trim()
      if (columnPath) {
        columnPath = columnPath.trim()
        
         // Remove dots from beginning and end of rowPath, make sure columnPath has
         // a dot in front of it

        if (rowPath.endsWith(".")) rowPath = rowPath.slice(0, -1)
        if (rowPath.endsWith(".")) columnPath = columnPath.slice(0, -1)
        if (rowPath.startsWith(".")) rowPath = rowPath.slice(1)
        if (!columnPath.startsWith(".")) columnPath = "." + columnPath
        
        if (rowPath !== "") {
          if (columnPath !== ".") {
            return rowPath + columnPath
          } else {
            return rowPath
          }
        } else {
          return columnPath.slice(1) || "."
        }
      } else {
        throw new Error(`Column path is empty!`)
      }
    } else {
      throw new Error(`Row path is empty!`)
    }
}
```
