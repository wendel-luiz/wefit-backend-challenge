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

    return await this.findPersonByUuid(newPerson.uuid)
  }

  async findPersonByUuid(uuid: string): Promise<Person> {
    return await this.connection
      .selectFrom("person")
      .selectAll()
      .where("person.uuid", "=", uuid)
      .executeTakeFirstOrThrow()
  }

  async insertAddresses(
    personId: number,
    newAddresses: NewAddress[]
  ): Promise<Array<Address>> {
    await this.connection.insertInto("address").values(newAddresses).execute()

    return await this.findAddressesByPersonId(personId)
  }

  async findAddressesByPersonId(personId: number): Promise<Address[]> {
    return await this.connection
      .selectFrom("address")
      .selectAll()
      .where("address.personId", "=", personId)
      .execute()
  }

  async insertContacts(
    personId: number,
    newContacts: NewContact[]
  ): Promise<Array<Contact>> {
    await this.connection.insertInto("contact").values(newContacts).execute()

    return await this.findContactsByPersonId(personId)
  }

  async findContactsByPersonId(personId: number): Promise<Contact[]> {
    return await this.connection
      .selectFrom("contact")
      .selectAll()
      .where("contact.personId", "=", personId)
      .execute()
  }
}
