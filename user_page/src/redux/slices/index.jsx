import {
    cart,
    categories,
    modal,
    orderHistory,
    products,
    reviews,
    user,
    watched,
} from '../variables';
import cartReducer from './cartSlice';
import categoriesReducer from './categoriesSlice';
import modalReducer from './modalSlice';
import orderHistoryReducer from './orderHistorySlice';
import productsReducer from './productsSlice';
import reviewsReducer from './reviewsSlice';
import userReducer from './userSlice';
import watchedReducer from './watchedSlice';

export const allReducer = {
    [cart.name]: cartReducer,
    [categories.name]: categoriesReducer,
    [modal.name]: modalReducer,
    [orderHistory.name]: orderHistoryReducer,
    [products.name]: productsReducer,
    [reviews.name]: reviewsReducer,
    [user.name]: userReducer,
    [watched.name]: watchedReducer,
};
