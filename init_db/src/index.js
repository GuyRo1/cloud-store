
import mysql from 'mysql2/promise';


const initDB = async () => {
    try {

        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        })

        const createUsersTable =
            `
            CREATE TABLE users (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL);
            `

        await connection.execute(
            createUsersTable
        );

        const creatFilesTable =
            `
            CREATE TABLE files ( 
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            owner INT NOT NULL,
            originalName VARCHAR(255) NOT NULL,
            storageName VARCHAR(255) NOT NULL,
            bucket VARCHAR(255) NOT NULL,
            region VARCHAR(255) NOT NULL,fileKey VARCHAR(255) NOT NULL,
            FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE );
            `
        await connection.execute(
            creatFilesTable
        );

        await connection.end()


    } catch (err) {
        throw err
    }
}

initDB()
    .then(() => { console.log("user and filesData tables where added") })
    .catch(err => { console.error(err) })

