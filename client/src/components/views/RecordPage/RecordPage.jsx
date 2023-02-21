import React, { useEffect } from 'react';
import { Base, Wrapper } from '../../styled/Styled';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

const Table = styled.table`
    width: 100%; 
    border-radius: 8px;
    border-collapse: collapse;     
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin: 0 auto;
    td, th {                   
        padding: 14px;
    }    

    tr:nth-child(odd) {
        background-color: #fff;
    }
    
    tr:nth-child(even) {
        background-color: #DFF6FF;
    }

    thead > tr > th {
        background-color: #F0A04B; 
        color: #ffffff;

        &:not(:last-of-type) {
            border-right: 1px solid lightgrey;
        }
    }
    
    tbody > tr{
        transition: 0.15s ease;
    
        &:hover {
            background-color: #f3e8e8; 
        }

        td:not(:last-of-type){
            border-right: 1px solid lightgrey;
        }       
    }
`;

// wr -> width ratio
const Th = styled.th`
    width: ${({ wr }) => wr && `${wr}%`};   
`;

const Td = styled.td`
    padding: '8px';
    font-weight: ${({ bold }) => bold && 'bold'};
    font-style: ${({ italic }) => italic && 'italic'};
`;


const RecordPage = () => {

    const { userData } = useSelector(state => state.user);

    const renderRecord = () => {    
        console.log([...userData?.history]);
        return [...userData?.history].map((arr) => [...arr].map(({ id, title, price, quantity, dateOfPayment }) => (
            <tr key={id}>
                <Td>{title}</Td>
                <Td bold>{price}</Td>            
                <Td bold>{quantity}</Td>
                <Td italic>{dateOfPayment}</Td>          
            </tr>
        )))
    };

    return (
        <Base>
            <Wrapper className='d-flex justify-content-center justify-content-md-start'>
                <h2>My Record</h2>
            </Wrapper>
            <Wrapper>
                <Table>
                    <thead>
                        <tr>
                            <Th wr={30}>Title</Th>
                            <Th wr={20}>Price</Th>
                            <Th wr={20}>Quantity</Th>
                            <Th wr={30}>Date of purchase</Th>                                              
                        </tr>
                    </thead>
                    <tbody> 
                        {
                            userData && renderRecord()
                        }
                    </tbody>
                </Table>
            </Wrapper>
        </Base>
    );
};

export default RecordPage;