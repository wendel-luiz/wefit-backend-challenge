import express, { Router } from "express"
import { PersonHandler } from "./person.handler"
import { createPersonBodySchema } from "./dtos/create.dto"
import { bodyParser } from "../../middleware/body-parser"

export class PersonController {
  private readonly router: Router

  constructor(private readonly handler: PersonHandler) {
    this.router = express.Router()

    this.router.post(
      "/",
      bodyParser(createPersonBodySchema),
      this.handler.createPerson
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
