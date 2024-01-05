export const productTotal = (quantity) =>
    `Có ${quantity} sản phẩm trong giỏ hàng`;
export const cartTotal = (quantity) => `Đơn hàng (${quantity}) sản phẩm`;
export const pageNoteFound = (pathName) =>
    `Xin lỗi, trang ${pathName} không tồn tại!`;
export const titleOrderId = (id) => `Mã đơn hàng: ${id}`;
export const summaryItems = (items) => {
    if (items?.length > 1) {
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
}) => `Địa chỉ: ${shipAddress}, ${shipWard}, ${shipDistrict}, ${shipProvince}`;
export const hello = (username) => `Xin chào ${username}`;
