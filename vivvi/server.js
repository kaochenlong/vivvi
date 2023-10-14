import http from "http"
import color from "picocolors"
import connect from "connect"
import { WebSocketServer } from "ws"
import { indexHTMLMiddleware, replaceImportMiddleware } from "./middlewares"

const { PORT_HTTP, PROJECT_NAME, PORT_WS } = process.env

const createWSServer = () => {
  const server = new WebSocketServer({ port: PORT_WS })

  server.on("connection", (ws) => {
    console.log(color.green("WebSocket Connected"))

    ws.send(`${PROJECT_NAME} Connected!`)

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
