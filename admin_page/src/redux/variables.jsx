import { createObjectList } from '~/utils/funcs';

export const products = {
    name: 'products',
    initialState: {
        listRoot: [],
        list: createObjectList(),
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
            status: 'pending',
        },
    },
};
export const categories = {
    name: 'categories',
    initialState: {
        allItem: createObjectList(),
        allItemEnabled: createObjectList(),
    },
};
export const user = {
    name: 'user',
    initialState: {
        list: createObjectList(),
        item: {
            id: '',
            name: '',
            email: '',
            avatar: '',
            phone: '',
            address: '',
            role: '',
            accessToken: '',
        },
    },
};
export const orderHistory = {
    name: 'orderHistory',
    initialState: {
        ...createObjectList(),
    },
};
export const reviews = {
    name: 'reviews',
    initialState: {
        ...createObjectList(),
    },
};
export const statistical = {
    name: 'statistical',
    initialState: {
        isLoading: false,
        statisticalAmount: [],
        message: '',
        status: 'pending',
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
