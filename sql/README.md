# SQL

Postgres SQL is incredibly powerful and enabling language for building scalable database systems. This can
be further broken down into 5 main skills:

1. Querying
2. Database Schema Creation
3. [Row Level Security](../row-level-security/README.md)
4. PL/pgSQL (a Postgresql dialect for writing functions)
5. Avoiding SQL Anti-Patterns

## Database Schema Creation

## Querying

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
