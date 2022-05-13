import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { registerNewUser, logInWithCredentials } from './../api/visitor';
import '../styles/components/login.css'
import { UserContext } from './../context/user.context';
import { loginAction } from './../actions/users.actions';


const Login = () => {

    const [registrationMode, setRegistrationMode] = useState(true)
    const controller = useRef(null);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { userDataDispatch } = useContext(UserContext)


    const onChangeEmail = event => {
        event.preventDefault()
        setEmail(event.target.value)
    }

    const onChangePassword = event => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const toggleModes = () => {
        setRegistrationMode(!registrationMode)
    }

    const message = useMemo(() =>
        registrationMode ? 'got a user? login' : 'register to the site'
        , [registrationMode])

    const headline = useMemo(() =>
        registrationMode ? 'Registration' : 'Log In'
        , [registrationMode])

    useEffect(() => {
        controller.current = new AbortController();
        return () => (controller.current.abort());
    }, []);

    const onSubmit = event => {
        event.preventDefault()

        const submitForm = async () => {
            try {
                if (!!registrationMode)
                await registerNewUser({ email, password }, controller.current.signal)
                const { user, token, files } = await logInWithCredentials({ email, password }, controller.current.signal)
                userDataDispatch(loginAction({ user, token, files }))
            } catch (err) {
                throw err
            }
        }

        submitForm()
        .then()
        .catch(console.error)
    }

    const nonValidForm = useMemo(() =>
        !email || !password
        , [email, password])


    return (
        <div className='card'>
            <form onSubmit={onSubmit}>
                <h2>{headline}</h2>
                <input value={email} placeholder="email" onChange={onChangeEmail} />
                <input value={password} placeholder="password" onChange={onChangePassword} />
                <button disabled={nonValidForm} type="submit">Submit</button>
                <div className="link" onClick={toggleModes}>{message}</div>
            </form>
        </div>
    )
}

export default Login
