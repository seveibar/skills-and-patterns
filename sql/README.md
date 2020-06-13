# SQL

Postgres SQL is incredibly powerful and enabling language for building scalable database systems. This can
be further broken down into 5 main subskills:

1. Querying
2. Database Schema Creation
3. [Row Level Security](../row-level-security/README.md)
4. PL/pgSQL (a Postgresql dialect for writing functions)
5. Avoiding SQL Anti-Patterns

Many developers nowadays don't know SQL, this is unfortunate because it is a very small language and most of\
the databases and systems of the world are built on SQL. [Here is a good set of courses to gain initial familiarity](https://pgexercises.com/). *Many people believe that NoSQL will replaced SQL. [This is wrong.](https://trends.google.com/trends/explore?date=today%205-y&q=nosql,sql) Even things like GraphQL require that
you define SQL Schemas.*

## Querying

The statements for querying are `SELECT`, `UPDATE`, `DELETE`

### Anti-pattern: Long, nested subqueries

Subqueries can make things very difficult to read. If you have more than one nested subsquery, you might
want to consider creating a `VIEW` that simplifies the query in the database schema.

## Database Schema Creation

Schema creation is just creating all the tables that make up your database. This means defining a bunch
of tables and their types, and thinking deeply about the application's domain to guess which fields will
be necessary. Don't draw diagrams for this, your schema should never be that complicated (if you find
your schema needs over 10 tables, the scope of the application is too large).

Usually you'll also define basic indexes when creating your tables. An index is a way of telling the
database that a column of the table may be used for querying. Most indexes are automatic, and nothing
needs to be done.

Here's an example of a table:

```sql
CREATE TABLE platform.account (
  account_id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  account_num serial,
  auth_id text NOT NULL UNIQUE,
  username text NOT NULL UNIQUE,
  dashboard_settings jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE INDEX auth_id_idx ON platform.account (auth_id);
```

### Standarized Id Format

Always define a tables id with a name `<table name>_id` a default of `gen_random_uuid()`.

### Optional serial number

It can be useful to attach a serial number column to a column. These are often used as administrative
references, because UUIDs are hard to reference verbally or in messages.

### Good Table Names

* All lowercase
* Never plural

### Good Column Names

* All lowercase
* Each word separated by underscores (except for blessed names: `username`, `nickname`, `password`)
* Can be plural

### Views

Postgres allows you to create VIEWs, which are queries that pretend to be tables. This is helpful for
simplifying SELECT queries. Here is an example of a view:

```sql
CREATE VIEW platform_api.payment_method AS
  SELECT
    payment_method_id,
    team_id,
    created_by,
    nickname,
    is_default,
    payment_method_type,
    (
      SELECT COALESCE(SUM(amount), 0) FROM platform.deposit
        WHERE deposit.payment_method_id=payment_method.payment_method_id
    ) total_spent,
    created_at
  FROM
    platform.payment_method
  WHERE archived = FALSE;
```

### Anti-pattern: Missing `created_at`

Every table should have `created_at`, which is usually set to the following:

```sql
created_at timestamptz NOT NULL DEFAULT current_timestamp
```

### Anti-pattern: Using anything except timestamptz for time

Never use anything except `timestamptz` for tracking time.

## [Row Level Security](../row-level-security/README.md)

## PL/pgSQL

This [well-documented](https://www.postgresql.org/docs/9.2/plpgsql-overview.html) mini language has simple
syntax for basic business logic. Look at the example below. Here are some things that often confuse devs
who are new to plpgsql:

* There are "Dollar-Quoted String Constants" in SQL. This is used to nest string identifiers (in other languages,
  quotes `"` or single apostrophes `'`) inside of eachother. So `$SOMESTRING$hello world$SOMESTRING$` is just the
  same as `'hello world'`. There are good reasons for doing this, because SQL strings can also have a language
  associated with them, be very long, and have nested dollar-quoted strings. In the example below, we're creating
  a string across multiple lines called "BODY" and saying that it is written in the language plpgsql.
* Variables in the function are DECLARE'd at the top
* BEGIN and END mark the beginning and end of the main body of the function

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

## Avoiding SQL Anti-Patterns

It takes many many years to naturally learn SQL Anti-patterns because schemas are designed so infrequently
and almost never rewritten. This means that devs don't have the opportunity to experiment with schemas and
find the best options. So, to avoid SQL Anti-patterns, you have to read or get insight from someone who
has read "SQL Anti-Patterns".
