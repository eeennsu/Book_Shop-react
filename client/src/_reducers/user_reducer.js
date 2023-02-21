import { LOGIN_USER, 
    REGISTER_USER, 
    LOGOUT_USER, 
    AUTH_USER, 
    ADD_TO_FAVORITE_USER, 
    GET_FAVORITE_ITEMS_USER, 
    REMOVE_FAVORITE_BOOK, 
    ON_PAYMENT_SUCCESS } 
from "../_actions/types";

const user_reducer = (state = {}, action) => {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload,
            };
         
        case REGISTER_USER:
            return {
                ...state,
                registerSucess: action.payload,
            };        

        case LOGOUT_USER:
            return {
                ...state,
                logoutSucess: action.payload,
            };      
            
        case AUTH_USER: 
            return {
                ...state,
                userData: action.payload,
            };        
        
        case ADD_TO_FAVORITE_USER:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    favorites: action.payload
                }
            };

        case GET_FAVORITE_ITEMS_USER:           
            return {
                ...state,
                detailFavorites: action.payload
            };

        case REMOVE_FAVORITE_BOOK:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    favorites: action.payload.favorites
                },
                detailFavorites: action.payload.detailFavorites
            };

        case ON_PAYMENT_SUCCESS: 
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    favorites: action.payload.favorites,
                },
                detailFavorites: action.payload.detailFavorites
            };

        default: 
            return {
                ...state
            };
    }
};

export default user_reducer;