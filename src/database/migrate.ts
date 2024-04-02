import * as path from "path"
import { createPool } from "mysql2"
import { promises as fs } from "fs"
import { Kysely, Migrator, MysqlDialect, FileMigrationProvider } from "kysely"
import { type Database } from "./types"

async function migrateToLatest(): Promise<void> {
  const db = new Kysely<Database>({
    dialect: new MysqlDialect({
      pool: createPool({
        database: process.env.MYSQLDB_DATABASE,
        host: process.env.MYSQLDB_HOST,
      }),
    }),
  })

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error != null) {
    console.error("failed to migrate")
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

void migrateToLatest()
