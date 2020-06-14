# ngrok

[ngrok](https://ngrok.com/) is a way of sharing ports on a computer with the outside world. It's very useful in a variety of
scenarios where your local web server needs to be accessible to a colleague, or for making a remote server's service accessible
to yourself.

## Basic Usage

```
  Reverse proxy that creates a secure tunnel from a public endpoint to a locally running web service.
  More information: https://ngrok.com.

  - Expose a local HTTP service on a given port:
    ngrok http 80

  - Expose a local HTTP service on a specific host:
    ngrok http foo.dev:80

  - Expose a local HTTPS server:
    ngrok http https://localhost

  - Expose TCP traffic on a given port:
    ngrok tcp 22

  - Expose TLS traffic for a specific host and port:
    ngrok tls -hostname=foo.com 443
```
