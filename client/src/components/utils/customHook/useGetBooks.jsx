import { message } from 'antd';
import axios from 'axios';
import React, { useState }  from 'react';
import { BOOK } from '../../Config';

function useGetBooks(){
    
    const [books, setBooks] = useState(null);
    const [postSize, setPostSize] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getBooks =  (variables) => {
        (async () => {
            try {
                const response = await axios.post(`${BOOK}/getBooks`, variables);
                const { getBooksSuccess, books, postSize, isAll } = response.data;

                if (getBooksSuccess) {
                    //  필터 상황이면 새로 갱신해야 한다
                    if(variables.loadMore){
                        setBooks(prve => [...prve, ...books]);
                    } else {
                        setBooks(books);
                    }
    
                    setPostSize(postSize);	
                    setIsLoading(false); 
                    //setTimeout(() => {
                    //    setIsLoading(false); 
                    //}, 100000000000);   
                } else {
                    message.error('Failed to import books. Please access again');
                }
            } catch (error) {
                message.error('ERROR - Failed to import books. Please access again');
                console.error(error);
            }
        })();
    };       

    return [books, postSize, getBooks, isLoading, setIsLoading];
}

export default useGetBooks;