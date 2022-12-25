import { Router } from 'express'
import * as controllers from '../../handlers/orders.cont'
import Validation from '../../middleware/auth'

const route = Router()

route.post('/', Validation, controllers.createOrder)
route.get('/', Validation, controllers.getAllOrders) 
route.get('/:order_id', Validation, controllers.getOneOrder)
route.patch('/:order_id', Validation, controllers.updateOneOrder)
route.delete('/:order_id', Validation, controllers.deleteOneOrder) 
export default route
