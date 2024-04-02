import {
  type Generated,
  type Insertable,
  type Selectable,
  type Updateable,
} from "kysely"

export interface Database {
  person: PersonTable
}

export enum PersonType {
  NATURAL = "NATURAL",
  LEGAL = "LEGAL",
}

export interface PersonTable {
  id: Generated<number>
  uuid: string
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
  createdAt: Generated<string>
  updatedAt?: string
  deletedAt?: string
}

export type Person = Selectable<PersonTable>
export type NewPerson = Insertable<PersonTable>
export type PersonUpdate = Updateable<PersonTable>
