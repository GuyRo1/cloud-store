
import { useContext } from 'react';
import { UserContext } from './../context/user.context';
import Login from './Login';
import Drive from './Drive';

const DashBoard = () => {
    const { userData } = useContext(UserContext)

    return (
        <div className='card'>
            {
                userData.type === 'visitor' ?
                    <Login /> :
                    <Drive />
            }
        </div>
    )
}

export default DashBoard