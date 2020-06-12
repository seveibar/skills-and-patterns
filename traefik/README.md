# Traefik

Traefik is a reverse proxy similar to nginx. Traefik should be prefered because it has modern features and
easier-to-understand configs. Traefik also automatically does https, which is very nice.

There are many, many ways to configure Traefik. Always prefer the file configuration style, demonstrated
below.


## Configuring

You will need two files

## Local vs Production Architecture

An application should never run locally with https. Always create a traefik configuration for http, then
an independent traefik configuration for https (yes, run two instances of traefik). Each traefik configuration
will have it's own static and dynamic configuration files. The https traefik instance simply directly all traefik
to the http traefik instance.

Similarly, the docker container that runs a project should never configure https.

This keeps https configuration simple.

### Example HTTP Traefik Configuration

```javascript
// package.json
{
  "name": "reverse-proxy",
  "scripts": {
    "start": "traefik --configfile ./static-config.yaml"
  }
}
```

```yaml
# static-config.yaml
entryPoints:
  web:
    address: :9123

log:
  level: DEBUG

api:
  dashboard: true
  insecure: true

providers:
  file:
    watch: true
    filename: "dynamic-config.yaml"

# dynamic-config.yaml
http:
  routers:
    to-gui:
      service: gui
      rule: "PathPrefix(`/`)"
    to-database-rest-api:
      rule: "PathPrefix(`/api/db`)"
      middlewares: ["strip-first-prefix"]
      service: database-rest-api

  middlewares:
    strip-first-prefix:
      stripPrefix:
        prefixes:
          - /api/db

  services:
    gui:
      loadBalancer:
        servers:
          - url: "http://localhost:9100"
    database-rest-api:
      loadBalancer:
        servers:
          - url: "http://localhost:9102"
```
