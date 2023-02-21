import { Descriptions, Typography } from 'antd';
import React from 'react';
const { Title } = Typography;
const { Item } = Descriptions;

const BookInfos = ({ title, price, type, view, description }) => {

    return (
        <div className='book_infos_section'>
            <Title level={5} className='book_title'>
                {title}
            </Title>
            <Descriptions 
                labelStyle={{ fontWeight: 'bolder' }} 
                contentStyle={{ fontStyle: 'italic' }} 
                className='book_infos'
                >
                <Item label='Price'>{price}</Item>
                <Item label='Type'>{type}</Item>
                <Item label='View'>{view}</Item>   
            </Descriptions>     
            <Typography.Paragraph className='book_description'>
                {description}
            </Typography.Paragraph>     
        </div>
    );
};

export default BookInfos;