import express, { Router } from "express"
import { PersonHandler } from "./person.handler"
import { createPersonBodySchema } from "./dtos/create-person.dto"
import { bodyParser } from "../../middleware/body-parser"
import { updatePersonBodySchema } from "./dtos/update-person.dto"
import { queryParser } from "../../middleware/query-parser"
import { getManyPersonsQuerySchema } from "./dtos/get-many-person.dto"

export class PersonController {
  private readonly router: Router

  constructor(private readonly handler: PersonHandler) {
    this.router = express.Router()

    this.router.post(
      "/",
      bodyParser(createPersonBodySchema),
      this.handler.createPerson
    )

    this.router.get(
      "/all",
      queryParser(getManyPersonsQuerySchema),
      this.handler.getManyPersons
    )

    this.router.get("/:personId", this.handler.getPersonById)

    this.router.delete("/:personId", this.handler.deletePersonById)

    this.router.patch(
      "/:personId",
      bodyParser(updatePersonBodySchema),
      this.handler.updatePersonById
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
