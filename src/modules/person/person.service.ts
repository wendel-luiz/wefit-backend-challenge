import { randomUUID } from "crypto"
import { CreatePerson } from "./dtos/create.dto"
import { PersonRespository } from "./person.repository"
import { NotFoundException } from "../../lib/exceptions"
import { buildResponse, PersonResponse } from "./utils/build-response.util"

export class PersonService {
  constructor(private readonly personRepository: PersonRespository) {}

  async create(props: CreatePerson): Promise<PersonResponse> {
    const person = await this.personRepository.insertPerson({
      uuid: randomUUID(),
      name: props.name,
      document: props.document,
      personType: props.personType,
    })

    const addresses = await this.personRepository.insertAddresses(
      person.id,
      props.addresses.map((address) => ({
        personId: person.id,
        number: address.number,
        zip: address.zip,
        publicArea: address.publicArea,
        addOn: address.addOn,
        district: address.district,
        city: address.city,
        state: address.state,
      }))
    )

    const contacts = await this.personRepository.insertContacts(
      person.id,
      props.contacts.map((contact) => ({
        personId: person.id,
        contactType: contact.contactType,
        value: contact.value,
      }))
    )

    return buildResponse(person, addresses, contacts)
  }

  async getById(personId: string): Promise<PersonResponse> {
    const person = await this.personRepository.findPersonByUuid(personId)
    if (!person) {
      throw new NotFoundException("Person not found.")
    }

    const addresses = await this.personRepository.findAddressesByPersonId(
      person.id
    )

    const contacts = await this.personRepository.findContactsByPersonId(
      person.id
    )

    return buildResponse(person, addresses, contacts)
  }
}
