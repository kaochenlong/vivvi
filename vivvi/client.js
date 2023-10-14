const ws = new WebSocket("ws://localhost:9527")

ws.addEventListener("open", ({ target: socket }) => {
  socket.addEventListener("message", ({ data }) => {
    console.log(data)
  })

  socket.addEventListener("close", () => {
    console.log("Closed")
  })
})
