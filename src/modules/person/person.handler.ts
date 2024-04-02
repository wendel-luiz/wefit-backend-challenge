import { RequestHandler } from "express"
import { PersonService } from "./person.service"
import { CreatePerson } from "./dtos/create.dto"
import { GetOneParams } from "./dtos/get-one.dto"
import { DeletePersonParams } from "./dtos/delete-person.dto"
import { UpdatePerson, UpdatePersonParams } from "./dtos/update-person.dto"

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

  public deletePersonById: RequestHandler<
    DeletePersonParams,
    unknown,
    unknown,
    unknown
  > = (req, res, next) => {
    this.service
      .deletePersonById(req.params.personId)
      .then(() => res.status(204).send())
      .catch((err) => next(err))
  }

  public updatePersonById: RequestHandler<
    UpdatePersonParams,
    unknown,
    UpdatePerson,
    unknown
  > = (req, res, next) => {
    this.service
      .updatePerson(req.params.personId, req.body)
      .then((response) => res.status(200).json(response))
      .catch((err) => next(err))
  }
}
