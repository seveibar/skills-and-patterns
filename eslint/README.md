# eslint

eslint is a utility for verifying that javascript does not contain anti-patterns.

You should have eslint installed globally (`npm install -g eslint`) and have it run in your ide automatically.

We use the `react-app` eslint config, although this will probably change because this config has
some minor issues with `useEffect`.

## Adding 


```javascript
// ...
  "eslintConfig": {
    "extends": "react-app"
  },
// ...
```
