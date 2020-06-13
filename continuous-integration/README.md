# Continuous Integration

Continuous integration tests are done using Github Actions.

> Sometimes, in addition to Github Actions, Cypress.io will run some tests or a deployment will automatically be created on vercel.com

## Basic Setup

Create a file `.github/workflows/test.yml` with this content:

```yaml
name: Test
on: ["push", "pull_request"]
jobs:
  test:
    if: "!contains(github.event.head_commit.message, 'skip ci')"
    name: Test
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout
        uses: actions/checkout@v1
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: Run Prettier Test
        run: npx prettier --check "src/**/*.js"
      - name: Run NPM Tests
        run: npm install && npm run test
```
