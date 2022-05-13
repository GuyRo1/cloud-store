import mysql from 'mysql2/promise';

let connection

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

export const getUsersFilesData = async (connection, userId) => {
    const params = [userId]
    const query = 'SELECT id,originalName, fileKey FROM files WHERE owner LIKE ?'
    const answer = await connection.execute(query, params)
    return answer[0]
}

