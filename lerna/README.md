# Lerna

Lerna is a way of organizing many subprojects in a single repository. It is used by large open-source projects
and should be used whenever a project has more than 2 subprojects.

Note that lerna is often accompanied by [pm2](../pm2/README.md).

Structure of an example lerna project:

```javascript
├── packages             // Each project in the packages directory has a package.json
│   ├── app
│   ├── billing-api
|   ├── postgrest-api
│   ├── database
│   └── reverse-proxy
├── lerna.json
├── README.md
└── package.json
```
