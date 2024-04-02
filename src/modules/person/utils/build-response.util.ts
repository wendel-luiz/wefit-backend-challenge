import {
  Address,
  Contact,
  ContactType,
  Person,
  PersonType,
} from "../../../database/types"

export interface PersonResponse {
  id: string
  name: string
  document: string
  personType: PersonType
  addresses: Array<{
    zip: string
    publicArea: string
    number: string
    addOn: string
    district: string
    city: string
    state: string
  }>
  contacts: Array<{
    contactType: ContactType
    value: string
  }>
}

export function buildResponse(
  person: Person,
  addresses: Address[],
  contacts: Contact[]
): PersonResponse {
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
