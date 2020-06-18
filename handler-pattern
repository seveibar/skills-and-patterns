# Handler Pattern

The handler pattern is a javascript pattern for creating closures or more specifically, functions that execute in
two stages: a setup stage and a usage stage.

When somebody sees "getXXXHandler", they know that the functions they're calling can be treated as a two-stage process,
as illustrated below.

## Usage Example

```javascript
const errorDistance = getErrorDistanceHandler({ type: "pixel-segmentation" })

await errorDistance(image1, image2);
// 0.15

await errorDistance(image2, image3);
// 0.3
```

## Setup Example

```javascript
// Simple Example
const getErrorDistanceHandler = options => (image1, image2) => {
  return computeDistance(image1, image2, options)
}


// Asynchronous Concstruction Example
const getAPIHandler = async ({ authInfo }) => {

  const token = await getToken(authInfo)

  return {
    getPets: async () => {
      return fetch(/* ... */)
    },
    addPet: async () => {
      return fetch(/* ... */)
    }
  }
}
```
