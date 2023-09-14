import * as directions from './directions';

export const menuAccount = [
    {
        to: directions.profile,
        context: 'Tài khoản',
    },
    {
        to: directions.orders,
        context: 'Đơn hàng',
    },
];

export const sorts = [
    { name: 'Mới nhất', value: 'latest' },
    { name: 'Khuyến mãi', value: 'sale' },
    { name: 'Giá: thấp đến cao', value: 'price', order: 'asc' },
    { name: 'Giá: cao đến thấp', value: 'price', order: 'desc' },
];

export const tabs = [
    { content: 'Tất cả', value: '' },
    { content: 'Đã thanh toán', value: 'pendingpay' },
    { content: 'Đang xử lý', value: 'pending' },
    { content: 'Đang vận chuyển', value: 'delivery' },
    { content: 'Hoàn thành', value: 'complete' },
    { content: 'Đã hủy', value: 'cancel' },
];
