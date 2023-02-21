import { Button, Tooltip } from 'antd';
import React from 'react';

const UploadImage = ({ src, onDelete }) => {

    return (
        <div className='image_box'>
            <img src={src} alt='not found image'/>
            <Tooltip title='delete image!' placement='bottom' color='orange'>
                <Button style={{ position: 'absolute', bottom: '18px', right: '7px', borderRadius: '14px' }} 
                    danger onClick={() => onDelete(src)}>Delete</Button>
            </Tooltip>           
        </div>        
    );
};

export default UploadImage;