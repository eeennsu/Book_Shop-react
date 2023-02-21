import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Result, Skeleton, Modal } from 'antd';
import UserFavroritesTable from './sections/UserFavroritesTable';
import Paypal from './sections/Paypal';
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { onPaymentSuccess } from '../../../_actions/user_action';
import { Base, Wrapper } from '../../styled/Styled';

const FavoritesPage = () => {

    const dispatch = useDispatch();
    const { detailFavorites } = useSelector(state => state.user);

    const [isLoading, setIsLoading] = useState(true);    
    const [totalPrice, setTotalPrice] = useState(0);
    const [isPaymentSuc, setIsPaymentSuc] = useState(false);
    const [hasData, setHasData] = useState(false);    
    const [isOpenModal, setIsOpenModal] = useState(true);

    const loadedEnd = useCallback(() => {
        setIsLoading(false);
    }, [isLoading]);     
    
    const zeroTotalPrice = useCallback(() => {
        setTotalPrice(0);
    }, [totalPrice]);

    const HaveData = useCallback(() => {
        setHasData(true);
    }, [hasData]);

    const DontHaveData = useCallback(() => {
        setHasData(false);
    }, [hasData]);

    useEffect(() => {
        if (detailFavorites && detailFavorites.length > 0) {
            let total = 0;
            let prices = [...detailFavorites].map((book) => book.price);

            total = [...prices].reduce((prev, next) => prev + next);             
            setTotalPrice(total);    
        }       
    }, [detailFavorites]);  

    const onSucPayCB = useCallback((data) => {  
        console.log(data); 
      
        (async () => {
            let variables = {
                detailFavorites: detailFavorites,
                paymentData: data
            };   
            
            try {
                const response = await axios.post(`${USER_SERVER}/paymentSuc`, variables);    
                const { suc, favorites, detailFavorites } = response.data;
                
                if (suc) {
                    zeroTotalPrice();
                    
                    dispatch(onPaymentSuccess(favorites, detailFavorites));
                    setIsPaymentSuc(true);  
                    DontHaveData();             
                } else {
                    message.error('err');
                }                
            } catch (error) {
                
            }
        })();
    }, [detailFavorites]);

    const onCanPayCB = useCallback(() => {
        message.info('Payment canceled');
    }, []);

    const onErrPayCB = useCallback(() => {
        message.error('There was an error in payment. Please contact the administrator');
    }, []);

    return (
        <Base>
            <Wrapper className='d-flex justify-content-center justify-content-md-start'>
                <h2>My Favoirtes</h2>
            </Wrapper>            
            <Wrapper>
                <UserFavroritesTable 
                    detailFavorites={detailFavorites} 
                    isLoading={isLoading} 
                    loadedEnd={loadedEnd}   
                    zeroTotalPrice={zeroTotalPrice}   
                    isPaymentSuc={isPaymentSuc}  
                    hasData={hasData}     
                    HaveData={HaveData}    
                    DontHaveData={DontHaveData}   
                    />                    
            </Wrapper>
            <Wrapper mt={3} className='d-flex justify-content-between'>
                <h3>Total amount $ { isLoading ? <Skeleton.Input active/> : totalPrice}</h3>
                <div style={{ visibility: hasData ? 'visible' : 'hidden' }}>
                    <Paypal 
                        total={totalPrice}
                        onSucPayCB={onSucPayCB}
                        onCanPayCB={onCanPayCB} 
                        onErrPayCB={onErrPayCB}                      
                    />
                </div>  
            </Wrapper>     
            {
                isPaymentSuc && isOpenModal &&  
                <Modal open={isOpenModal} footer={null} centered width={900} closable onCancel={() => setIsOpenModal(false)}>
                   <Result status='success' title='Successfully Purchased Items' />
                </Modal>
            }    
        </Base>
    );
};

export default FavoritesPage;