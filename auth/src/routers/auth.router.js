import { Router } from 'express';
 import { getToken, checkToken } from '../controllers/auth.controller.js'

const router = new Router()

router.post('/get-token', getToken)

router.post('/check-token', checkToken)

export default router;