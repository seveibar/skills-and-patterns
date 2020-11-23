# Postgrest Testing

Postgrest APIs make it easy to access your database and are generally very reliable. Still, there are many functions that are important
to have testing for:

* Access Permissions (Row Level Security) with JWT Tokens
* Triggers
* Complex Views

## Example Fixture

```javascript
// fixture.js
const getDB = require("pgknexlove")()
const pgm = require("node-pg-migrate")
const path = require("path")
const runSeed = require("../../src/seed.js")
const { startServer, cleanUp } = require("../../src/vercel-endpoint.js")
  
module.exports = async ({ seed, schema = "api", role = "api_user" } = {}) => {
  const db = await getDB({ testMode: true })
  await pgm.default({
    databaseUrl: db.connection,
    dir: path.resolve(__dirname, "../../migrations"),
    direction: "up",
  })
  if (seed) {
    await runSeed({ db })
  }
  const { host, port, database, user } = db.connection
  const jwtSecret = "testsecrettestsecrettestsecret32"
  const { postgrestUrl } = await startServer({
    dbUri: `postgresql://${user}@${host}:${port}/${database}`,
    schema,
    role,
    jwtSecret,
  })
  return {
    postgrestUrl,
    db,
    jwtSecret,
    done: async () => {
      console.log("cleaning up fixture...")
      await db.destroy()
      await cleanUp()
      console.log("fixture cleaned up")
    },
  }                                                                                                           
}                                                                                                             
```

### Example Fixture Usage

```javascript
const test = require("ava")
const bent = require("bent")
const jwt = require("jsonwebtoken")
const fixture = require("./fixture")

const postJSON = bent("POST", 201)
const getJSON = bent("json", "GET")

test("create a new worker", async (t) => {
  const { done, postgrestUrl, db, jwtSecret } = await fixture()

  const headers = {
    Authorization: `Bearer ${jwt.sign(
      {
        sub: "testworker_sub",
        "https://wao.ai/email": "testworker@example.com",
      },
      jwtSecret
    )}`,
  }

  await postJSON(
    `${postgrestUrl}/worker`,
    {
      name: "Test Worker",
    },
    headers
  ).catch(async (e) =>
    typeof e.text === "function"
      ? Promise.reject(await e.text())
      : Promise.reject(e)
  )

  // Check against DB, GET endpoint etc...

  await done()
})
```
