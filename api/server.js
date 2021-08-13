const fs = require("fs")
const { send } = require("micro")
const path = require("path")
var hljs = require("highlight.js")
const md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: false,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        )
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + str + "</code></pre>"
  },
})

const itemNames = fs
  .readdirSync(".")
  .filter((a) => !a.includes("."))
  .filter((a) => a !== "node_modules" && a !== "api")

const render = (item) => {
  return `<html>
    <head>
      <style>
        @import url('https://rsms.me/inter/inter.css');
        html { font-family: 'Inter', sans-serif; }
        @supports (font-variation-settings: normal) {
          html { font-family: 'Inter var', sans-serif; }
        }
        h1 {
          background-color: #eee;
          padding: 40px;
        }
        h2 {
          margin-top: 40px;
          padding-left: 8px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 4px;
        }
        h3 {
          font-style: italic;
          padding-left: 30px;
          color: #333;
          margin-top: 20px;
        }
        ul, ol, pre, p {
          margin-left: 30px;
        }
        pre {
          border: 1px solid #ddd;
        }
        blockquote {
          margin-top: 20px;
          background-color: #eee;
          border: 1px solid #ddd;
          color: #333;
          font-style: italic;
          padding: 10px;
        }
      </style>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/styles/default.min.css">
      <meta charset="utf-8">
    </head>
    <body>
      <a style="color: #2196f3" href="/">seve's skills and patterns</a> &middot;
      <a style="color: #2196f3" href="https://github.com/seveibar/skills-and-patterns/tree/master/${item}">source for this file</a>
      <br/><br/>
      ${md.render(
        fs
          .readFileSync(
            path.join(
              __dirname,
              "..",
              item === "README.md" ? "README.md" : `./${item}/README.md`
            )
          )
          .toString()
      )}
      <h3 style="margin-top: 100px">All Patterns:</h3>
      <div style="padding: 30px">
        ${itemNames
          .map(
            (item) =>
              `<div style="display: inline-block; margin: 8px;"><a href="/${item}">${item}</a></div>`
          )
          .join("\n")}
      </div>
    </body>
  </html>`
}

module.exports = (req, res) => {
  if (req.url.split("/").length > 2)
    return send(res, 200, fs.readFileSync(req.url.slice(1)))
  const searchString = req.url.split("/")[1]
  if (!searchString || searchString.toLowerCase() === "README")
    return send(res, 200, render("README.md"))

  let item = itemNames.find((name) => name.startsWith(searchString))
  if (!item) item = itemNames.find((name) => name.includes(searchString))
  if (!item) return send(res, 200, render("README.md"))
  send(res, 200, render(item))
}
