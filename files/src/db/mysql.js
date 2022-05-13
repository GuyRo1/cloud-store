import mysql from 'mysql2/promise';
import objectToArray from './../utils/objectToArray.js';

export const connectToDB = async () => {
    try {
        return await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        })
    } catch (err) {
        throw err
    }
}

export const saveImageMetaDataToDB =
    async (connection, fileMetaData) => {
        try {
            const params = objectToArray(fileMetaData)
            const query = 'INSERT INTO files(owner,originalName,storageName,bucket,region,fileKey) VALUES (?,?,?,?,?,?)'
            const ok = await connection.execute(query, params)
            return ok
        } catch (err) {
            throw err
        }
    }

export const deleteImageFromDB =
    async (connection, userId, key) => {
        try {
            const query = 'DELETE FROM files WHERE owner = ? AND fileKey LIKE ?;'
            const params = [userId, key]
            const ok = await connection.execute(query, params)
            return ok
        } catch (err) {
            throw err
        }
    }



