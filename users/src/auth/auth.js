import axios from 'axios'

const authHost = process.env.AUTH_SERVICE_HOST
const authPort = process.env.AUTH_SERVICE_PORT
const url = `http://${authHost}:${authPort}/get-token`;



export const getToken = async (id) => {
    const axiosOptions = {
        method: 'post',
        url,
        data: {
            id
        }
    }
    try {
        const { data } = await axios(axiosOptions)
        return data.token;
    } catch (err) {
        throw err;
    }
};


