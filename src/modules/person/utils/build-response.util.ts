import { Person, PersonType } from "../../../database/types"

export interface AddressResponse {}

export interface PersonResponse {
  id: string
  name: string
  document: string
  personType: PersonType
  cellPhone: string
  telephone: string
  email: string
  zip: string
  publicArea: string
  number: string
  addOn: string
  district: string
  city: string
  state: string
  createdAt: string
}

export function personResponse(person: Person): PersonResponse {
  return {
    id: person.uuid,
    name: person.name,
    personType: person.personType,
    document: person.document,
    cellPhone: person.cellPhone,
    telephone: person.telephone,
    email: person.email,
    zip: person.zip,
    publicArea: person.publicArea,
    number: person.number,
    addOn: person.addOn,
    district: person.district,
    city: person.city,
    state: person.state,
    createdAt: person.createdAt,
  }
}
