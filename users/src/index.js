import usersRouter from './routers/users.router.js';
import { connectToDB } from './db/mysql.js';
import { createServer } from './app.js';

const app = createServer();
const mysqlConnection = await connectToDB()
app.set('mysqlConnection',mysqlConnection)
console.log("server has a connection to mysql")
app.use(usersRouter);
const port = process.env.PORT
app.listen(port,
    () =>
        console.log(`Server is listening on port:${port}`));

   
        
       
   

