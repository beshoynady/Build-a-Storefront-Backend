import products_ordersModel, { products_orders } from '../../models/products_ord.mo'
import productModel, { products } from '../../models/products.mo'
import orderModel, { orders } from '../../models/orders.mo'
import userModel, { users } from '../../models/users.mo'
import db from '../../database/pool'
import supertest from 'supertest'
import app from '../../index'

const ProdOrderModel = new products_ordersModel()
const OrderModel = new orderModel()
const ProductModel = new productModel()
const UserModel = new userModel()
const request = supertest(app)
let token = ''

describe('Testing the logic of the Products_order methods END POINTS', () => {
  const user = {
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'test'
  } as users

  const product = {
    product_name: 'cola',
    price: '5000$'
  } as products

  const order = {
    order_status: 'In House'
  } as orders

  const product_order = {
    quantity: 3
  } as products_orders

  beforeAll(async () => {
    const createNewUser = await UserModel.createNewUser(user)
    user.user_id = createNewUser.user_id
    order.user_id = createNewUser.user_id
    const creatProduct = await ProductModel.createNewProduct(product)
    product.product_id = creatProduct.product_id
    product_order.product_id = creatProduct.product_id
    const creatOrder = await OrderModel.createOrder(order)
    order.order_id = creatOrder.order_id
    product_order.order_id = creatOrder.order_id
    const createProdOrd = await ProdOrderModel.createProducts_orders(
      product_order
    )
    product_order.product_order_id = createProdOrd.product_order_id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql1 = `DELETE FROM products_orders`
    await connection.query(sql1)
    const sql2 = `DELETE FROM orders`
    await connection.query(sql2)
    const sql3 = `DELETE FROM products`
    await connection.query(sql3)
    const sql4 = `DELETE FROM users`
    await connection.query(sql4)
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

    it('should be failed to authenticated with wrong user_name', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send({ user_name: '000', password: 'ssss' })
      expect(res.status).toBe(401)
    })
  })
  describe('Testing CRUD Operation methods for Products_Orders model', () => {
    it('Create User new products_order', async () => {
      const res = await request
        .post('/api/prord/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          product_id: product.product_id,
          order_id: order.order_id,
          quantity: 3
        } as products_orders)
      expect(res.status).toBe(200)
      const { product_id, order_id, quantity } = res.body.data
      expect(product_id).toBe(product_order.product_id)
      expect(order_id).toBe(product_order.order_id)
      expect(quantity).toBe(product_order.quantity)
    })

    it('should get list of products_order', async () => {
      const res = await request
        .get('/api/prord/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(Object.keys(res.body.data).length).toBe(2)
    })

    it('should get one of products_order', async () => {
      const res = await request
        .get(`/api/prord/${product_order.product_order_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.body.data.product_order_id).toBe(
        product_order.product_order_id
      )
      expect(res.body.data.order_id).toBe(product_order.order_id)
      expect(res.body.data.product_id).toBe(product_order.product_id)
      expect(res.body.data.quantity).toBe(product_order.quantity)
    })

    it('should update one of products_order', async () => {
      const res = await request
        .patch(`/api/prord/${product_order.product_order_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...product_order,
          quantity: 13
        })
      expect(res.status).toBe(200)
      const { product_order_id, order_id, product_id, quantity } =
        res.body.data.prodOrd
      expect(product_order_id).toBe(product_order.product_order_id)
      expect(order_id).toBe(product_order.order_id)
      expect(product_id).toBe(product_order.product_id)
      expect(quantity).toBe(13)
    })

    it('should delete one of products_order', async () => {
      const res = await request
        .delete(`/api/prord/${product_order.product_order_id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.order_id).toBe(product_order.order_id)
      expect(res.body.data.product_order_id).toBe(
        product_order.product_order_id
      )
      expect(res.body.data.product_id).toBe(product_order.product_id)
      expect(res.body.data.quantity).toBe(13)

      const res1 = await request
        .get('/api/prord/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res1.status).toBe(200)
      expect(Object.keys(res1.body.data).length).toBe(1)
    })
  })
})
