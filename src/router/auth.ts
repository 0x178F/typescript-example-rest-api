import {Router} from 'express'
import {validate} from '../middleware/validate'
import {authLoginValidator, refreshTokenValidator} from '../validators/auth'
import {authenticateToken} from '../middleware/authenticate'
import {login, refreshToken} from '../controller/auth'

const router = Router()

router.get('/login', validate(authLoginValidator), login)
router.post('/refreshToken', validate(refreshTokenValidator), authenticateToken, refreshToken)

export default router