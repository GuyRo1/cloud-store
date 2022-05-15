import { getToken } from '../auth/auth.js';
import { addNewUserToDB, getUserFromDB, getUsersFilesData } from "../db/mysql.js";
import { getHashForPassword, isPasswordMatchesHash } from '../utils/bcrypt.js';
import { userDataForResponse } from '../utils/serialize.js'

export const subscribe = async (req, res) => {
    const mysqlConnection = req.app.get('mysqlConnection')
    if (!req.body.email || !req.body.password)
        return res.status(400).send({ error: "missing email or password" })
    try {
        const hashedPassword = await getHashForPassword(req.body.password)
        await addNewUserToDB(mysqlConnection,req.body.email, hashedPassword)
        res.send("new user was created")
    } catch (err) {
        res.status(500).send({ error: "Problem in connection" })
    }
}

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    const mysqlConnection = req.app.get('mysqlConnection')
    try {
        const userRecord = await getUserFromDB(mysqlConnection,email)
        if (!await isPasswordMatchesHash(password, userRecord.password))
            return res.status(401).send({ message: 'unauthorized' })
        const token = await getToken(userRecord.id)
        const filesRecord = await getUsersFilesData(mysqlConnection,userRecord.id)
        const user = userDataForResponse(userRecord)
        res.send({ user, token, filesRecord })
    } catch (err) {
        res.status(500).send({ error: "Problem in connection" })
    }
}

