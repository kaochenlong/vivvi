import has from "lodash-es/has.js"
import join from "lodash-es/join.js"
import day from "dayjs"
import { echo } from "./hi.js"

echo("Vite 原始碼解讀 :)")
console.log(has)
console.log(join)
console.log(day)

// update timer
const timer = document.querySelector("#timer")
if (timer) {
  timer.textContent = Date.now()
}
