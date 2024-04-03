import { createPool } from "mysql2"
import { MysqlDialect } from "kysely"

export const dialect = new MysqlDialect({
  pool: createPool({
    uri: process.env.DATABASE_URL,
  }),
})
