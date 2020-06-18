# Postgres

Postgres is a powerful database, one of the best if not the best SQL database out there. It can emulate all the
functionality of a NoSQL databases with its many JSON features. It's extremely difficult to find a problem that
postgres can't handle.

## Running Postgres

The easiest way to run postgres is with `docker run -e POSTGRES_HOST_AUTH_METHOD=trust --net host -d postgres`.

You won't need a password if you specify `POSTGRES_HOST_AUTH_METHOD`

## Connecting

Install `psql` and connect to your local db with `psql -h localhost -U postgres`. You'll get the command prompt.
You can export the database, investigate, and modify data via this interactive tool.

## Connecting with a GUI

[pgweb](https://github.com/sosedoff/pgweb) is one of the best ways to explore a postgres database.

![pgweb](https://github.com/waoai/skills-and-patterns/blob/master/postgres/pgweb.png?raw=true)


