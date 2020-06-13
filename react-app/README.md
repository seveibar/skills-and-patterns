# React Application Architecture

React Applications are user-facing applications (usually not libraries) that may interact with a server. They should be
bootstrapped with [create-react-app](https://github.com/facebook/create-react-app) and [React Storybook](../react-storybook).

The architecture looks like this:

```python
README.md
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── components       # Contains all React Components
    │   └── SomeComponent
    |       ├── index.js
    |       └── index.story.js
    ├── lib              # Contains shared hooks or shared javascript methods
        └── hooks
    ├── App.css          # Sets basic CSS for application
    ├── App.js           #
    └── index.js         # Called when application starts
```
