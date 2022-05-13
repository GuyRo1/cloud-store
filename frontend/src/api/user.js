import axios from 'axios'
import fileDownload from 'js-file-download'

export const getFile = async (signal, token, id, fileKey) => {
    const imageName = `download-image-${Date.now()}.jpeg`
    const apiUrl = process.env.REACT_APP_FILES_API
    const config = {
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        },
        url: `${apiUrl}`,
        signal,
        responseType: 'blob',
        params: {
            id: id,
            name: imageName,
            fileKey: fileKey
        }
    }

    try {
        const imageBuffer = await axios(config)
        fileDownload(imageBuffer.data, imageName)
    } catch (err) {
        throw err
    }
}

export const deleteFile = async (signal, token, id, key) => {
    const apiUrl = process.env.REACT_APP_FILES_API
    const config = {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            key
        },
        url: `${apiUrl}/${id}`,
        signal
    }

    try {
        await axios(config)
    } catch (err) {
        throw err
    }
}

export const uploadFile = async (signal, token, id, formData) => {
    const apiUrl = process.env.REACT_APP_FILES_API
    const config = {
        //method: 'post',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
       // url: `${apiUrl}/${id}`,
        formData,
        signal
    }
    try {
        await axios.post(`${apiUrl}/${id}`,formData,config)
    } catch (err) {
        throw err
    }


}

export const getFiles = async (signal, token, id) => {
    const apiUrl = process.env.REACT_APP_FILES_DATA_API
    const config = {
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        },
        url: `${apiUrl}/${id}`,
        signal
    }

    try {
        const response = await axios(config)
        return response.data.files
    } catch (err) {
        throw err
    }

}
