import { Kysely } from "kysely"
import {
  Address,
  Contact,
  Database,
  NewAddress,
  NewContact,
  NewPerson,
  Person,
  PersonUpdate,
} from "../../database/types"
import { InternalServerError } from "../../lib/exceptions"

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

    const person = await this.findPersonByUuid(newPerson.uuid)

    if (!person) {
      throw new InternalServerError()
    }

    return person
  }

  async findPersonByUuid(uuid: string): Promise<Person | undefined> {
    return await this.connection
      .selectFrom("person")
      .selectAll()
      .where("person.uuid", "=", uuid)
      .executeTakeFirst()
  }

  async updatePerson(
    personId: number,
    updatePerson: PersonUpdate
  ): Promise<void> {
    await this.connection
      .updateTable("person")
      .set(updatePerson)
      .where("person.id", "=", personId)
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

  async deletePerson(personId: number): Promise<void> {
    await this.connection
      .deleteFrom("person")
      .where("person.id", "=", personId)
      .executeTakeFirstOrThrow()
  }
}
