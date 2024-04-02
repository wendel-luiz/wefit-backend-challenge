import { Kysely } from "kysely"
import { Address, Contact, Database, Person } from "../../database/types"
import { InsertPerson } from "./person.types"

export class PersonRespository {
  constructor(private readonly connection: Kysely<Database>) {}

  async insert(newPerson: InsertPerson): Promise<{
    person: Person
    addresses: Address[]
    contacts: Contact[]
  }> {
    const [person, addresses, contacts] = await this.connection
      .transaction()
      .execute(async (tx) => {
        await tx
          .insertInto("person")
          .values({
            uuid: newPerson.uuid,
            name: newPerson.name,
            document: newPerson.document,
            personType: newPerson.personType,
          })
          .executeTakeFirstOrThrow()

        const person = await tx
          .selectFrom("person")
          .selectAll()
          .where("person.uuid", "=", newPerson.uuid)
          .executeTakeFirstOrThrow()

        await tx
          .insertInto("address")
          .values(
            newPerson.addresses.map((address) => ({
              ...address,
              personId: person.id,
            }))
          )
          .execute()

        const addresses = await tx
          .selectFrom("address")
          .selectAll()
          .where("address.personId", "=", person.id)
          .execute()

        await tx
          .insertInto("contact")
          .values(
            newPerson.contacts.map((contact) => ({
              ...contact,
              personId: person.id,
            }))
          )
          .execute()

        const contacts = await tx
          .selectFrom("contact")
          .selectAll()
          .where("contact.personId", "=", person.id)
          .execute()

        return [person, addresses, contacts]
      })

    return {
      person,
      addresses,
      contacts,
    }
  }
}
