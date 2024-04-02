import { type Kysely, sql } from "kysely"
import { Database } from "../types"

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("person")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("uuid", "varchar(255)", (col) => col.notNull().unique())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("document", "varchar(255)", (col) => col.notNull())
    .addColumn("personType", "varchar(255)", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updatedAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("deletedAt", "timestamp")
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
    .addColumn("contactType", "varchar(255)", (col) => col.notNull())
    .addColumn("value", "varchar(255)", (col) => col.notNull())
    .addColumn("password", "varchar(255)", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updatedAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("deletedAt", "timestamp")
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
    .addColumn("zip", "varchar(255)", (col) => col.notNull())
    .addColumn("publicArea", "varchar(255)", (col) => col.notNull())
    .addColumn("number", "varchar(255)", (col) => col.notNull())
    .addColumn("addOn", "varchar(255)", (col) => col.notNull())
    .addColumn("district", "varchar(255)", (col) => col.notNull())
    .addColumn("city", "varchar(255)", (col) => col.notNull())
    .addColumn("state", "varchar(255)", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updatedAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("deletedAt", "timestamp")
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
