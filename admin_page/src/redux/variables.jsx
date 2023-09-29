import { createObjectList } from '~/utils/funcs';

export const products = {
    name: 'products',
    initialState: {
        admin: createObjectList(),
        item: {
            category: '',
            category_id: '',
            description: '',
            id: '',
            images: [],
            isLoading: false,
            message: '',
            name: '',
            price: 0,
            quantity: 0,
            sale: 0,
            summary: 'summary',
            tags: [],
            state: '',
        },
    },
};
export const categories = {
    name: 'categories',
    initialState: {
        admin: createObjectList(),
        client: createObjectList(),
    },
};
export const user = {
    name: 'user',
    initialState: {
        accessToken: '',
        address: '',
        admin: createObjectList(),
        avatar: '',
        email: '',
        id: '',
        name: '',
        phone: '',
        role: '',
    },
};
export const orderHistory = {
    name: 'orderHistory',
    initialState: {
        admin: createObjectList(),
    },
};
export const reviews = {
    name: 'reviews',
    initialState: {
        admin: createObjectList(),
    },
};
export const statistical = {
    name: 'statistical',
    initialState: {
        isLoading: false,
        statisticalAmount: [],
        message: '',
    },
};

export const typeState = {
    categories: categories.initialState,
    orderHistory: orderHistory.initialState,
    products: products.initialState,
    reviews: reviews.initialState,
    user: user.initialState,
    statistical: statistical.initialState,
};
