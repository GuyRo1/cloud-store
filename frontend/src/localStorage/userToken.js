
export const getUserTokenFromLocalStorage = () => {
    if (!window) return null
    const key = 'user-token'
    const value = window.localStorage.getItem(key)
    if (!value) return null
    return JSON.parse(value)
}

export const setUserTokenToLocalStorage = token => {
    if (!window) return null
    const key = 'user-token'
    window.localStorage.setItem(key, JSON.stringify(token))
}

