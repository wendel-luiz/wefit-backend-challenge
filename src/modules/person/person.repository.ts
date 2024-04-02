import { Kysely } from "kysely"
import {
  Address,
  Contact,
  Database,
  NewAddress,
  NewContact,
  NewPerson,
  Person,
} from "../../database/types"
import { InsertPerson } from "./person.types"

export class PersonRespository {
  constructor(private readonly connection: Kysely<Database>) {}

  async insertPerson(newPerson: NewPerson): Promise<Person> {
    await this.connection
      .insertInto("person")
      .values({
        uuid: newPerson.uuid,
        name: newPerson.name,
        document: newPerson.document,
        personType: newPerson.personType,
      })
      .executeTakeFirstOrThrow()

    const person = await this.connection
      .selectFrom("person")
      .selectAll()
      .where("person.uuid", "=", newPerson.uuid)
      .executeTakeFirstOrThrow()

    return person
  }

  async insertAddresses(
    personId: number,
    newAddresses: NewAddress[]
  ): Promise<Array<Address>> {
    await this.connection.insertInto("address").values(newAddresses).execute()

    const addresses = await this.connection
      .selectFrom("address")
      .selectAll()
      .where("address.personId", "=", personId)
      .execute()

    return addresses
  }

  async insertContacts(
    personId: number,
    newContacts: NewContact[]
  ): Promise<Array<Contact>> {
    await this.connection.insertInto("contact").values(newContacts).execute()

    const contacts = await this.connection
      .selectFrom("contact")
      .selectAll()
      .where("contact.personId", "=", personId)
      .execute()

    return contacts
  }
}
