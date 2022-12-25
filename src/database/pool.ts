import { Pool } from 'pg'
import config from '../config'

const port = parseInt(config.dbport as string, 10)

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: port
})

pool.on('error', (error: Error) => {
  console.log(error.message)
})

export default pool
