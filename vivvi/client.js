const ws = new WebSocket("ws://localhost:9527")

ws.addEventListener("open", ({ target: s }) => {
  s.addEventListener("message", ({ data }) => {
    console.log(data)
  })

  s.addEventListener("close", () => {
    console.log("Closed")
  })
})
