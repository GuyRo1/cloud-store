import mysql from 'mysql2/promise';



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

export const addNewUserToDB = async (connection, email, password) => {
    try {
        const params = [email, password]
        const query = 'INSERT INTO users(email, password) VALUES (?,?)'
        const ok = await connection.execute(query, params)
        return ok
    } catch (err) {
        throw err
    }
}

export const getUserFromDB = async (connection, email) => {
    try {
        const params = [email]
        const query = 'SELECT * FROM users WHERE email LIKE ?'
        const answer = await connection.execute(query, params)
        const userRecordData = answer[0][0]
        return userRecordData
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
