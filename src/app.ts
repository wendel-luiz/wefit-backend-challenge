import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../swagger.json"
import { errorHandler } from "./middleware/error-handler"
import { migrateToLatest } from "./database/migrate"
import { Kysely } from "kysely"
import { Database } from "./database/types"
import { PersonController } from "./modules/person/person.controller"
import { Logger } from "./lib/logger"
import { logRequest } from "./middleware/log"

export class App {
  private readonly app: express.Application

  constructor(
    private readonly personController: PersonController,
    private readonly dbConnection: Kysely<Database>
  ) {
    this.app = express()
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(logRequest)

    this.app.get("/healthcheck", (_, res) => {
      return res.status(200).send()
    })

    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    this.app.use("/", this.personController.getRouter())

    this.app.get("*", function (_, res) {
      res.status(404).json({
        message: "Not found.",
      })
    })

    this.app.use(errorHandler)
  }

  private cleanup(): void {
    this.dbConnection
      .destroy()
      .then(() => Logger.info("Db connection closed"))
      .catch((reason) =>
        Logger.warn("Error destroying db connection: " + reason.toString())
      )
      .finally(() => process.exit)
  }

  async start(): Promise<void> {
    console.log("Migration")
    if (process.env.FLAG_MIGRATE === "true") {
      Logger.info("Starting db migration...")
      await migrateToLatest()
      Logger.info("Migration completed.")
    }

    this.app.listen(process.env.PORT, () => {
      Logger.info(`Listening on port: ${process.env.PORT}`)
    })

    process.on("SIGTERM", this.cleanup)
    process.on("SIGINT", this.cleanup)
  }
}
