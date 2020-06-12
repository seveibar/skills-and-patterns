# pm2

pm2 is a process manager that makes it very easy to run many node projects simultaneously. This is always used
when Vercel can't be used. You'll know you need pm2 when it takes more than two commands to run a non-vercel project.
If it takes exactly two commands to run a project, use [concurrently](https://www.npmjs.com/package/concurrently).

## Example ecosystem.yaml

```yaml
# ecosystem.yaml
apps:
  - name: gui
    script: npm
    args: run start
    autorestart: true
    watch: false
    cwd: packages/gui

  - name: instance-controller
    script: npm
    args: run start
    autorestart: true
    watch: packages/instance-controller
    cwd: packages/instance-controller

  - name: database
    script: npm
    args: run start:prod
    autorestart: false
    watch: false
    cwd: packages/database

  - name: database-rest-api
    script: npm
    args: run start
    autorestart: true
    watch: false
    cwd: packages/database-rest-api

```
