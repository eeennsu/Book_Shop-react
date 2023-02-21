import { PaperClipOutlined } from '@ant-design/icons';
import { Button, Empty, Popover, Skeleton } from 'antd';
import React, { useMemo, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getFavoriteItems, removeFavoriteBook } from '../../../../_actions/user_action';
import { BASE_IMAGE_SRC } from '../../../Config';

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
        background-color: #75a5ec; 
        color: #ffffff;
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
`;


// const Button = styled.button`
//     display: inline-block;
//     outline: none;
//     cursor: pointer;
//     font-weight: 500;
//     border-radius: 3px;
//     padding: 0 15px;
//     border-radius: 4px;
//     color: #47B5FF;
//     background: transparent;
//     line-height: 1.15;
//     font-size: 14px;
//     height: 36px;
//     word-spacing: 0px;
//     letter-spacing: .0892857143em;
//     text-decoration: none;
//     text-transform: uppercase;
//     min-width: 64px;
//     border: 1px solid #f83838;
//     text-align: center;
//     transition: background 280ms cubic-bezier(0.4, 0, 0.2, 1);
//     :hover {
//         background: #f4f4f4;
//     }                  
// `;



const UserFavroritesTable = ({ detailFavorites, isLoading, loadedEnd, zeroTotalPrice, isPaymentSuc, hasData, HaveData, DontHaveData }) => {

    // const columns = useMemo(() => [
    //     {
    //         title: 'Title',
    //         dataIndex: 'title',
    //         key: 'title',            
    //     },
    //     {
    //         title: 'Price',
    //         dataIndex: 'price',
    //         key: 'price',
    //     },
    //     {
    //         title: 'Quantity',
    //         dataIndex: 'quantity',
    //         key: 'quantity'
    //     },
    //     {            
    //         title: 'Remove',
    //         dataIndex: 'remove',
    //         key: 'remove',
    //         // key 중복 오류 발생. 왜 ?? 도대체 ???
    //         render: (_, book, i) =>  <Button key={`btn_remove${book._id}+${i}}`} onClick={() => removeItem(book._id)} type='dashed'>remove</Button>
    //     }
    // ], [detailFavorites]);
    const dispatch = useDispatch(); 
    const { userData } = useSelector(state => state.user);    
    
    useEffect(() => {  
        userData && (async () => {
            if (userData?.favorites?.length > 0) {                 
                const favoriteIds = userData.favorites.map(({ id }) => id);
                await dispatch(getFavoriteItems(favoriteIds, userData.favorites)); 
                HaveData();                    
            }
            
            loadedEnd();
        })();
    }, [userData]);
    
    const imageStyle = useMemo(() => ({ width: '70px', height: '45px' }));

    // 리렌더링으로 인한 key 문제 때문에 map함수를 사용할 수가 없음. 일단 하드코딩으로 잠시 보류
    const Skeletons = useMemo(() => (
        Array.from({ length: 5 }).map((v, i) => (
            <tr key={i}>
                {
                    // th의 길이만큼
                    Array.from({ length: 5 }).map((v, j) => (                                           
                        <Td key={j}>
                            {  
                                j !== 1 ?  
                                
                                <Skeleton active style={{ height: '10px' }} paragraph={{ rows: 0, width: '70%', style: { padding: 0, margin: 0 } }}/>

                                :

                                <Skeleton.Image active style={imageStyle}/>
                            }
                        </Td>
                    ))
                }
            </tr>
        ))       
    ), []);

    const removeItem = (_id) => {
        dispatch(removeFavoriteBook(_id))
            .then((res) => {        
                if (res.payload.favorites <= 0) {
                    DontHaveData();
                    zeroTotalPrice();                   
                }
            });
    };

    const renderItems = () => (

        isLoading ? 

        Skeletons

        :

        !isLoading && hasData && detailFavorites?.map(({ _id, title, images, price, quantity }) => (             
            <tr key={`favorite_book_${_id}`}>
                <Td>
                    <a href={`/book/${_id}`}>
                        {title}<PaperClipOutlined style={{ fontSize: '25px' }}/>
                    </a>                    
                </Td>
                <Td>
                    <Popover content={<img src={`${BASE_IMAGE_SRC}/${images[0].imageFilePath}`} style={{ width: '300px' }}/>}> 
                        <img 
                            style={imageStyle} 
                            alt='book' 
                            src={`${BASE_IMAGE_SRC}/${images[0].imageFilePath}`}/>
                    </Popover>
                </Td>
                <Td>
                    {price} 
                </Td>
                <Td>
                    {quantity}
                </Td>
                <Td align='center' width={200}>
                    <Button onClick={() => removeItem(_id)}><span style={{ color: '#47B5FF' }}>Remove</span></Button>
                </Td>
            </tr>
        ))
    );


    return (       
        <Table >
            <thead>
                <tr>
                    <Th wr={23}>Title</Th>
                    <Th wr={23}>Image</Th>
                    <Th wr={23}>Price / Won</Th>
                    <Th wr={23}>Quantity / EA</Th>
                    <Th wr={8}>Remove</Th>                
                </tr>
            </thead>
            <tbody>
                {renderItems()}
                {
                    // 로딩이 다 끝났는데 데이터가 없으면 ? 또는 계산에 성공하였으면? 교체
                    ((!isLoading && !hasData) || isPaymentSuc) &&
                    <tr style={{ height: 395 }}>
                        <td colSpan={5}>
                            <Empty description={<p>No Favorite Books</p>}/>                  
                        </td>
                    </tr>
                }                
            </tbody>
        </Table>            
    );
};

export default UserFavroritesTable;