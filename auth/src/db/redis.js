import { createClient } from 'redis';

export const connectRedisClient = async () => {
    try {
        const redisClient = createClient()
        redisClient.on('error',
            (err) => { throw new Error(err) });
        await redisClient.connect();
        Object.freeze(redisClient)
        return redisClient
    } catch (err) {
        throw { status: 500, message: 'could not connect to redis client' }
    }

}