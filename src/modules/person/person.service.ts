import { randomUUID } from "crypto"
import { CreatePerson, CreatePersonResult } from "./dtos/create.dto"
import { PersonRespository } from "./person.repository"

export class PersonService {
  constructor(private readonly personRepository: PersonRespository) {}

  async create(props: CreatePerson): Promise<CreatePersonResult> {
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

    return {
      id: person.uuid,
      name: person.name,
      personType: person.personType,
      document: person.document,
      contacts: contacts.map((contact) => ({
        contactType: contact.contactType,
        value: contact.value,
      })),
      addresses: addresses.map((address) => ({
        zip: address.zip,
        publicArea: address.publicArea,
        number: address.number,
        addOn: address.addOn,
        district: address.district,
        city: address.city,
        state: address.state,
      })),
    }
  }
}
