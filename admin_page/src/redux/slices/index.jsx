import {
    categories,
    orderHistory,
    products,
    reviews,
    statistical,
    user,
} from '../variables';
import categoriesReducer from './categoriesSlice';
import orderHistoryReducer from './orderHistorySlice';
import productsReducer from './productsSlice';
import reviewsReducer from './reviewsSlice';
import statisticalReducer from './statisticalSlice';
import userReducer from './userSlice';

export const allReducer = {
    [categories.name]: categoriesReducer,
    [orderHistory.name]: orderHistoryReducer,
    [products.name]: productsReducer,
    [reviews.name]: reviewsReducer,
    [statistical.name]: statisticalReducer,
    [user.name]: userReducer,
};
