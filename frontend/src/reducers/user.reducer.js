
export const userDataInitialState = { type: "pending", user: null, token: "", files: [] }


const userReducer = (userData, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                type: action.payload.type,
                user: { ...action.payload.user },
                token: action.payload.token, 
                files: action.payload.files
            }

        case "LOGOUT":
            return { type: 'visitor', user: null, token: null ,files:[]}
        case "VISITOR":
            return { type: 'visitor', user: null, token: null ,files:[]}
        case "REFRESH_FILES":
            return {
                type: userData.type,
                user: userData.user ,
                token: userData.token,
                files: action.payload
            }
        default:
            return { ...userData }
    }
}

export default userReducer