
import { sign, verify } from '../jwt/jwt.js';


export const getToken = async (req, res) => {
    const userId = req.body.id;
    const redisClient = req.app.get('redisClient')
    try {
        const token = await sign(userId)
        await redisClient.set(userId,token)
        res.send({ userId, token })
    } catch (err) {
        res.status(500).send({ error: "Could not save token" })
    }
}

export const checkToken = async (req, res) => {
    const token = req.body.token;
    const userId = req.body.id.toString();
    const redisClient = req.app.get('redisClient')
    try {
        const savedToken = await redisClient.get(userId)
        if (token !== savedToken) return res.status(401).send({ error: "Unauthorized" });
        const decoded = await verify(token)
        if (decoded.userId.toString()!==userId.toString()) 
            return res.status(401).send({ error: "Unauthorized" })
        
        res.send({ message: "verified" })
    } catch (err) {
        res.status(500).send({ error: "Could not check token" });
    }
}