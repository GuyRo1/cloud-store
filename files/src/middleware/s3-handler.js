import aws from 'aws-sdk';
import multer from 'multer';
import multerS3, { AUTO_CONTENT_TYPE } from 'multer-s3';

const bucket = process.env.BUCKET_NAME
const bucketHost = process.env.BUCKET_HOST
const bucketPort = process.env.BUCKET_PORT
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_REGION

let s3Config

if(process.env.npm_lifecycle_event==='dev')
 s3Config = {
    accessKeyId,
    secretAccessKey,
    endpoint: `http://${bucketHost}:${bucketPort}`,
    s3ForcePathStyle: true, 
    signatureVersion: 'v4',
    region
}
else 
s3Config={
    region
}

const s3 = new aws.S3(s3Config)

const fileStorage = multerS3({
    s3,
    contentType: AUTO_CONTENT_TYPE,
    contentDisposition: "inline",
    bucket,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
        const currentTime = new Date().getTime()
        const fileName =
            `images/${currentTime}-${file.originalname}`
        cb(null, fileName)
    }
})

export const getImagesFromS3 = async (req, res, next) => {
    const Key = req.query.fileKey

    try {
        const { Body } =
            await s3.getObject({
                Key,
                Bucket: bucket
            }).promise()

        req.imageBuffer = Body
        next()
    } catch (err) {
        throw err
    }
}

export const uploadImageToS3 = multer({
    storage: fileStorage
}).single('image')

export const deleteImageFromS3 = async (req, res, next) => {
    const Key = req.body.key
    try {
        await s3.deleteObject({
            Key,
            Bucket: bucket
        }).promise()

        next()
    } catch (err) {
       return res.status(404).send({
            message: "file not found"
        })
        
    }
}
