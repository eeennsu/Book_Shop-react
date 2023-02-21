import React from 'react';
import { Input } from 'antd';
import { useState } from 'react';
const { Search } = Input;

const SearchBooks = ({ updateSearchBooks }) => {

    const [searchkeyword, setSearchkeyword] = useState('');

    const onChangeKeyword = (e) => {
        setSearchkeyword(e.target.value);
        updateSearchBooks(e.target.value);
    };

    return (        
        <Search 
            style={{ width: '300px' }}
            value={searchkeyword}
            onChange={onChangeKeyword}
            placeholder='Search By Typing...'/>
    );
};

export default SearchBooks;