import bcrypt from 'bcrypt'

export const getHashForPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
}

export const isPasswordMatchesHash =
    async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword)
    }