
import { connectToDB } from './db/mysql.js';
import { createServer } from './app.js';
import filesDataRouter from './routers/filesData.router.js'

const app = createServer()
const mysqlConnection = await connectToDB()
app.set('mysqlConnection',mysqlConnection)
console.log("server has a connection to mysql")
app.use(filesDataRouter)
const port = process.env.PORT
app.listen(port,
    () =>
        console.log(`Server is listening on port:${port}`));

