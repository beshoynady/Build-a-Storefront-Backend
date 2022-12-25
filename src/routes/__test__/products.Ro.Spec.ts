import supertest from 'supertest'
import app from '../../index'
import productModel, { products } from '../../models/products.mo'
import db from '../../database/pool'
import userModel, { users } from '../../models/users.mo'

const ProductModel = new productModel()
const UserModel = new userModel()
const request = supertest(app)
let token = ''

describe('Testing the loginc of the Products Model END POINTS', () => {
  const product = {
    product_name: 'iphone',
    price: '5000$'
  } as products

  const user = {
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'test'
  } as users

  beforeAll(async () => {
    const createUser = await UserModel.createNewUser(user)
    user.user_id = createUser.user_id
    const creatProduct = await ProductModel.createNewProduct(product)
    product.product_id = creatProduct.product_id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql1 = `DELETE FROM users`
    await connection.query(sql1)
    const sql = `DELETE FROM products`
    await connection.query(sql)
    connection.release()
  })

  describe('Test Authentication Method', () => {
    it('should be able to authenticate to get token ', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send({ user_name: 'test', password: 'test' })
      expect(res.status).toBe(200)
      const {
        user_id,
        user_name,
        first_name,
        last_name,
        token: userToken
      } = res.body.data
      expect(user_id).toBe(user.user_id)
      expect(user_name).toBe(user.user_name)
      expect(first_name).toBe(user.first_name)
      expect(last_name).toBe(user.last_name)
      token = userToken
    })

    it('failed to authenticated with wrong user_name', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send({ user_name: 'gggg', password: '55555' })
      expect(res.status).toBe(401)
    })
  })
  describe('Testing CRUD Operation methods for Products model', () => {
    it('Create User new product', async () => {
      const res = await request
        .post('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          product_name: 'tv',
          price: '1000$'
        } as products)
      expect(res.status).toBe(200)
      const { product_name, price } = res.body.newproduct
      expect(product_name).toBe('tv')
      expect(price).toBe('1000$')
    })

    it('should get list of products', async () => {
      const res = await request
        .get('/api/products/')
        .set('Content-type', 'application/json')
      expect(res.status).toBe(200)
      expect(Object.keys(res.body.showProduct).length).toBe(2)
    })

    it('should get one of product', async () => {
      const res = await request
        .get(`/api/products/${product.product_id}/`)
        .set('Content-type', 'application/json')
      const { product_name, price } = res.body.dataProduct
      expect(product_name).toBe('iphone')
      expect(price).toBe('5000$')
    })

    it('should update one of product', async () => {
      const res = await request
        .patch(`/api/products/${product.product_id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...product,
          product_name: 'laptop',
          price: '1500$'
        })
      expect(res.status).toBe(200)
      const { product_id, product_name, price } = res.body.product
      expect(product_id).toBe(product.product_id)
      expect(product_name).toBe('laptop')
      expect(price).toBe('1500$')
    })

    it('should delete one of products', async () => {
      const res = await request
        .delete(`/api/products/${product.product_id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.product.product_id).toBe(product.product_id)
      expect(res.body.product.product_name).toBe('laptop')
      expect(res.body.product.price).toBe('1500$')
    })
  })
})
