import React, { useState } from 'react';
import useGetBookTypes from '../../../../utils/customHook/useGetBookTypes';
import { Checkbox, Col, Collapse, Row } from 'antd';
const { Panel } = Collapse;

const BookTypeCheckbox = ({ handleFilters, reloading }) => {

    const types = useGetBookTypes();
    const [checked, setChecked] = useState([]);

    const handleCheck = (value) => {
        reloading();
        let newChecked = [...checked];
        let checkedIndex = newChecked.indexOf(value);

        checkedIndex === -1 ? newChecked.push(value) : newChecked.splice(checkedIndex, 1);
        setChecked(newChecked);
        handleFilters(newChecked);
    };

    const renderCheckboxList = () => {
        return types.map(({ name, index }) => (
            <Col key={index} span={4}>
                <Checkbox                   
                    onChange={() => handleCheck(name)} 
                    type='checkbox' 
                    checked={checked.indexOf(name) !== -1}>
                    <span>{name}</span>
                </Checkbox>
            </Col>           
        ));          
    };

    return (      
        <Collapse defaultActiveKey={['0']} className='menu_collapse'>
            <Panel header='Book Types' key='1'>
                <Row gutter={[16, 16]}>
                    { renderCheckboxList() }
                </Row>                 
            </Panel>            
        </Collapse>        
    );
};

export default BookTypeCheckbox;