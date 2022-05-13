import { Router } from 'express';
import { getUsersFilesData } from '../db/mysql.js';
import { auth } from './../auth.js';


const router = new Router()

router.get('/:id', auth, async (req, res) => {
    try {
        const files = await getUsersFilesData(req.params.id)
        res.send({ files })
    } catch (err) {
        return res.status(500).send({ err })
    }
});

export default router;