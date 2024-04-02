import { type Kysely, sql } from "kysely"
import { Database } from "../types"

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("person")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("uuid", "varchar(255)", (col) => col.notNull().unique())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("document", "varchar(255)", (col) => col.notNull())
    .addColumn("cellPhone", "varchar(255)", (col) => col.notNull())
    .addColumn("telephone", "varchar(255)", (col) => col.notNull())
    .addColumn("email", "varchar(255)", (col) => col.notNull())
    .addColumn("zip", "varchar(255)", (col) => col.notNull())
    .addColumn("publicArea", "varchar(255)", (col) => col.notNull())
    .addColumn("number", "varchar(255)", (col) => col.notNull())
    .addColumn("addOn", "varchar(255)")
    .addColumn("district", "varchar(255)", (col) => col.notNull())
    .addColumn("city", "varchar(255)", (col) => col.notNull())
    .addColumn("state", "varchar(255)", (col) => col.notNull())
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
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("person").execute()
}
