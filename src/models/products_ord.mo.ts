import db from '../database/pool'

export type products_orders = {
  product_order_id: string
  product_id: string
  order_id: string
  quantity: number
}

class products_ordersModel {
  //create a new product_order
  async createProducts_orders(
    product_order: products_orders
  ): Promise<products_orders> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO products_orders (product_id ,order_id,quantity)
        VALUES ($1,$2,$3) RETURNING * `
      const result = await connection.query(sql as string, [
        product_order.product_id,
        product_order.order_id,
        product_order.quantity
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to create your order of many products because:  ${(error as Error).message
        }`
      )
    }
  }
  //get all orders
  async getAllProducts_orders(): Promise<products_orders[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT * FROM products_orders`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(
        `unable to get all order or products from the database`
      )
    }
  }
  //get one order
  async getProducts_orders(
    product_order_id: string
  ): Promise<products_orders> {
    try {
      const connection = await db.connect()
      const sql = `SELECT * FROM products_orders WHERE product_order_id=$1  `
      const result = await connection.query(sql, [product_order_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to get the  products order from the database because ${(error as Error).message
        }`
      )
    }
  }
  //update one order
  async updateProdcutsOrder(
    product_order: products_orders
  ): Promise<products_orders> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE products_orders set ( product_id, order_id, quantity) = 
        ($1,$2,$3) WHERE product_order_id=$4  RETURNING *`
      const result = await connection.query(sql as string, [
        product_order.product_id,
        product_order.order_id,
        product_order.quantity,
        product_order.product_order_id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to update the products order from the database because ${(error as Error).message
        }`
      )
    }
  }
  //delete one order
  async deletePRoductsOrder(
    product_order_id: string
  ): Promise<products_orders> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM products_orders WHERE product_order_id=$1 RETURNING *`
      const result = await connection.query(sql, [product_order_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Can not delete the products order baeause : ${(error as Error).message
        }`
      )
    }
  }
}

export default products_ordersModel
