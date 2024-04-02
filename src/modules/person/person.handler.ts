import { RequestHandler } from "express"
import { PersonService } from "./person.service"
import { CreatePerson } from "./dtos/create.dto"
import { GetOneParams } from "./dtos/get-one"

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

  public getPersonById: RequestHandler<
    GetOneParams,
    unknown,
    unknown,
    unknown
  > = (req, res, next) => {
    this.service
      .getById(req.params.personId)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err))
  }
}
