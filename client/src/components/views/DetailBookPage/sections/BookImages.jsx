import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { BASE_IMAGE_SRC } from '../../../Config';

const BookImages = ({ images }) => {
    
    const [bookImages, setBookImages] = useState(null);

    useEffect(() => {
        if (images?.length > 0) {

            let array = [];
            
            images.map(({ imageFilePath }) => 
                array = [...array, {
                    original: `${BASE_IMAGE_SRC}/${imageFilePath}`,
                    thumbnail: `${BASE_IMAGE_SRC}/${imageFilePath}`,
                    originalClass: 'detail_book_image',
                }]
            );

            setBookImages(array);
        }
    }, [images]);

    const onImageError = () => {
        message.error('Failed to load image');
    };

    return (
        <div className='book_images'>
            {
               bookImages && 
               <ImageGallery 
                    items={bookImages} 
                    lazyLoad={true} 
                    showBullets={true} 
                    autoPlay={true} 
                    onImageError={onImageError}
                    showFullscreenButton={false}                  
                    />
            }
        </div>
    );
};

export default BookImages;