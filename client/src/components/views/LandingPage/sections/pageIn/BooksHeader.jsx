import { BookOutlined } from '@ant-design/icons';
import React from 'react';

const BooksHeader = () => {

    return (     
        <div className='title_box'>
            <BookOutlined style={{ fontSize: '35px', color: '#242729' }}/>
            <h1>Books</h1> 
        </div>                       
    );
};

export default BooksHeader;