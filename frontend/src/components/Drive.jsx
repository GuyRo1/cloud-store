
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from './../context/user.context';
import File from './File';
import '../styles/components/drive.css'
import ChooseFile from './ChooseFile';
import { getFiles } from '../api/user';
import { refreshFiles } from '../actions/users.actions';
import { uploadFile } from './../api/user';


const Drive = () => {
    const { userData, userDataDispatch } = useContext(UserContext)
    useEffect(()=>{
        console.log(userData);
    },[userData])
    const controller = useRef()
    useEffect(() => {
        controller.current = new AbortController()
       return (() => {
           controller.current.abort()
       })
   }, [])

    const newFile = async (file) => {
        try{
            const formData = new FormData()
            formData.append('image',file)
            await uploadFile(controller.current.signal, userData.token, userData.user.id, formData)
            const files = await getFiles(controller.current.signal, userData.token,userData.user.id)
            userDataDispatch(refreshFiles(files))
        }catch(err){
            console.error(err);
        }
       
    }





    return (
        <div className="drive">
            <ChooseFile  newFile={newFile} />
            {userData.files && userData.files.length !== 0 ?
                userData.files.map(item =>
                    <File key={item.id} file={item} />

                ) :
                <div className='text'>No files in drive, add a file to test our system</div>
            }
        </div>
    )
}

export default Drive