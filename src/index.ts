import express from "express"
import { migrateToLatest } from "./database/migrate"

const app = express()

if (Boolean(process.env.FLAG_MIGRATE) === true) {
  migrateToLatest()
}

const port = process.env.PORT || 4568

app.get("/ping", (req, res) => {
  return res.send("pong")
})

app.listen(port, () => {
  console.log(`Escutando porta: ${port}`)
})
