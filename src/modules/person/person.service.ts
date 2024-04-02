import { randomUUID } from "crypto"
import { PersonRespository } from "./person.repository"
import { NotFoundException } from "../../lib/exceptions"
import { personResponse, PersonResponse } from "./utils/build-response.util"
import { UpdatePersonProps } from "./dtos/update-person.dto"
import { CreatePersonProps } from "./dtos/create-person.dto"
import {
  GetManyPersonsProps,
  GetManyPersonsResponse,
} from "./dtos/get-many-person.dto"
import { GetOnePersonProps } from "./dtos/get-one-person.dto"
import { DeletePersonProps } from "./dtos/delete-person.dto"

export class PersonService {
  constructor(private readonly personRepository: PersonRespository) {}

  async create(props: CreatePersonProps): Promise<PersonResponse> {
    const person = await this.personRepository.insert({
      ...props,
      uuid: randomUUID(),
    })

    return personResponse(person)
  }

  async getById(props: GetOnePersonProps): Promise<PersonResponse> {
    const person = await this.personRepository.findByUuid(props.personId)
    if (!person) {
      throw new NotFoundException("Person not found.")
    }

    return personResponse(person)
  }

  async getMany(props: GetManyPersonsProps): Promise<GetManyPersonsResponse> {
    const response = await this.personRepository.findMany(props)

    return {
      ...response,
      items: response.items.map((person) => personResponse(person)),
    }
  }

  async updatePerson({
    personId,
    ...updatePerson
  }: UpdatePersonProps): Promise<PersonResponse> {
    const person = await this.personRepository.findByUuid(personId)
    if (!person) {
      throw new NotFoundException("Person not found.")
    }

    const updatedPerson = await this.personRepository.update(
      person.id,
      updatePerson
    )

    return personResponse(updatedPerson)
  }

  async deletePersonById(props: DeletePersonProps): Promise<void> {
    const person = await this.personRepository.findByUuid(props.personId)
    if (!person) {
      throw new NotFoundException("Person not found.")
    }

    await this.personRepository.deletePerson(person.id)
  }
}
