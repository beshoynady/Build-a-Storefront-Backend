import supertest from 'supertest'
import app from '../../index'
import db from '../../database/pool'
import orderModel, { orders } from '../../models/orders.mo'
import userModel, { users } from '../../models/users.mo'

const OrderModel = new orderModel()
const UserModel = new userModel()
const request = supertest(app)
let token = ''

describe('Testing the logic of the Orders Model END POINTS', () => {
  const user = {
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'test'
  } as users

  const order = {
    order_status: 'Pending'
  } as orders

  beforeAll(async () => {
    const createNewUser = await UserModel.createNewUser(user)
    user.user_id = createNewUser.user_id
    order.user_id = createNewUser.user_id
    const creatOrder = await OrderModel.createOrder(order)
    order.order_id = creatOrder.order_id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql1 = `DELETE FROM orders`
    await connection.query(sql1)
    const sql = `DELETE FROM users`
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

    it('should be failed to authenticated  with wrong user_name', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send({ user_name: 'asd', password: 'asd' })
      expect(res.status).toBe(401)
    })
  })

  describe('Testing CRUD Operation methods for orders model', () => {
    it('Create User new order', async () => {
      const res = await request
        .post('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: user.user_id,
          order_status: 'nearly to rech the house'
        } as orders)
      expect(res.status).toBe(200)
      const { user_id, order_status } = res.body.data
      expect(user_id).toBe(user.user_id)
      expect(order_status).toBe('nearly to rech the house')
    })

    it('should get list of orders', async () => {
      const res = await request
        .get('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(Object.keys(res.body.data).length).toBe(2)
    })

    it('should get one of orders', async () => {
      const res = await request
        .get(`/api/orders/${order.order_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.body.data.order_status).toBe(order.order_status)
      expect(res.body.data.order_id).toBe(order.order_id)
      expect(res.body.data.user_id).toBe(order.user_id)
    })

    it('should update one of order', async () => {
      const res = await request
        .patch(`/api/orders/${order.order_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...order,
          order_status: 'Active'
        })
      expect(res.status).toBe(200)
      const { order_id, user_id, order_status } = res.body.data.order
      expect(order_id).toBe(order.order_id)
      expect(user_id).toBe(order.user_id)
      expect(order_status).toBe('Active')
    })

    it('should delete one of orders', async () => {
      const res = await request
        .delete(`/api/orders/${order.order_id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.order_id).toBe(order.order_id)
      expect(res.body.data.user_id).toBe(order.user_id)
      expect(res.body.data.order_status).toBe('Active')

      const res1 = await request
        .get('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res1.status).toBe(200)
      expect(Object.keys(res1.body.data).length).toBe(1)
    })
  })
})
