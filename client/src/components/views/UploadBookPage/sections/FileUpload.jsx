import React, { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { message, Tooltip } from 'antd';
import { PlusCircleFilled, ToolFilled } from '@ant-design/icons';
import { BASE_IMAGE_SRC, BOOK } from '../../../Config';
import UploadImage from './UploadImage';
import axios from 'axios';


const FileUpload = ({ refresh }) => {

    const [images, setImages] = useState([]);
    const maxImageCount = 5;
    
    const onDrop = (files) => {

        if(images.length >= maxImageCount){
            message.error('Up to 5 images can be uploaded');
            return;
        }

        let formData = new FormData();
  
        formData.append('file', files[0]);
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        };

        (async () => {
            try {               
                const response = await axios.post(`${BOOK}/uploadImage`, formData, config);
                const { uploadSuccess, imageFilePath, fileName } = response.data;

                if(uploadSuccess){
                    setImages(state => [...state, { imageFilePath, fileName }]);
                    refresh([...images, { imageFilePath, fileName }]);
                    
                    message.success('upload book SUCCESS!!');
                } else {
                    message.error('upload book failed...');
                }
            } catch (error) {
                message.error('ERROR - upload book failed...');
                console.error(error);
            }      
        })();        
    };


    const onDeleteImage = useCallback((src) => {
        const realSrc = src.substring(BASE_IMAGE_SRC.length);
        const findIndex = images.findIndex(image => image.imageFilePath === realSrc);
        let newImageArr = [...images];
        newImageArr.splice(findIndex, 1)
        setImages(newImageArr);  
        refresh([...images]);      
    }, [images]);

    
    return (
        <div className='zone_wrapper d-flex row justify-content-center align-items-center'>
            <Dropzone onDrop={onDrop} maxSize={10000000000}>
                {
                    ({ getRootProps, getInputProps }) => (
                        <div className='drop_zone col-md-6 text-center me-md-2' {...getRootProps()}>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className='image_count'>
                                    <Tooltip title='Up to 5 images can be uploaded' color='#06283D' placement='right'>
                                        { images.length } / { maxImageCount }
                                    </Tooltip>                               
                                </div>
                                <input {...getInputProps()}/>
                                <Tooltip title='On Drop Files!' color='#06283D' placement='right'>
                                    <PlusCircleFilled className='plus_icon' />  
                                </Tooltip>                               
                            </div>                         
                        </div>
                    )
                }
            </Dropzone>            
            <div className='image_zone col-md-6 mt-md-0 mt-3'>
                {
                    images &&
                    <div className='image_wrapper'>
                       { images && images.map((image, i) => (
                            <UploadImage key={`productImage-${image.fileName}`} 
                                src={`${BASE_IMAGE_SRC}/${image.imageFilePath}`} onDelete={onDeleteImage}/>                            
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default FileUpload;