# Micro

Micro is a small server nodejs module. It should be used for all servers.

Micro is extremely easy to test, simple, deploys well to serverless platforms, and forces small,
easy-to-understand endpoints.

## Example Usage

```bash
npm install micro micro-dev
```

```javascript
// package.json
{
  "main": "index.js",
  "scripts": {
    "start": "micro"
  }
}

// index.js
module.exports = (req, res) => {
  res.end('Hello World!')
}
```
