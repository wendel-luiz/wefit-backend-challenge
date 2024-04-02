import { type Kysely, sql } from "kysely"
import { Database } from "../types"

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("person")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("uuid", "text", (col) => col.notNull().unique())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("document", "text", (col) => col.notNull())
    .addColumn("personType", "text", (col) => col.notNull())
    .addColumn("createdAt", "timestamptz", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("deletedAt", "timestamptz")
    .execute()

  await db.schema
    .createIndex("person_uuid_index")
    .on("person")
    .column("uuid")
    .execute()

  await db.schema
    .createTable("contact")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("personId", "integer", (col) =>
      col.references("person.id").onDelete("cascade").notNull()
    )
    .addColumn("contactType", "text", (col) => col.notNull())
    .addColumn("value", "text", (col) => col.notNull())
    .addColumn("password", "text", (col) => col.notNull())
    .addColumn("createdAt", "timestamptz", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("deletedAt", "timestamptz")
    .execute()

  await db.schema
    .createIndex("contact_personId_index")
    .on("contact")
    .column("personId")
    .execute()

  await db.schema
    .createTable("address")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("personId", "integer", (col) =>
      col.references("person.id").onDelete("cascade").notNull()
    )
    .addColumn("zip", "text", (col) => col.notNull())
    .addColumn("publicArea", "text", (col) => col.notNull())
    .addColumn("number", "text", (col) => col.notNull())
    .addColumn("addOn", "text", (col) => col.notNull())
    .addColumn("district", "text", (col) => col.notNull())
    .addColumn("city", "text", (col) => col.notNull())
    .addColumn("state", "text", (col) => col.notNull())
    .addColumn("createdAt", "timestamptz", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("deletedAt", "timestamptz")
    .execute()

  await db.schema
    .createIndex("address_personId_index")
    .on("address")
    .column("personId")
    .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("person").execute()
  await db.schema.dropTable("contact").execute()
  await db.schema.dropTable("address").execute()
}
