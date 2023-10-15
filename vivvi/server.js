import http from "http"
import color from "picocolors"
import connect from "connect"
import chokidar from "chokidar"
import { WebSocketServer } from "ws"
import { indexHTMLMiddleware, replaceImportMiddleware } from "./middlewares"
import { getRelativePath } from "./utils.js"

const { PORT_HTTP, PROJECT_NAME, PORT_WS } = process.env
const WATCH_LIST = ["index.html", "src/*.js", "src/*.css"]

const createWSServer = () => {
  const server = new WebSocketServer({ port: PORT_WS })

  server.on("connection", (ws) => {
    console.log(color.green("WebSocket Connected"))

    ws.send(
      JSON.stringify({ type: "message", content: `${PROJECT_NAME} Connected!` })
    )

    // watcher
    const watcher = chokidar.watch(WATCH_LIST)
    watcher.on("change", (file) => {
      const msgObj = {
        type: "change",
        file: getRelativePath(file),
      }
      ws.send(JSON.stringify(msgObj))
    })

    ws.on("message", (data) => {
      console.log("Received: %s", data)
    })
  })
}

const middleware = connect()
middleware.use(replaceImportMiddleware)
middleware.use(indexHTMLMiddleware)

function createServer() {
  http.createServer(middleware).listen(PORT_HTTP)

  createWSServer()

  console.log(
    `${color.red(PROJECT_NAME)} server ON! ${color.green(
      `http://localhost:${PORT_HTTP}`
    )}`
  )
}

export { createServer }
