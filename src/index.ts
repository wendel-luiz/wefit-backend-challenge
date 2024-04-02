import express from "express"
import cors from "cors"
import { migrateToLatest } from "./database/migrate"
import { personController } from "./config/di-container"
import { errorHandler } from "./middleware/error-handler"

const app = express()

if (Boolean(process.env.FLAG_MIGRATE) === true) {
  migrateToLatest()
}

const port = process.env.PORT || 4568

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/ping", (req, res) => {
  return res.send("pong")
})

app.use("/person", personController.getRouter())

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Escutando porta: ${port}`)
})
