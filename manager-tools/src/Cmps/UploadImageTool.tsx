import React from 'react';
import axios from 'axios';

interface ToolBarProps  {
    uploadImg: Function
}



export const UploadImageTool:React.FC<ToolBarProps> = ({uploadImg}) => {

    const inputHandler = async (ev: any) => {
        const image = ev.target.files[0];
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "project_prints")
        const res = await axios.post('https://api.cloudinary.com/v1_1/managertools/image/upload', data)
        uploadImg(res.data.secure_url);
        console.log(res.data.secure_url)

    }

    return (
        <>
            <input type="file" name="file" onChange={inputHandler}/>
        </>
    )
}
