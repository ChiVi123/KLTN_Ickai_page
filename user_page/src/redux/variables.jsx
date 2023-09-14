import { createObjectList } from '~/utils/funcs';

export const watched = {
    name: 'watched',
    initialState: { list: [] },
};
export const products = {
    name: 'products',
    initialState: {
        admin: createObjectList(),
        client: createObjectList(),
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
        isLoading: false,
        isLoadingAdmin: false,
        items: [],
        itemsAdmin: [],
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
        admin: createObjectList(),
        client: createObjectList(),
        clientFilter: createObjectList(),
    },
};
export const reviews = {
    name: 'reviews',
    initialState: {
        admin: createObjectList(),
        client: createObjectList(),
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
export const modal = {
    name: 'modal',
    initialState: { isOpen: false },
};

export const typeState = {
    cart: cart.initialState,
    categories: categories.initialState,
    modal: modal.initialState,
    orderHistory: orderHistory.initialState,
    products: products.initialState,
    reviews: reviews.initialState,
    user: user.initialState,
    watched: watched.initialState,
};
