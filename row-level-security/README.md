# Row Level Security

Row level security (RLS) is a powerful postgres feature that allows you to prevent access to tables or information for
users who don't meet conditions. With row level security and postgrest, you do not need to write any backend code
for most applications.

## Short Introduction

This is the most basic example of row level security. In this example, we'll use the name of the user currently accessing
the system to restrict them to only view their account in the accounts table.

```sql
CREATE TABLE accounts (manager text, company text, contact_email text);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY account_managers ON accounts TO managers
    USING (manager = current_user);
```

If we now do `SELECT * FROM accounts`, we will only see our account. If there are any tables joined to accounts, postgres
will automatically remove rows from the result that access any other account.

In practice, we never use `current_user` to determine who has access. Instead, we use things like JWT. You can use any
expression in the "USING" portion of the policy. Here's another example that uses a method `apikey()` to check if a
user has access.

```sql
CREATE POLICY api_team_access ON platform.team FOR ALL TO api_user
  USING (
    platform.team.team_id IN (
      SELECT team_id FROM hub.api_key
      WHERE key_string=apikey()
    )
  );
```

This `apikey` method could be defined as follows:

```sql
CREATE FUNCTION apikey() RETURNS text as $BODY$
  DECLARE key text;
  BEGIN
    key := COALESCE(
      current_setting('request.header.X-Consumer-Custom-Id', 't'),
      current_setting('request.header.apikey', 't')
    );
    IF key IS NULL THEN
      RAISE EXCEPTION 'Must provide API key. Use the "apikey" header.';
    END IF;
    RETURN key;
  END
$BODY$ LANGUAGE plpgsql;
```

## Writing Tests for RLS

Every RLS will have a test associated with it from whatever system tests the database schema. The tests look sort
of like this:

```javascript
test("files should only be accessible to requestor's team using platform token", async t => {
  t.plan(2)
  const db = await getDB({
    seed: true,
    user: "postgres" // connect as admin user (who is not subject to RLS)
  })

  await db("hub.file").insert({
    team_id: db("hub.api_key")
      .where("key_string", "KEY")
      .select("team_id"),
    description: "file for team 1",
  })

  await db("hub.file").insert({
    team_id: db("hub.api_key")
      .where("key_string", "KEY2")
      .select("team_id"),
    description: "file for team 2",
  })

  // switch from admin postgres user to RLS postgres user
  await db.raw("SET ROLE platform_user")
  
  // set access key to team1 user access key
  await db.raw("SELECT set_config('request.jwt.claim.sub', 'team1_user', FALSE);")

  const myFiles = await db("platform_api.file").select("*")
  
  // make sure user can only access the one file in their account, and not any others
  t.assert(myFiles.length === 1)
  t.assert(myFiles[0].description === "file for team 1")
})

```

## Resources

* [Great Postgres Introduction](https://www.postgresql.org/docs/9.5/ddl-rowsecurity.html)
