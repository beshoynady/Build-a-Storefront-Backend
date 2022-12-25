import productModel, { products } from '../products.mo'
import db from '../../database/pool'

const ProductModel = new productModel()

describe('Products Model Unit Testing', () => {
  describe('Testing the existince of the methods first', () => {
    it('should have Create one product methode', () => {
      expect(ProductModel.createNewProduct).toBeDefined()
    })

    it('should have Get all products methode', () => {
      expect(ProductModel.getAllProducts).toBeDefined()
    })

    it('should have Get one product methode', () => {
      expect(ProductModel.getProduct).toBeDefined()
    })

    it('should have update one product methode', () => {
      expect(ProductModel.updateProduct).toBeDefined()
    })

    it('should have delete product methode', () => {
      expect(ProductModel.deleteProduct).toBeDefined()
    })
  })
  describe(',,Testing the loginc of the Products Model', () => {
    const product = {
      product_name: 'iphone',
      price: '5000$'
    } as products

    beforeAll(async () => {
      const creatProduct = await ProductModel.createNewProduct(product)
      product.product_id = creatProduct.product_id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = `DELETE FROM products`
      await connection.query(sql)
      connection.release()
    })

    it('get all  products should  return all products in db ', async () => {
      const products = await ProductModel.getAllProducts()
      expect(products.length).toBe(1)
    })

    it('Create new  product should  return the new product in db ', async () => {
      const product = {
        product_name: 'Small Bottle Water',
        price: '3LE'
      } as products
      const creatProduct = await ProductModel.createNewProduct(product)
      product.product_id = creatProduct.product_id
      expect(creatProduct.product_id).toBe(product.product_id)
      expect(creatProduct.product_name).toBe(product.product_name)
      expect(creatProduct.price).toBe(product.price)
    })

    it('get one  product should  return specific in db ', async () => {
      const oneProduct = await ProductModel.getProduct(
        product.product_id
      )
      expect(oneProduct.product_id).toBe(product.product_id)
      expect(oneProduct.product_name).toBe(product.product_name)
      expect(oneProduct.price).toBe(product.price)
    })
    it('update one  product should  return the updated product in db ', async () => {
      const updatedProduct = await ProductModel.updateProduct({
        ...product,
        product_name: 'Can Pepsi',
        price: '6LE'
      })
      expect(updatedProduct.product_id).toBe(product.product_id)
      expect(updatedProduct.product_name).toBe('Can Pepsi')
      expect(updatedProduct.price).toBe('6LE')
    })

    it('delete one  product should  return the deleted one  in db ', async () => {
      const deleteProduct = await ProductModel.deleteProduct(
        product.product_id as string
      )
      expect(deleteProduct.product_id).toBe(product.product_id)
      const prods = await ProductModel.getAllProducts()
      expect(prods.length).toBe(1)
    })
  })
})
