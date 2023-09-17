import { createObjectList } from '~/utils/funcs';

export const products = {
    name: 'products',
    initialState: {
        admin: createObjectList(),
        item: {
            description: '',
            id: '',
            images: [{ id_image: '', url: '' }],
            isLoading: false,
            message: '',
            name: '',
            options: [],
            price: 0,
            quantity: 0,
            sale: 0,
            summary: '',
            tags: [],
            starMembers: [
                { star: 5, members: 0 },
                { star: 4, members: 0 },
                { star: 3, members: 0 },
                { star: 2, members: 0 },
                { star: 1, members: 0 },
            ],
        },
    },
};
export const categories = {
    name: 'categories',
    initialState: {
        isLoadingAdmin: false,
        itemsAdmin: [],
        message: '',
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
