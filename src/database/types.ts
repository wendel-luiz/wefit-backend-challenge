import {
  type Generated,
  type Insertable,
  type Selectable,
  type Updateable,
} from "kysely"

export interface Database {
  person: PersonTable
  contact: ContactTable
  address: AddressTable
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
  createdAt: Generated<string>
  updatedAt: string
  deletedAt: string
}

export type Person = Selectable<PersonTable>
export type NewPerson = Insertable<PersonTable>
export type PersonUpdate = Updateable<PersonTable>

export enum ContactType {
  CELL_PHONE = "CELL_PHONE",
  TELEPHONE = "TELEPHONE",
  EMAIL = "EMAIL",
}

export interface ContactTable {
  id: Generated<number>
  personId: number
  contactType: ContactType
  value: string
  createdAt: Generated<string>
  updatedAt: string
  deletedAt: string
}

export type Contact = Selectable<ContactTable>
export type NewContact = Insertable<ContactTable>
export type ContactUpdate = Updateable<ContactTable>

export interface AddressTable {
  id: Generated<number>
  personId: number
  zip: string
  publicArea: string
  number: string
  addOn: string
  district: string
  city: string
  state: string
  createdAt: Generated<string>
  updatedAt: string
  deletedAt: string
}

export type Address = Selectable<AddressTable>
export type NewAddress = Insertable<AddressTable>
export type AddressUpdate = Updateable<AddressTable>
