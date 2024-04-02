import express from "express"
import cors from "cors"
import { migrateToLatest } from "./database/migrate"
import { personController } from "./config/di-container"
import { errorHandler } from "./middleware/error-handler"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../swagger.json"

const app = express()

if (Boolean(process.env.FLAG_MIGRATE) === true) {
  migrateToLatest()
}

const port = process.env.PORT || 4568

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/healthcheck", (_, res) => {
  return res.status(200).send()
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/", personController.getRouter())

app.get("*", function (_, res) {
  res.status(404).json({
    message: "Not found.",
  })
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Escutando porta: ${port}`)
})
