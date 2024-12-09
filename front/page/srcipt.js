// Import stylesheets
import { marked } from "marked"
import markedAdmonition from "marked-admonition-extension"

// console.log(markedAdmonition);
// custom tag name and class name (note: only version greater than v0.0.2 support)
// setConfig({
//   nodeName: 'details',
//   className: 'admonition',
//   title: { nodeName: 'summary' },
// });

marked.use(markedAdmonition)
import "./style.css"
import "marked-admonition-extension/dist/index.css"

const types = [
  "abstract",
  "attention",
  "bug",
  "caution",
  "danger",
  "error",
  "example",
  "failure",
  "hint",
  "info",
  "note",
  "question",
  "quote",
  "success",
  "tip",
  "warning"
]

const content = types
  .map(name => {
    return `!!! ${name} this is a \`${name}\` type admonition\nThe warning above was a \`${name}\` type admonition\n!!!`
  })
  .join("\n\n")
// Write TypeScript code!
const appDiv = document.getElementById("app")
appDiv.innerHTML = `<h1>demos for marked extension</h1>
<h2>markdown content</h2>
<div><textarea rows="20" readonly>${content}</textarea></div>
<div>
<h2>preview</h2>
${marked.parse(content)}
</div>
`
