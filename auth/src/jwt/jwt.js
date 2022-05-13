import jwt from 'jsonwebtoken'


const privateKey = process.env.JWT_SECRET


export const sign = (id) => {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                {
                    userId: id
                },
                privateKey,
                (err, token) => {
                    if (err) reject(err)
                    if (token) resolve(token)
                }
            );
        })
}

export const verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) reject(err)
            if (token) resolve(decoded)
        });
    })
}


