import { Carousel } from 'antd';
import React, { useState } from 'react';
import { memo } from 'react';
import { useEffect } from 'react';
import { BASE_IMAGE_SRC } from '../../../../Config';


const ImageSlider = memo(({ images, type }) => {

    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', padding: '2px 6px', marginBottom: '12px' }}>
                <span style={{ fontWeight: '500', color: '#06283D' }}>{type}</span>
            </div>        
            <Carousel className='card_carousel' autoplay={true} dotPosition='bottom' effect='fade'>
                {
                    images && images.map(({ imageFilePath, fileName }, i) => {
                        return (
                            <img src={`${BASE_IMAGE_SRC}/${imageFilePath}`} alt='book image' key={fileName}/>
                        )
                    })
                }
            </Carousel>            
        </React.Fragment>
    );
});

export default ImageSlider;