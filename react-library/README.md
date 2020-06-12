# React Library

Publish React Libraries for small contained groups of components that are reused across other libraries or
apps.

A React Library should be bootstrapped the same way as a react app, with both `create-react-app` and `storybook`.

```bash
npx create-react-app .
npx @storybook/cli init
```

The tree should be changed to reflect that there is no application (remove public directory, App.js etc.)

```
README.md
└── src
    ├── index.js
    └── SomeComponent
        ├── index.js
        └── index.story.js
    └── lib              # Contains shared hooks or shared javascript methods
        └── hooks
```

## Developing

Run a storybook to develop the library with `yarn storybook`.

## Building

Add a the following scripts to the `package.json` file:

```
{
  "scripts": {
    // ...
    "build": "npm run build:babel && cp ./package.json ./dist/package.json && cp ./README.md ./dist/README.md",    
    "build:babel": "NODE_ENV=production babel ./src --ignore \"src/**/*.story.js\" --out-dir=./dist && rm dist/index.js && cp dist/lib.js dist/index.js",
    "release": "npm run build && cd dist && npm publish",
  }
}
```

Your project files will be transpiled and published when you run `yarn release` (or `npm run release`).

## Continuous Deployment/Release

For a module that is updated more than a couple of times a month, there should be an automatic release whenever
someone pushes code (or merges a PR). This is done with Github Actions.

### Step 1: Install @semantic-release

```bash
yarn add --dev @semantic-release/git
```

### Step 2: Create a `.releaserc.js` at the top of the repository and add the following content:

```javascript
module.exports = {
  branch: "master",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/npm", { npmPublish: false }],
    ["@semantic-release/npm", { npmPublish: true, pkgRoot: "dist" }],
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: ["package.json"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
}
```

### Step 3: Create Github Action

```yaml
# Inside of .github/workflows/release.yml (create directories if they don't exist)

name: Release
on:
  push:
    branches:
      - master
jobs:
  release:
    if: "!contains(github.event.head_commit.message, 'skip ci')"
    name: Release
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout
        uses: actions/checkout@v1
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: Install dependencies
        run: npm install
      - name: Build NPM package
        run: npm run build
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.RELEASE_GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
      - name: Publish github pages
        run: |
          git remote set-url origin https://git:${GITHUB_TOKEN}@github.com/UniversalDataTool/universal-data-tool.git
          npm run gh-pages -- -u "github-actions-bot <support+actions@github.com>"
        env:
          GITHUB_TOKEN: ${{ secrets.RELEASE_GITHUB_TOKEN }}
```

### Step 4: Set up GITHUB_TOKEN and NPM_TOKEN in your repository secrets

Your GITHUB_TOKEN is a personal or repository token.

Your NPM_TOKEN can be found in your `~/.npmcrc`

## Anti-pattern: Dependencies instead of Dev Dependencies

Make sure you add dependencies appropriately, if the project importing your library doesn't
need a dependency, it should be installed with `yarn add --dev <dependency>` and should NOT
appear in the `package.json` `dependencies` list.
