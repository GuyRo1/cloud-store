import { BiMessageSquareAdd } from 'react-icons/bi'
import { useRef} from 'react';


const ChooseFile = ({ newFile }) => {

    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    const handleChange = event => {
        newFile(event.target.files[0])
        hiddenFileInput.current.value=""
    }

 


    return (
        <>
            <BiMessageSquareAdd onClick={handleClick} className="add-file" />
            <input type="file" ref={hiddenFileInput} style={{ display: 'none' }} onChange={handleChange} />
        </>
    );
};

export default ChooseFile