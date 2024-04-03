import { createPool } from "mysql2"
import { MysqlDialect } from "kysely"

let pool

if (process.env.DATABASE_URL) {
  pool = createPool({
    uri: process.env.DATABASE_URL,
  })
} else {
  pool = createPool({
    database: process.env.MYSQLDB_DATABASE,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    host: process.env.MYSQLDB_HOST,
  })
}

export const dialect = new MysqlDialect({
  pool,
})
