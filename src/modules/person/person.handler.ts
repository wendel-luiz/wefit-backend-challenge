import { RequestHandler } from "express"
import { PersonService } from "./person.service"
import { CreatePerson } from "./dtos/create.dto"

export class PersonHandler {
  constructor(private readonly service: PersonService) {}

  public createPerson: RequestHandler<unknown, unknown, CreatePerson, unknown> =
    (req, res, next) => {
      this.service
        .create(req.body)
        .then((result) =>
          res
            .status(201)
            .setHeader("Location", "/role/" + result.id)
            .json(result)
        )
        .catch((err) => next(err))
    }
}
