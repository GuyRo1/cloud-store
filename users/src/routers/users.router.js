import { Router } from 'express';
import { login, subscribe } from './../controllers/users.controller.js';

const router = new Router()

router.post('/subscribe', subscribe)

router.post('/login', login)

export default router;