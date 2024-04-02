import { randomUUID } from "crypto"
import { CreatePerson, CreatePersonResult } from "./dtos/create.dto"
import { PersonRespository } from "./person.repository"

export class PersonService {
  constructor(private readonly personRepository: PersonRespository) {}

  async create(props: CreatePerson): Promise<CreatePersonResult> {
    const result = await this.personRepository.insert({
      uuid: randomUUID(),
      name: props.name,
      document: props.document,
      personType: props.personType,
      addresses: props.addresses,
      contacts: props.contacts,
    })

    return {
      id: result.person.uuid,
      name: result.person.name,
      personType: result.person.personType,
      document: result.person.document,
      contacts: result.contacts.map((contact) => ({
        contactType: contact.contactType,
        value: contact.value,
      })),
      addresses: result.addresses.map((address) => ({
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
