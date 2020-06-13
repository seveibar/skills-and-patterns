# Stupid Simple Migrations

The simplest possible migrations scheme is running a sequence of SQL scripts for each version of the database.

So when structuring a project, you'll want to create a `database` subproject that looks like the following:

```javascript
├── migrations
|   ├── build-migration.js   // collects all SQL files together and creates migrate.sql
|   ├── v01.sql              // First migration to be run (original schema)
|   └── v02.sql              // Migration that alters v01 schema
├── tests                    // Tests to run against database
├── index.js                 // A helper for connecting to the database
├── seed.js                  // Exposes a function that seeds the database
├── migrate.sql              // Generated-and-committed file that holds all migrations
└── package.json             // Contains scripts for running database operations
```

> A lot of this functionality is in https://github.com/seveibar/qspg/, so this documentation will be simplified in
> near future.

## package.json

There are many helpful development scripts within the package.json

```javascript
{
  "name": "@wao/some-database",
  "version": "0.0.0",
  "main": "index.js",
  "scripts": {
    "build": "node ./migrations/build-migration",
    "test": "npm run build && ava tests/**.js",
    "start": "node migrate.js",
    "start:postgres": "docker run --net host -it postgres -E",
    "drop": "psql -h localhost -U postgres -c 'DROP DATABASE mydbname' || exit 0",
    "init:dev": "npm run create && npm run migrate && npm run seed",
    "create": "psql -h localhost -U postgres -c 'CREATE DATABASE mydbname'",
    "migrate": "psql -h localhost -U postgres -d mydbname -f migrate.sql",
    "seed": "psql -h localhost -U postgres -d mydbname -f seed.sql",
    "reset": "npm run build && npm run drop && npm run create && npm run migrate && npm run seed"
  },
  // ...
}

```

## build-migration.js

The build migration combines all the migration files into `migrate.sql`. It does this in such a way that
once a migration is run, it will never be rerun.

```javascript
const template = versions =>
  `
-- ---------------------- --
-- THIS FILE IS GENERATED --
-- DO NOT EDIT            --
-- ---------------------- --

DO $MAIN$
DECLARE
    db_version integer;
BEGIN
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS "metakeystore" (
    key_id character varying(255) PRIMARY KEY,
    integer_value integer,
    string_value character varying(255)
);

IF NOT EXISTS (SELECT 1 FROM metakeystore WHERE key_id='db_version') THEN
    RAISE NOTICE 'Setting db_version to 0';
    INSERT INTO metakeystore (key_id, integer_value) VALUES ('db_version', 0);
END IF;

db_version := (SELECT integer_value FROM metakeystore WHERE key_id='db_version');

RAISE NOTICE 'DATABASE VERSION = %', db_version;

${versions
    .map(
      (sql, i) =>
        `-- --------------------------------------------
-- VERSION ${i + 1}
-- --------------------------------------------

IF (db_version=${i}) THEN
    RAISE NOTICE 'Migrating db_version to ${i + 1}';

    ${sql}

    UPDATE metakeystore SET integer_value=${i + 1} WHERE key_id='db_version';
    db_version := (SELECT integer_value FROM metakeystore WHERE key_id='db_version');
END IF;

`
    )
    .join("")}

END
$MAIN$ LANGUAGE plpgsql;`.trim()

const fs = require("fs")
const path = require("path")

const versions = fs
  .readdirSync(__dirname)
  .filter(n => n.endsWith(".sql"))
  .sort()
  .map(n => fs.readFileSync(path.join(__dirname, n)))

fs.writeFileSync(path.join(__dirname, "../migrate.sql"), template(versions))
```

## example.test.js

```javascript
var test = require("ava")
var getDB = require("../").default

test.serial("connect and disconnect", async t => {
  t.plan(1)
  const db = await getDB({ seed: true, testMode: true })

  await db.destroy()
  t.pass("should destroy connection")
})
```

## index.js

> Note: Needs update to remove import keyword (use babel raw macro)

```javascript
// @flow

import knex from "knex"
import migrationSQL from "./migrate.sql"
import seedSQL from "./seed.sql"

const getConnectionInfo = (database, user) => ({
  host: process.env.POSTGRES_HOST || "localhost",
  user: user || process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASS || "",
  database
})

const createDatabase = async dbName => {
  try {
    let conn = await knex({
      client: "pg",
      connection: getConnectionInfo("postgres")
    })
    await conn.raw(`CREATE DATABASE ${dbName}`)
    await conn.destroy()
  } catch (e) {}
}

const deleteDatabase = async dbName => {
  try {
    let conn = await knex({
      client: "pg",
      connection: getConnectionInfo("postgres")
    })
    await conn.raw(`DROP DATABASE ${dbName}`)
    await conn.destroy()
  } catch (e) {}
}

export default async ({ seed, testMode, user } = {}) => {
  testMode =
    testMode === undefined ? Boolean(process.env.USE_TEST_DB) : testMode

  const dbName = !testMode
    ? process.env.POSTGRES_DB || "traininghub"
    : `testdb_${Math.random()
        .toString(36)
        .slice(7)}`

  if (testMode)
    console.log(`\n---\nUsing Test DB: ${dbName}, User: ${user || "none"}\n---`)

  await createDatabase(dbName)

  let pg = knex({
    client: "pg",
    connection: getConnectionInfo(dbName)
  })

  // test connection
  try {
    await pg.raw("select 1+1 as result")
  } catch (e) {
    throw new Error("Could not connect to database\n\n" + e.toString())
  }

  // upload migration
  await pg.raw(migrationSQL)

  if (seed) await pg.raw(seedSQL)

  if (user) {
    await pg.destroy()
    pg = knex({ client: "pg", connection: getConnectionInfo(dbName) })
    await pg.raw(`SET ROLE ${user};`)
    // test connection
    try {
      await pg.raw("select 1+1 as result")
    } catch (e) {
      throw new Error(
        `Could not connect to database as "${user}"\n\n${e.toString()}`
      )
    }
  }

  // override pg.destroy so we can delete the test database
  const _destroy = pg.destroy
  pg.destroy = async () => {
    await _destroy()
    if (testMode) await deleteDatabase(dbName)
  }

  return pg
}
```
