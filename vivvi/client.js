// deno-lint-ignore-file
const ws = new WebSocket("ws://localhost:9527")

ws.addEventListener("open", ({ target: socket }) => {
  socket.addEventListener("message", ({ data }) => {
    const result = JSON.parse(data)

    switch (result.type) {
      case "message":
        console.log(result.content)
        break
      case "change":
        const { file } = result

        if (file.endsWith(".css")) {
          fetch(file)
            .then((data) => data.text())
            .then((content) => {
              const el = document.querySelector("style#hot")
              if (el) {
                el.textContent = content
              } else {
                const el = document.createElement("style")
                el.id = "hot"
                el.textContent = content
                document.querySelector("head").appendChild(el)
              }
            })
            .catch((err) => console.log(err))
          // 換
        } else {
          window.location.reload()
        }

        break
    }
  })

  socket.addEventListener("close", () => {
    console.log("Closed")
  })
})
