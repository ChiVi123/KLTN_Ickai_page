import * as directions from './directions';

export const menuModal = [
    {
        to: directions.profile,
        context: 'Tài khoản',
    },
    {
        to: directions.changePassword,
        context: 'Thay đổi mật khẩu',
    },
    {
        to: directions.orders,
        context: 'Đơn hàng',
    },
    {
        to: directions.cart,
        context: 'Giỏ hàng',
    },
];
export const menuAccount = [
    {
        to: directions.profile,
        context: 'Tài khoản',
    },
    {
        to: directions.changePassword,
        context: 'Thay đổi mật khẩu',
    },
    {
        to: directions.orders,
        context: 'Đơn hàng',
    },
];
export const sorts = [
    { name: 'Mới nhất', value: 'latest' },
    { name: 'Bán chạy', value: 'sold' },
    { name: 'Giá thấp đến cao', value: '' },
    { name: 'Giá cao đến thấp', value: 'priceDesc' },
];
export const sortMobile = [
    { name: 'Mới nhất', value: 'latest' },
    { name: 'Bán chạy', value: 'sold' },
    { name: 'Giá', value: 'priceAsc' },
];
export const tabs = [
    { content: 'Tất cả', value: 'all' },
    { content: 'Đã thanh toán và đang xử lý', value: 'pendingpay' },
    { content: 'Đang xử lý', value: 'pending' },
    { content: 'Đang giao hàng', value: 'delivery' },
    { content: 'Hoàn thành', value: 'complete' },
    { content: 'Đã hủy', value: 'cancel' },
];
