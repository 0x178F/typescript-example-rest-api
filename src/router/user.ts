import {Router} from 'express'
import {createUser,deleteUser, listUsers} from '../controller/user'
import {validate} from '../middleware/validate'
import {createUserValidator, deleteUserValidator} from '../validators/user'
import {authenticateToken} from '../middleware/authenticate'

const router = Router()

router.post('/create', validate(createUserValidator), createUser)
router.delete('/delete', validate(deleteUserValidator), deleteUser)
router.get('/list', authenticateToken, listUsers)

export default router
