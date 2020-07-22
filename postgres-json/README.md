# Postgres JSON

JSON in postgres is powerful paradigm for having the flexibility of dynamic data structures (json) alongside the efficiency and safety
of static data structures (regular fully-typed schemas).

## Typical Usage and Commands to Know

The arrow operators, like `->` (access key of object) and `->>` (access key of object as text) are used more frequently than any other
functions when handling jsonb data.

```sql
-- Get list of ips
SELECT properties->>'$ip' FROM posthog_event;
```

## Aggregate JSON operators for JSON Inspection / Analysis

[Check out this video where I use jsonb operators on an analytics database](https://www.loom.com/share/f2d81b8b86c0402f9676bc5ab56e7588)

```sql
-- Get all the possible properties keys by looking at 3 events taking all unique keys
SELECT DISTINCT jsonb_object_keys(properties) FROM (SELECT * FROM posthog_event LIMIT 3) pe;
```
