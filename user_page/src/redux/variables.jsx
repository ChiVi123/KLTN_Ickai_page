import { createObjectList } from '~/utils/funcs';

export const watched = {
    name: 'watched',
    initialState: { list: [] },
};
export const products = {
    name: 'products',
    initialState: {
        client: createObjectList(),
        item: {
            description: '',
            discount: 0,
            id: '',
            images: [{ id_image: '', url: '' }],
            isLoading: false,
            message: '',
            name: '',
            price: 0,
            quantity: 0,
            sale: 0,
        },
    },
};
export const categories = {
    name: 'categories',
    initialState: {
        isLoading: false,
        items: [],
        message: '',
    },
};
export const user = {
    name: 'user',
    initialState: {
        accessToken: '',
        address: '',
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
        list: [],
        ...createObjectList(),
    },
};
export const reviews = {
    name: 'reviews',
    initialState: {
        item: {
            isLoading: false,
            list: [],
            message: '',
            totalPage: 0,
            totalQuantity: 0,
        },
    },
};
export const cart = {
    name: 'cart',
    initialState: {
        isLoading: false,
        items: [],
        total: 0,
        totalPrice: 0,
        totalProduct: 0,
    },
};

export const typeState = {
    cart: cart.initialState,
    categories: categories.initialState,
    orderHistory: orderHistory.initialState,
    products: products.initialState,
    reviews: reviews.initialState,
    user: user.initialState,
    watched: watched.initialState,
};
