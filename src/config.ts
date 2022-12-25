import dotenv from 'dotenv'

dotenv.config()

const {
  port,
  nodeEnv,
  pgHost,
  pgPort,
  pgDb,
  pgDb_test,
  pgUser,
  pgPassword,
  saltRound,
  pepperHash,
  tokenSecret
} = process.env

export default {
  port: port,
  host: pgHost,
  dbport: pgPort,
  database: nodeEnv === 'dev' ? pgDb : pgDb_test,
  user: pgUser,
  password: pgPassword,
  salt: saltRound,
  pepper: pepperHash,
  token: tokenSecret
}
