import db from '../database/pool'

export type products = {
  product_id: string
  product_name: string
  price: string
}

class productModel {
  //create a new product
  async createNewProduct(product: products): Promise<products> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO products (product_name, price)
        VALUES ($1, $2) RETURNING *`
      const result = await connection.query(sql as string, [
        product.product_name,
        product.price
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to create your product_name:(${product.product_name
        }) because:  ${(error as Error).message}`
      )
    }
  }
  //get all products
  async getAllProducts(): Promise<products[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT * FROM products`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`unable to get all products from the database`)
    }
  }
  //get one product
  async getProduct(product_id: string): Promise<products> {
    try {
      const connection = await db.connect()
      const sql = `SELECT  product_id, product_name, price FROM products WHERE product_id=$1 `
      const result = await connection.query(sql, [product_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to get the  product from the database because ${(error as Error).message
        }`
      )
    }
  }
  //update one product
  async updateProduct(product: products): Promise<products> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE products set (product_name, price) = 
      ($1,$2) WHERE product_id=$3 RETURNING *`
      const result = await connection.query(sql as string, [
        product.product_name,
        product.price,
        product.product_id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to update the product from the database because ${(error as Error).message
        }`
      )
    }
  }
  //delete one product
  async deleteProduct(product_id: string): Promise<products> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM products WHERE product_id=($1) RETURNING product_id, product_name, price  `
      const result = await connection.query(sql, [product_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Can not delete the product baeause : ${(error as Error).message
        }`
      )
    }
  }
}

export default productModel
