import { Router } from 'express';
import { saveImageDataToDB, deleteImageMetaDataFromDB, getImage } from '../controllers/files.controller.js';
import { uploadImageToS3, deleteImageFromS3, getImagesFromS3 } from '../middleware/s3-handler.js';
import { auth } from './../middleware/auth.js';
import parseUserId from './../middleware/parseUserId.js';

const router = Router()

router.post('/:id', parseUserId, auth, uploadImageToS3, saveImageDataToDB)
router.delete('/:id', parseUserId, auth, deleteImageFromS3, deleteImageMetaDataFromDB)
router.get('/', parseUserId, auth, getImagesFromS3, getImage)


export default router