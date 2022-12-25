import { Router } from 'express'
import * as controllers from '../../handlers/products_ord.cont'
import Validation from '../../middleware/auth'

const route = Router()

route.post('/', Validation, controllers.createProducts_orders) 
route.get('/', Validation, controllers.getAllProducts_orders) 
route.get(
  '/:product_order_id',
  Validation,
  controllers.getProducts_orders
) 
route.patch(
  '/:product_order_id',
  Validation,
  controllers.updateProdcutsOrder
)
route.delete(
  '/:product_order_id',
  Validation,
  controllers.deletePRoductsOrder
) 
export default route
