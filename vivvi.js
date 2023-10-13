import http from "http"
import color from "picocolors"

const { PORT_HTTP, PROJECT_NAME } = process.env

http
  .createServer((req, res) => {
    res.end("hi")
  })
  .listen(PORT_HTTP)

console.log(
  `${color.red(PROJECT_NAME)} server ON! ${color.green(
    `http://localhost:${PORT_HTTP}`
  )}`
)
