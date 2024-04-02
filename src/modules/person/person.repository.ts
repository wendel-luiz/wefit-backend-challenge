import { Kysely } from "kysely"
import { Database, NewPerson, Person, PersonUpdate } from "../../database/types"
import { InternalServerError } from "../../lib/exceptions"
import { Paginated, PaginatedResponse } from "../../lib/paginated"

export class PersonRespository {
  constructor(private readonly connection: Kysely<Database>) {}

  async insert(newPerson: NewPerson): Promise<Person> {
    await this.connection
      .insertInto("person")
      .values(newPerson)
      .executeTakeFirstOrThrow()

    const person = await this.findByUuid(newPerson.uuid)

    if (!person) {
      throw new InternalServerError()
    }

    return person
  }

  async findByUuid(uuid: string): Promise<Person | undefined> {
    return await this.connection
      .selectFrom("person")
      .selectAll()
      .where("person.uuid", "=", uuid)
      .executeTakeFirst()
  }

  async findById(id: number): Promise<Person | undefined> {
    return await this.connection
      .selectFrom("person")
      .selectAll()
      .where("person.id", "=", id)
      .executeTakeFirst()
  }

  async findMany(
    params: Paginated<unknown>
  ): Promise<PaginatedResponse<Person>> {
    const take = params.take ?? 10
    const page = params.page ?? 1

    const skip = take * (page - 1)

    const query = this.connection.selectFrom("person").selectAll()

    const [data, count] = await Promise.all([
      query.offset(skip).limit(take).execute(),
      query
        .clearSelect()
        .select((eb) => eb.fn.count<number>("person.id").as("total"))
        .executeTakeFirst(),
    ])

    const total = count?.total ?? 0
    const pages = Math.ceil(total / take)

    return {
      page,
      pages,
      length: data.length,
      items: data,
    }
  }

  async update(personId: number, updatePerson: PersonUpdate): Promise<Person> {
    await this.connection
      .updateTable("person")
      .set(updatePerson)
      .where("person.id", "=", personId)
      .executeTakeFirstOrThrow()

    const person = await this.findById(personId)

    if (!person) {
      throw new InternalServerError()
    }

    return person
  }

  async deletePerson(personId: number): Promise<void> {
    await this.connection
      .deleteFrom("person")
      .where("person.id", "=", personId)
      .executeTakeFirstOrThrow()
  }
}
