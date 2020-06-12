# Postgrest

Postgrest turns a postgres database into a secure REST API. Many people believe this is a bad idea. This is actually
an amazing idea that removes the need for 90% of backend code.

There are some constraints to make Postgrest systems work well:
* Don't do processing on API endpoints. In a data-driven architecture this is often not a problem, but many developers
who are used to processing on the backend get confused here. Move your processing to 1) external APIs, such as vercel
endpoints 2) to the client or 3) to a queue system that reads from the database.
* Use RLS to make sure data access is secure
