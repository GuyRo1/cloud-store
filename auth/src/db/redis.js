import { createClient } from 'redis';

export const connectRedisClient = async () => {
    const redisClient = createClient()
    redisClient.on('error',
        (err) => console.error(err));
    await redisClient.connect();
    Object.freeze(redisClient)
    return redisClient
}