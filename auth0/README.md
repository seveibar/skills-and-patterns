# Auth0

Auth0 provides authentication services for all products. It's provides an API and stores all the user passwords.

When using Auth0, it will prove that a user owns an email, but don't use it for anything else. Maintain usernames,
emails and all non-password or authentication information in the database (Auth0 will have a copy, but we ignore
its copy).
