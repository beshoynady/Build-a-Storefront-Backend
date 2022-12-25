import { Router } from 'express'
import * as controllers from '../../handlers/users.cont'
import verifyToken from '../../middleware/auth'

const route = Router()

route.post('/', controllers.createNewUser) 
route.get('/', verifyToken, controllers.showAllUsers) 
route.get('/:user_id', verifyToken, controllers.getUserById) 
route.patch('/:user_id', verifyToken, controllers.updateUserById) 
route.delete('/:user_id', verifyToken, controllers.deleteUserById) 
route.post('/login', controllers.authenticateUser) 
export default route
