import { ConsoleSqlOutlined, ReadOutlined } from '@ant-design/icons';
import { Button, message, Spin, Typography } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BOOK } from '../../Config';
import BookImages from './sections/BookImages';
import BookInfos from './sections/BookInfos';
import { addToFavorites } from '../../../_actions/user_action';
const { Title } = Typography;

const DetailBookPage = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [detailBook, setDetailBook] = useState({  });    
    const [view, setView] = useState(0);       
    const [btnAddFavorite, setBtnAddFavorite] = useState(false);
	
    useEffect(() => {
        try {
            (async () => {
               //  const response = await axios.post(`${BOOK}getDetailBook`, bookID);    첫번째 방식
                const response = await axios.get(`${BOOK}/getDetailBook?bookId=${params.bookId}&kind=single`);      // 두번째 방식이 가져오는데 더 좋다
                const { getBookSuccess, book } = response.data;
                
                if (getBookSuccess && book) {
                    console.log(book);
                    setDetailBook(book);
                    setView(book.views + 1);
                } else {
                    if (user?.userData.isAuth) {
                        message.error('Book has been deleted or modified');
                    }                   
                }
            })();
        } catch (error) {
            message.error('Failed to load book. please contact the server');
        }
    }, []);     

    const addToFavoriteHandler = () => {     
        setBtnAddFavorite(true);
        try {                         
            dispatch(addToFavorites(params.bookId))
                .then((res) => {          
                    if (res.payload.length > 0) {
                        message.success('add favorite success!');
                    } else {
                        message.error('A server error or unknown error has occurred');
                    }                    
                });       
        } catch (error) {
            console.log(error);
            message.error('To server error or unknown error');
        } finally {
            setBtnAddFavorite(false);
        }         
    };

    // getIsFavorite
    // useEffect(() => {
       
    // }, []);

    // const addToFavoriteHandler = () => {       
    //     // dispatch(addToFavorites(params.bookId, detailBook.title, detailBook.price));
    //     const variable = {
    //         id: params.bookId,
    //         title: detailBook.title,
    //         price: detailBook.price,
    //     };

    //     (async () => {
    //         const response = await axios.post(`${USER_SERVER}/addToFavorites`, variable);
    //         const { success } = response.data;

    //         if (success) {

    //         }
    //     })();
    // };

    // const cancelToFavoriteHandler = () => {

    // };
    
    return (
        <main className='detail_book'>
            <div className='head'>
                <Title level={1} className='text-white'>
                    <ReadOutlined />
                </Title>
            </div>
            {      
                detailBook
                && 
                <div className='body row d-flex justify-content-around'>
                    <div className="col-md-6">
                        <BookImages images={detailBook?.images}/>
                    </div>
                    <div className="col-md-6">
                        <BookInfos 
                            title={detailBook?.title} 
                            price={detailBook?.price}
                            type={detailBook?.type}
                            view={view}
                            description={detailBook?.description}/>
                        <div className='d-flex justify-content-center mb-3 mb-md-0'>
                            <Button 
                                className='btn_favorite'
                                size='large' 
                                shape='round'                                 
                                onClick={addToFavoriteHandler}    
                                disabled={btnAddFavorite}                          
                                >
                                {btnAddFavorite ? <Spin /> : 'Add To Favorite'}                              
                            </Button>
                            {/* {
                                isFavorites ?
                                <Button 
                                    size='large' 
                                    shape='round' 
                                    type='danger'
                                    onClick={params.bookId && detailBook && cancelToFavoriteHandler}
                                    >
                                    Cancel to Favorite <AiFillStar />                               
                                </Button>
                                :
                                <Button 
                                    size='large' 
                                    shape='round' 
                                    type='primary'
                                    onClick={params.bookId && detailBook && addToFavoriteHandler}
                                    >
                                    Add to Favorite <AiFillStar />                               
                                </Button>
                            }                          */}
                        </div>
                    </div>                   
                </div>              
            }        
        </main>
    );
};

export default DetailBookPage;