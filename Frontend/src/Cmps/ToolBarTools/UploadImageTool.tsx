import React from 'react';
import axios from 'axios';
import { ReactComponent as Icon } from '../../assets/icons/upload-background-image.svg';
import ReactTooltip from 'react-tooltip';

interface UploadImageProps {
  uploadImg: Function;
}

export const UploadImageTool: React.FC<UploadImageProps> = ({ uploadImg }) => {
  // Async function that uploads chosen image to cloudinery and get the url.a

  const inputHandler = async (ev: any) => {
    const image = ev.target.files[0];
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'project_prints');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/managertools/image/upload',
      data
    );
    uploadImg(res.data.secure_url);
    // console.log(res.data.secure_url)
  };

  return (
    <div className="upload-image tool"> 
      <input data-tip="Upload Image" data-type="info" type="file" name="file" onChange={inputHandler} />       
      <Icon  className="icon" />
      <ReactTooltip />
    </div>
  );
};
