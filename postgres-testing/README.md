# Postgres Testing

Many times you'll need to write tests against a database, or test an app that uses a database. This pattern
allows you to do that easily.

> Note: a single postgres container can have thousands of databases. When we say database, we mean a postgres
> database that may be alongside hundreds of others in a single docker container.

How this is done is in three steps:
1. Create and connect to new database with a random name
2. Create your app's schema in the database and optionally seed
3. Run your test

Here is the code, split across 2 files. The `fixture.js` can be reused across tests, `mytest.test.js` is your
test file.

```javascript
// fixture.js

const knex = require("knex")
const fs = require("fs")
const path = require("path")

let db

const getConnection = dbName => {
  return knex({
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "",
      database: dbName
    },
    acquireConnectionTimeout: 1000
  })
}

module.exports = async ({seed} = {}) => {
  const tempConn = getConnection("postgres")
  let dbName = `testdb_${Math.random()
    .toString(36)
    .slice(2, 8)}`
  await tempConn.raw(`CREATE DATABASE ${dbName}`)
  process.env.POSTGRES_DATABASE = dbName
  await tempConn.destroy()
  if (db) return db
  db = getConnection()
  await db.raw("SELECT 1+1").timeout(500)
  await db.raw(
    fs.readFileSync(path.join(__dirname, "/path/to/migrate.sql")).toString()
  )
  if (seed) {
    await db.raw(
      fs.readFileSync(path.join(__dirname, "/path/to/seed.sql")).toString()
    )
  }
  return db
}


// mytest.test.js
const test = require("ava")
const getDB = require("./fixture.js")

test("test something with the database", async () => {
  const db = await getDB({seed: true});
  // I now have a setup copy of the database
  // I can run my app with the database, run tests etc.
})

```
