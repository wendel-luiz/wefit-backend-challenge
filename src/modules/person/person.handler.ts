import { RequestHandler } from "express"
import { PersonService } from "./person.service"
import { DeletePersonParams } from "./dtos/delete-person.dto"
import { UpdatePerson, UpdatePersonParams } from "./dtos/update-person.dto"
import { CreatePersonBody } from "./dtos/create-person.dto"
import { GetManyPersonsQuery } from "./dtos/get-many-person.dto"
import { GetOnePersonParams } from "./dtos/get-one-person.dto"

export class PersonHandler {
  constructor(private readonly service: PersonService) {}

  public createPerson: RequestHandler<
    unknown,
    unknown,
    CreatePersonBody,
    unknown
  > = (req, res, next) => {
    this.service
      .create(req.body)
      .then((result) =>
        res
          .status(201)
          .setHeader("Location", "/" + result.id)
          .json(result)
      )
      .catch((err) => next(err))
  }

  public getPersonById: RequestHandler<
    GetOnePersonParams,
    unknown,
    unknown,
    unknown
  > = (req, res, next) => {
    this.service
      .getById({ personId: req.params.personId })
      .then((result) =>
        res
          .status(200)
          .setHeader("Location", "/" + result.id)
          .json(result)
      )
      .catch((err) => next(err))
  }

  public getManyPersons: RequestHandler<
    unknown,
    unknown,
    unknown,
    GetManyPersonsQuery
  > = (req, res, next) => {
    this.service
      .getMany(req.query)
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
      .deletePersonById({ personId: req.params.personId })
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
      .updatePerson({ ...req.body, personId: req.params.personId })
      .then((result) =>
        res
          .status(200)
          .setHeader("Location", "/" + result.id)
          .json(result)
      )
      .catch((err) => next(err))
  }
}
