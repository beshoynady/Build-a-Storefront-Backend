import products_ordersModel, { products_orders } from '../products_ord.mo'
import productModel, { products } from '../products.mo'
import orderModel, { orders } from '../orders.mo'
import userModel, { users } from '../users.mo'
import db from '../../database/pool'

const ProdOrderModel = new products_ordersModel()
const UserModel = new userModel()
const OrderModel = new orderModel()
const ProductModel = new productModel()

describe('Products order Unit Testing', () => {
  describe('Testing the existence of the methods', () => {
    it('Create one Products order methode', () => {
      expect(ProdOrderModel.createProducts_orders).toBeDefined()
    })

    it('Get all Products orders methode', () => {
      expect(ProdOrderModel.getAllProducts_orders).toBeDefined()
    })

    it('Get one Products order methode', () => {
      expect(ProdOrderModel.getProducts_orders).toBeDefined()
    })

    it('update one Products order methode', () => {
      expect(ProdOrderModel.updateProdcutsOrder).toBeDefined()
    })

    it('should have delete Products order methode', () => {
      expect(ProdOrderModel.deletePRoductsOrder).toBeDefined()
    })
  })

  describe('Testing the Products order methods', () => {
    const usertest = {
      user_name: 'user1',
      first_name: 'test',
      last_name: 'test',
      password: 'test'
    } as users

    const product = {
      product_name: 'iphone',
      price: '5000$'
    } as products

    const order = {
      order_status: 'Pending'
    } as orders

    const product_order = {
      quantity: 10
    } as products_orders

    beforeAll(async () => {
      const createNewUser = await UserModel.createNewUser(usertest)
      usertest.user_id = createNewUser.user_id
      const creatProduct = await ProductModel.createNewProduct(product)
      product.product_id = creatProduct.product_id
      order.user_id = createNewUser.user_id
      const creatOrder = await OrderModel.createOrder(order)
      order.order_id = creatOrder.order_id
      product_order.product_id = creatProduct.product_id
      product_order.order_id = creatOrder.order_id
      const createProdOrd =
        await ProdOrderModel.createProducts_orders(product_order)
      product_order.product_order_id = createProdOrd.product_order_id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql1 = `DELETE FROM products_orders`
      await connection.query(sql1)
      const sq1l = `DELETE FROM orders`
      await connection.query(sq1l)
      const sql = `DELETE FROM products`
      await connection.query(sql)
      const sq1l3 = `DELETE FROM users`
      await connection.query(sq1l3)
      connection.release()
    })

    it('Create new products order ', async () => {
      const creatProdOrder =
        await ProdOrderModel.createProducts_orders(product_order)
      product_order.product_order_id = creatProdOrder.product_order_id
      expect(creatProdOrder.product_id).toBe(product_order.product_id)
      expect(creatProdOrder.order_id).toBe(product_order.order_id)
      expect(creatProdOrder.quantity).toBe(product_order.quantity)
    })

    it('get all  products orders ', async () => {
      const productsorders = await ProdOrderModel.getAllProducts_orders()
      expect(productsorders.length).toBe(2)
    })

    it('get one products order ', async () => {
      const productOrder = await ProdOrderModel.getProducts_orders(
        product_order.product_order_id
      )
      expect(productOrder.product_order_id).toBe(
        product_order.product_order_id
      )
      expect(productOrder.product_id).toBe(product_order.product_id)
      expect(productOrder.order_id).toBe(product_order.order_id)
      expect(productOrder.quantity).toBe(product_order.quantity)
    })

    it('update one products order', async () => {
      const updatedProdsOrder =
        await ProdOrderModel.updateProdcutsOrder({
          ...product_order,
          quantity: 20
        })
      expect(updatedProdsOrder.product_order_id).toBe(
        product_order.product_order_id
      )
      expect(updatedProdsOrder.quantity).toBe(20)
      expect(updatedProdsOrder.product_id).toBe(
        product_order.product_id
      )
      expect(updatedProdsOrder.order_id).toBe(product_order.order_id)
    })

    it('delete one products ', async () => {
      const deleteProdOrder =
        await ProdOrderModel.deletePRoductsOrder(
          product_order.product_order_id
        )
      expect(deleteProdOrder.product_order_id).toBe(
        product_order.product_order_id
      )
      const prodor = await OrderModel.getAllOrders()
      expect(prodor.length).toBe(1)
    })
  })
})
