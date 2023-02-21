import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TYPE } from '../../Config';

function useGetBookTypes() {

    const [types, setTypes] = useState([]);    
        useEffect(() => {
            (async () => {
                try {
                    const response = await axios.get(`${TYPE}/getTypes`);
                    const { getTypesSuccess, types } = response.data;

                    if(getTypesSuccess){
                        setTypes(types);
                    } else {
                        setTypes(['Failed to get book type information.']);
                    }
                } catch (error) {
                    setTypes(['Failed to get book type information.']);
                    message.error('Failed to get book type information.');
                }
        })();    
    }, []);

    return types;
}

export default useGetBookTypes
