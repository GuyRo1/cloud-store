import { Readable } from 'stream';
import { saveImageMetaDataToDB, deleteImageFromDB } from './../db/mysql.js';


export const saveImageDataToDB = async (req, res) => {
    if (!req.file) {
        return res.status(422).send(
            { message: "file not uploaded" }
        )
    }
    const fileRecord = {
        owner: req.userId,
        originalName: req.file.originalname,
        storageName: req.file.key.split('/')[1],
        bucket: process.env.S3_BUCKET,
        region: process.env.AWS_REGION,
        key: req.file.key
    }

    try {
        await saveImageMetaDataToDB(req.app.get('mysqlConnection'), fileRecord)
        res.status(201).send({ message: "file was uploaded to the server" })
    } catch (err) {
        return res.status(500).send({ err })
    }
}

export const getImage = async (req, res) => {
    try {
        const imageName = req.query.name
        const stream = Readable.from(req.imageBuffer)
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=${imageName}`
        )
        stream.pipe(res)
    } catch (err) {
        return res.status(500).send({ err })
    }
}

export const deleteImageMetaDataFromDB = async (req, res) => {
    try {

        await deleteImageFromDB(
            req.app.get('mysqlConnection'),
            req.userId,
            req.body.key
        )

        res.send({ message: "item was deleted" })
        
    } catch (err) {
        return res.status(500).send({ err })
    }
}


