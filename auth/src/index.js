import { connectRedisClient } from './db/redis.js';
import authRouter from './routers/auth.router.js';
import { createServer } from './app.js'

const port = process.env.port
const app = createServer()
const redisClient = await connectRedisClient()
app.set('redisClient', redisClient)
console.log("server has redis connection")
app.use(authRouter);
app.listen(port,
    () => {
        console.log(`Server is listening on port:${port}`)
    });

