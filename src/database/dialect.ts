import { createPool } from "mysql2"
import { MysqlDialect } from "kysely"

export const dialect = new MysqlDialect({
  pool: createPool({
    database: process.env.MYSQLDB_DATABASE,
    host: process.env.MYSQLDB_HOST,
  }),
})
