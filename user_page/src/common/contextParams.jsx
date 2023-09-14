export const productTotal = (quantity) => `Tất cả ${quantity} sản phẩm`;
export const cartTotal = (quantity) => `Đơn hàng (${quantity}) sản phẩm`;
export const pageNoteFound = (pathName) =>
    `Xin lỗi, trang ${pathName} không tồn tại!`;
export const confirmRemoveItemCart = (name) => `Bạn có chắc xóa ${name}`;
export const titleOrderId = (id) => `Mã đơn hàng = ${id}`;
export const summaryItems = (items) => {
    if (items.length > 1) {
        return `${items[0].name} ...và ${items.length - 1} sản phẩm khác.`;
    } else {
        return `${items[0].name}.`;
    }
};
export const address = ({
    shipAddress,
    shipProvince,
    shipDistrict,
    shipWard,
}) => `Địa chỉ: ${shipAddress}, ${shipProvince}, ${shipDistrict}, ${shipWard}`;
