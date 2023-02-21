import { message } from 'antd';
import axios from 'axios';
import { BOOK, USER_SERVER } from '../components/Config';
import { LOGIN_USER, 
    REGISTER_USER, 
    LOGOUT_USER, 
    AUTH_USER, 
    ADD_TO_FAVORITE_USER, 
    GET_FAVORITE_ITEMS_USER, 
    REMOVE_FAVORITE_BOOK, 
    ON_PAYMENT_SUCCESS 
} from './types';

export function loginUser(data){
    //const requsetAll = axios.all([
    //    axios.post(`${USER_SERVER}/login`, data),
    //    axios.post(`${USER_SERVER}/getFavorites`, data),
    //]).then(axios.spread())
    const request = axios.post(`${USER_SERVER}/login`, data)
                         .then(res => res.data);
    
    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function regitserUser(data){
    const request = axios.post(`${USER_SERVER}/register`, data)
                         .then(res => res.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
                         .then(res => res.data);

    return {
        type: LOGOUT_USER,
        payload: request,
    };
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
                         .then(res => res.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}

export function addToFavorites(bookId){
    const request = axios.get(`${USER_SERVER}/addToFavorites?bookId=${bookId}`)
                         .then(res => res.data);
    
    return {
        type: ADD_TO_FAVORITE_USER,
        payload: request,
    }; 
}

export function getFavoriteItems(favoriteIds, userFavorites, hasData){        
    const request = axios.get(`${BOOK}/getDetailBook?bookId=${favoriteIds}&kind=array`)
                         .then(res => {                        
                            userFavorites.map(favoriteItem => {
                                res.data.book.map((item, i) => {
                                    if (favoriteItem.id === item._id) {
                                        res.data.book[i].quantity = favoriteItem.quantity;
                                    }
                                });
                            });
                            
                            return res.data.book;
                         });
    return {
        type: GET_FAVORITE_ITEMS_USER,
        payload: request
    };    
}

export function removeFavoriteBook(_id){
    const requset = axios.get(`${USER_SERVER}/removeFavoriteBook/?bookId=${_id}`)
                         .then(res => {                        
                            // 유저 즐찾 책들의 디테일배열, 즐찾배열
                            const { detailFavorites, favorites } = res.data;
                            favorites.map((book) => {
                                detailFavorites.map((detailBook, i) => {
                                    if (detailBook._id === book.id) {
                                        detailFavorites[i].quantity = book.quantity;
                                    }
                                });
                            });

                            console.log(res.data);
                           
                            return res.data;
                         });

    return {
        type: REMOVE_FAVORITE_BOOK,
        payload: requset
    }
}

export function onPaymentSuccess(favorites, detailFavorites){    

    return {
        type: ON_PAYMENT_SUCCESS,
        payload: {
            favorites: favorites,
            detailFavorites: detailFavorites
        },
    };
}