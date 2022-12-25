import db from '../database/pool'

export type orders = {
  order_id: string
  order_status: string
  user_id: string
}

class orderModel {
  //create a new order
  async createOrder(order: orders): Promise<orders> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO orders (order_status ,user_id)
        VALUES ($1,$2) RETURNING order_id, order_status, user_id `
      const result = await connection.query(sql as string, [
        order.order_status,
        order.user_id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to create your order because:  ${
          (error as Error).message
        }`
      )
    }
  }
  //get all orders
  async getAllOrders(): Promise<orders[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT * FROM orders`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`unable to get all orders from the database`)
    }
  }
  //get one order
  async getOneOrder(order_id: string): Promise<orders> {
    try {
      const connection = await db.connect()
      const sql = `SELECT user_id, order_status , order_id FROM orders  WHERE order_id=($1)`
      const result = await connection.query(sql, [order_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to get the  order from the database because ${
          (error as Error).message
        }`
      )
    }
  }
  //update one order
  async updateOneOrder(order: orders): Promise<orders> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE orders set ( order_status, user_id) = 
        ($1,$2) WHERE order_id=$3  RETURNING *`
      const result = await connection.query(sql as string, [
        order.order_status,
        order.user_id,
        order.order_id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to update the order from the database because ${
          (error as Error).message
        }`
      )
    }
  }
  //delete one order
  async deleteOneOrder(order_id: string): Promise<orders> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM orders WHERE order_id=$1 RETURNING *`
      const result = await connection.query(sql, [order_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Can not delete the order baeause : ${
          (error as Error).message
        }`
      )
    }
  }
}

export default orderModel
