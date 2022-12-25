import { Router } from 'express'
import usersRoutes from './api/users.routes'
import productsRoutes from './api/products.routes'
import ordersRoutes from './api/orders.routes'
import proOrdRoutes from './api/products_orders.routes'

const route = Router()

route.use('/users', usersRoutes)
route.use('/products', productsRoutes)
route.use('/orders', ordersRoutes)
route.use('/prord', proOrdRoutes)

export default route
