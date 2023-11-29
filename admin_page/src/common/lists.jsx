import { faMessage } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard,
    faBox,
    faReceipt,
    faRectangleList,
    faTableCells,
} from '@fortawesome/free-solid-svg-icons';
import * as directions from './directions';

export const sidebar = [
    {
        context: 'Thống kê',
        navTo: directions.dashboard,
        icon: faTableCells,
    },
    {
        context: 'Quản lý sản phẩm',
        navTo: directions.products,
        icon: faBox,
    },
    {
        context: 'Quản lý  danh mục',
        navTo: directions.categories,
        icon: faRectangleList,
    },
    {
        context: 'Quản lý đơn hàng',
        navTo: directions.orders,
        icon: faReceipt,
    },
    {
        context: 'Quản lý người dùng',
        navTo: directions.users,
        icon: faAddressCard,
    },
    {
        context: 'Quản lý đánh giá',
        navTo: directions.reviews,
        icon: faMessage,
    },
];
export const tableProducts = [
    'Hình ảnh',
    'Tên sản phẩm',
    'Ngày tạo',
    'Tồn kho',
    'Giá',
    'Các thao tác',
];
export const tableCate = [
    'Tên danh mục  sản phẩm',
    'Trạng thái',
    'Các thao tác',
];
export const tableOrders = [
    'Mã đơn hàng',
    'Tên người đặt',
    'Ngày đặt',
    'Tổng tiền',
    'Trạng thái',
    'Xem chi tiết',
];
export const tableUsers = [
    'Tên người dùng',
    'Số điện thoại',
    'Email',
    'Vai trò',
    'Các thao tác',
];
export const tableReviews = [
    'Tên người dùng',
    'Tên sản phẩm',
    'Lần cuối chỉnh sửa',
    'Các thao tác',
];
export const formatsDescription = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'align',
];
export const modulesDescription = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
        ],
        ['link', { color: [] }],
    ],
};
