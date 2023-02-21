import { Col, Collapse, Radio, Row } from 'antd';
import React, { memo } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
const { Panel } = Collapse;
const { Group } = Radio;

export const priceRanges = [
    {
        index: 0,
        name: 'Any',
        range: [],
    },
    {
        index: 1,
        range: [0, 5000],
        name: '~ 5000￦',
    },
    {
        index: 2,
        range: [5001, 10000],
        name: '~ 10000￦',
    },
    {
        index: 3,
        range: [10001, 15000],
        name: '~ 15000￦',
    },
    {
        index: 4,
        range: [15001, 25000],
        name: '~ 25000￦',
    },
    {
        index: 5,
        range: [25001, 35000],
        name: '~ 35000￦',
    },
    {
        index: 6,
        range: [35001, 50000],
        name: '~ 50000￦',
    },
    {
        index: 7,
        range: [50001, 10000000],
        name: '50001￦ ~',
    },    
];


const PriceRadio = ({ handleFilters, reloading }) => {   

    const [selectedPrice, setSelectedPrice] = useState(null);

    const renderRadioList = useMemo(() => (
        priceRanges.map(({ index, name }) => (
            <Col key={`range-${index}`} span={6}>
                <Radio value={index} type='radio'>{name}</Radio>
            </Col>
        ))
    ))

    const handleRadio = (e) => {
        reloading();
        setSelectedPrice(e.target.value);
        handleFilters(e.target.value);
    };

    return (    
        <Collapse defaultActiveKey={['0']} className='menu_collapse'>
            <Panel header='Book Price' key='2'>
                <Group onChange={handleRadio} value={selectedPrice}>
                    <Row gutter={[16, 16]}>
                        { renderRadioList }
                    </Row>  
                </Group>                   
            </Panel>
        </Collapse>     
    );
};

export default PriceRadio;