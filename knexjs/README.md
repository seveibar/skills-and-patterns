# Knex.js

[Knex.js](http://knexjs.org/) (pronouced KAY-NEX) is an npm module for managing SQL connections. It is simple, uses
modern patterns (promises and chaining) and maps directly to SQL.

```javascript
let conn = await knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password:"",
    database: "mydb"
  }
})

const accounts = await conn("account").select(["account_id", "balance"]).limit(2)
// [
//   { account_id: "ae470e7d-3ebd-4922-a8a2-4c8930e21299", balance: 5.23 },
//   { account_id: "cdf7c712-30a0-4b5a-930a-f0823f97db9e", balance: 204.10 }
// ]

```


## Anti-pattern: ORMs

ORMs do not interface with SQL properly. Don't use them. [[0]](https://blog.codinghorror.com/object-relational-mapping-is-the-vietnam-of-computer-science/)
