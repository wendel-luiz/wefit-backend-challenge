import { createPool } from "mysql2"
import { MysqlDialect } from "kysely"

export const dialect = new MysqlDialect({
  pool: createPool({
    database: process.env.MYSQLDB_DATABASE,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    host: process.env.MYSQLDB_HOST,
  }),
})
