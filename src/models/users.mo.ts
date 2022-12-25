import db from '../database/pool'
import config from '../config'
import bcrypt from 'bcrypt'

export type users = {
  user_id: string
  user_name: string
  first_name: string
  last_name: string
  password: string
}

const hash = (password: string) => {
  const salt: number = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}


class userModel {
  //create user
  async createNewUser(user: users): Promise<users> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO users (user_name, first_name, last_name, password)
        VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, first_name, last_name`
      const result = await connection.query(sql as string, [
        user.user_name,
        user.first_name,
        user.last_name,
        hash(user.password)
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }
  //get all users
  async showAllUsers(): Promise<users[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT  user_id, user_name, first_name, last_name FROM users`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  //get one user
  async getUserById(user_id: string): Promise<users> {
    try {
      const connection = await db.connect()
      const sql = `SELECT  user_id, user_name, first_name, last_name FROM users WHERE user_id=$1`
      const result = await connection.query(sql, [user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message
      )
    }
  }
  //update one user
  async updateUserById(user: users): Promise<users> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE users set ( user_name, first_name, last_name, password) = 
      ($1,$2,$3,$4) WHERE user_id=$5  RETURNING user_id, user_name, first_name, last_name`
      const result = await connection.query(sql as string, [
        user.user_name,
        user.first_name,
        user.last_name,
        hash(user.password),
        user.user_id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  //delete one user
  async deleteUserById(user_id: string): Promise<users> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM users WHERE user_id=$1 RETURNING user_id, user_name, first_name, last_name`
      const result = await connection.query(sql, [user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  //Confirm the password
  async authenticateUser(
    user_name: string,
    password: string
  ): Promise<users | null> {
    try {
      const connection = await db.connect()
      const sql = `SELECT password FROM users WHERE user_name=$1`
      const result = await connection.query(sql, [user_name])
      connection.release()
      if (result.rows.length) {
        const { password: hash } = result.rows[0]
        const compare_password = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hash
        )
        if (compare_password) {
          const connection = await db.connect()
          const User_Info = await connection.query(
            `SELECT user_id, user_name, first_name, last_name FROM users where user_name=$1`,
            [user_name]
          )
          connection.release()
          return User_Info.rows[0]
        }
      }
      return null
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}

export default userModel
