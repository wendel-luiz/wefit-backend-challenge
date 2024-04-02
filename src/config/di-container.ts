import { Kysely } from "kysely"
import { PersonRespository } from "../modules/person/person.repository"
import { dialect } from "../database/dialect"
import { Database } from "../database/types"
import { PersonService } from "../modules/person/person.service"
import { PersonHandler } from "../modules/person/person.handler"
import { PersonController } from "../modules/person/person.controller"

const connection = new Kysely<Database>({ dialect: dialect })

const personRepository = new PersonRespository(connection)
const personService = new PersonService(personRepository)
const personHandler = new PersonHandler(personService)
const personController = new PersonController(personHandler)

export { personController }
