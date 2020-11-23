# Micro Testing

[micro](https://www.npmjs.com/package/micro) endpoints can be easily tested using [ava](#) and the [test-listen](#) package. These
tests are essential for ensuring the endpoints perform properly.

## Example

```javascript
const test = require("ava")
const listen = require("test-listen")
const micro = require("micro")
const someEndpoint = require("../api/some-endpoint.js")
const getDB = require("pgknexlove")()
const axios = require("axios")

test("some endpoint test", async (t) => {
  const db = await getDB({ testMode: true })
  // process.env.POSTGRES_DATABASE = db.client.config.connection.database
  // TODO migrate or seed here
  
  const someEndpointService = micro(someEndpoint)
  const someEndpointUrl = await listen(someEndpointService)
  
  t.truthy((await axios.get(someEndpointUrl + "?myquery=3")).data)
})
```
