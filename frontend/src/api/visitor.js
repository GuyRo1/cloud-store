import axios from 'axios'


export const registerNewUser = async (userData, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_USERS_API
        const config = {
            method: 'post',
            url: `${apiUrl}/subscribe`,
            signal,
            data: {
                email: userData.email,
                password: userData.password
            }
        }
        const response = await axios(config)
        console.log(response)
        return response

    } catch (err) {
        throw err
    }
}

// export const logInWithToken = async (token, signal) => {
//     try {
//         const apiUrl = process.env.REACT_APP_API_URL
//         const config = {
//             method: 'post',
//             url: `${apiUrl}/users/check`,
//             signal,
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }

//         const userData = await axios(config)

//         return userData.data.user
//     } catch (err) {
//         throw err
//     }
// }

export const logInWithCredentials = async (credentials, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_USERS_API
        const config = {
            method: 'post',
            url: `${apiUrl}/login`,
            signal,
            data: {
                email: credentials.email,
                password: credentials.password
            }
        }
 
        const userData = await axios(config)
        console.log(userData);
        return { user: userData.data.user, token: userData.data.token, files: userData.data.filesRecord }
    } catch (err) {
        throw err
    }
}