import '../styles/components/file.css'
import { useEffect, useContext } from 'react';
import { AiOutlineFileImage } from 'react-icons/ai'
import { TiDocumentDelete } from 'react-icons/ti'
import { deleteFile, getFile, getFiles } from './../api/user';
import { useRef } from 'react';
import { UserContext } from './../context/user.context';
import { refreshFiles } from '../actions/users.actions';

const File = ({ file }) => {

    const { userData, userDataDispatch } = useContext(UserContext)

    const controller = useRef(null);
    useEffect(() => {
        controller.current = new AbortController();
        return () => (controller.current.abort());
    }, []);

    const onClickLink = async event => {
        try {
            event.preventDefault()
            await getFile(controller.current.signal, userData.token, userData.user.id, file.fileKey)
        } catch (err) {
            console.error(err);
        }

    }

    const onClickDelete = async event => {
        event.stopPropagation()
        await deleteFile(controller.current.signal,userData.token,userData.user.id,file.fileKey)
        const files = await getFiles(controller.current.signal, userData.token,userData.user.id)
        userDataDispatch(refreshFiles(files))
       
    }

    

    return (
        <div className='image-container' onClick={onClickLink}>
            <TiDocumentDelete className='delete' onClick={onClickDelete} />
            <AiOutlineFileImage />
            <div className="link-text">
                {file.originalName}
            </div>
        </div>
    )

}

export default File