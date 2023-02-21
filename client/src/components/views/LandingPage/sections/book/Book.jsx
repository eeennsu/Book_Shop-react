import { Card } from 'antd';
import React, { useRef, useEffect, memo }  from 'react';
import styled from 'styled-components';
import useIntersectionObserver from '../../../../utils/customHook/useIntersectionObserver';
import { priceFormat } from '../../../../utils/functions';
import ImageSlider from './ImageSlider';
const { Meta } = Card;

const TabTitle = styled.span`
	font-size: 15px;
`;

const tabList = [
    {
      key: 'price',
      tab: <TabTitle>price</TabTitle>,
    },
    {
      key: 'description',
      tab: <TabTitle>description</TabTitle>,
    },
];

const Book = memo(({ title, type, price, images, isLast, cb }) => {

    const targetRef = useRef(null);
    const entry = useIntersectionObserver(targetRef);
    const isIntersecting = entry?.isIntersecting;

    useEffect(() => {  
       (isLast && isIntersecting) && cb();
    }, [isLast, isIntersecting]);
    
    return (
        <Card 
            className='book_card' 
            cover={<ImageSlider images={images} type={type}/>}  
            ref={targetRef}
            hoverable
            > 
            <Meta 
                title={title} 
                description={`${priceFormat(price)} Won`}
                style={{ width: '100%', overflow: 'hidden', fontWeight: 'bolder' }}/>                 
        </Card>                  
    );
});

export default Book;