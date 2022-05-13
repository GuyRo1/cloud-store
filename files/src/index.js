import { createServer } from './app.js'
import { connectToDB } from './db/mysql.js'
import filesRouter from './routers/files.router.js';

console.log(
    `process is running in ${process.env.NODE_ENV} environment`
)
const app = createServer()
const mysqlConnection = await connectToDB()
app.set('mysqlConnection',mysqlConnection)
console.log("server has mysql connection")
app.use(filesRouter)
const port = process.env.port
app.listen(port,
    () =>
        console.log(`Server is listening on port:${port}`))



