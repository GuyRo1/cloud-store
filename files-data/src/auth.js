import axios from 'axios'

const authHost = process.env.AUTH_SERVICE_HOST
const authPort = process.env.AUTH_SERVICE_PORT
const url = `http://${authHost}:${authPort}/check-token`;



export const auth = async (req, res, next) => {
    const errorReturnObject = { error: 'Unauthorized' }

    if (!req.header('Authorization'))
        return res.status(401).send(errorReturnObject)      
    const data = {
        id: req.params.id,
        token: req.header('Authorization').replace('Bearer ', '')
    }
    
    if (!data.id || !data.token)
        return res
            .status(401)
            .send(errorReturnObject)

    const axiosOptions = {
        method: 'post',
        url,
        data: {
            ...data
        }
    }

    try {
        const { status } = await axios(axiosOptions)
        if (status !== 200)
            return res
                .status(401)
                .send(errorReturnObject)
        next()
    } catch (err) {
        return res
            .status(401)
            .send(errorReturnObject)
    }
}


