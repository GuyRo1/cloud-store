import { createContext, useReducer, useEffect } from "react";
import userReducer, { userDataInitialState } from '../reducers/user.reducer'
import { loginAction, accessSiteAsVisitorAction } from '../actions/users.actions'
import MainLoader from '../components/MainLoader'
import { getUserTokenFromLocalStorage } from '../localStorage/userToken';



export const UserContext = createContext()

const UserContextProvider = (props) => {

    const [userData, userDataDispatch] = useReducer(userReducer, userDataInitialState)
    
    useEffect(() => {
        userDataDispatch(accessSiteAsVisitorAction())
        // async function autoLogIn(signal) {
        //     try {
        //         const token = getUserTokenFromLocalStorage()
        //         if (!token) throw new Error('no token found')
        //         const user = await logInWithToken(token, signal)
        //         if (!user) throw new Error('no user found')
        //         userDataDispatch(loginAction({ user, token }))
        //     } catch (err) {
        //         console.error(err);
        //         userDataDispatch(accessSiteAsVisitorAction())
        //     }
        // }
        //auto login functionality for the future
        // const controller = new AbortController();
        // if (userData.type === 'pending')
        //     autoLogIn(controller.signal)

        // return () => {
        //     controller.abort();
        
    }, []);


    return (
        <>
            {
                userData.type !== 'pending'
                    ?
                    <UserContext.Provider value={{ userData, userDataDispatch }}>
                        {props.children}
                    </UserContext.Provider> :
                    <MainLoader />
            }
        </>
    )


}

export default UserContextProvider


