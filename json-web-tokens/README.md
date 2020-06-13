# JSON Web Tokens

JSON Web Tokens or JWTs are a convenient and standardized method for storing session information. They should be used
whenever there is a browser session and a login. They are automatically created and stored when Auth0 is used. They
also interface nicely with [postgrest](../postgrest/README.md).

> You may have heard JWTs are bad or insecure. This is wrong. JWTs, like any session storage mechanism, are insecure
> if you use them in an insecure way.

## Using JWTs in Server Side Javascript

When you're using a JWT on a server, there are two methods to verify that a JWT is signed (authorized).
* Using a **public key** *(Can verify signage, but not issue new JWTs. Used with Auth0)*
* Using a **JWT_SECRET** *(Can verify signage AND issue new JWTs)*

Consider the following typical example:

```javascript
const jwt = require("jsonwebtoken")

const { JWT_SECRET } = process.env

module.exports = (req, res) => {
  const authHeader = req.headers["Authorization"].split(" ")
  if (authHeader[0] !== "Bearer") return res.end("No Authorization header")
  
  const token = authHeader[1]
  if (jwt.verify(token, JWT_SECRET)) {
    res.end("You have access to this endpoint!")
  } else {
    res.end("Who are you?!?")
  }
}
```

## Resources

* [Official JWT Introduction](https://jwt.io/introduction/)
