export const loginAction = ({ user, token,files }) => ({
    type: 'LOGIN',
    payload: {
        type: "USER",
        user,
        token,
        files
    }
})

export const accessSiteAsVisitorAction = () => ({
    type: 'VISITOR'

})


export const logoutAction = () => ({
    type: 'LOGOUT'
})

export const refreshFiles = files => ({
    type:'REFRESH_FILES',
    payload : files
})