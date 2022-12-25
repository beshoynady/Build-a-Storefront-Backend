import { Router } from 'express'
import * as controllers from '../../handlers/products.cont'
import Validation from '../../middleware/auth'

const route = Router()

route.post('/', Validation, controllers.createNewProduct) 
route.get('/', controllers.getAllProducts) 
route.get('/:product_id', controllers.getProduct) 
route.patch('/:product_id', Validation, controllers.updateProduct) 
route.delete('/:product_id', Validation, controllers.deleteProduct) 

export default route
