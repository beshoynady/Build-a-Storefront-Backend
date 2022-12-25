import orderModel, { orders } from '../orders.mo'
import userModel, { users } from '../users.mo'
import db from '../../database/pool'

const UserModel = new userModel()
const OrderModel = new orderModel()

describe('OrdersModel Unit Testing', () => {
  describe('Testing the existince of the methods first', () => {
    it('should have Create one order methode', () => {
      expect(OrderModel.createOrder).toBeDefined()
    })

    it('should have Get all orders methode', () => {
      expect(OrderModel.getAllOrders).toBeDefined()
    })

    it('should have Get one order methode', () => {
      expect(OrderModel.getOneOrder).toBeDefined()
    })

    it('should have update one order methode', () => {
      expect(OrderModel.updateOneOrder).toBeDefined()
    })

    it('should have delete order methode', () => {
      expect(OrderModel.deleteOneOrder).toBeDefined()
    })
  })
  describe('Testing the loginc of the orders Model', () => {
    const usertest = {
      user_name: 'user1',
      first_name: 'test',
      last_name: 'test',
      password: 'test'
    } as users

    const order = {
      order_status: 'Pending'
    } as orders

    beforeAll(async () => {
      const createNewUser = await UserModel.createNewUser(usertest)
      usertest.user_id = createNewUser.user_id
      order.user_id = createNewUser.user_id
      const creatOrder = await OrderModel.createOrder(order)
      order.order_id = creatOrder.order_id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = `DELETE FROM orders`
      await connection.query(sql)
      const sq1l = `DELETE FROM users`
      await connection.query(sq1l)
      connection.release()
    })

    it('Create new  order should  return the new order in db ', async () => {
      const creatOrder = await OrderModel.createOrder({
        ...order,
        user_id: usertest.user_id
      })
      order.order_id = creatOrder.order_id
      expect(creatOrder.order_id).toBe(order.order_id)
      expect(creatOrder.order_status).toBe(order.order_status)
      expect(creatOrder.user_id).toBe(order.user_id)
    })

    it('get all  orders should  return all orders in db ', async () => {
      const orders = await OrderModel.getAllOrders()
      expect(orders.length).toBe(2)
    })

    it('get one  order should  return specific in db ', async () => {
      const oneOrder = await OrderModel.getOneOrder(order.order_id)
      expect(oneOrder.order_id).toBe(order.order_id)
      expect(oneOrder.order_status).toBe(order.order_status)
      expect(oneOrder.user_id).toBe(order.user_id)
    })

    it('update one  order should  return the updated order in db ', async () => {
      const updatedOrder = await OrderModel.updateOneOrder({
        ...order,
        order_status: 'Active'
      })
      expect(updatedOrder.order_id).toBe(order.order_id)
      expect(updatedOrder.order_status).toBe('Active')
      expect(updatedOrder.user_id).toBe(order.user_id)
    })

    it('delete one  order should  return the deleted one  in db ', async () => {
      const deleteOrder = await OrderModel.deleteOneOrder(
        order.order_id as string
      )
      expect(deleteOrder.order_id).toBe(order.order_id)
      const orders = await OrderModel.getAllOrders()
      expect(orders.length).toBe(1)
    })
  })
})
