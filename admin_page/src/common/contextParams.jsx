export const pageNoteFound = (pathName) =>
    `Xin lỗi, trang ${pathName} không tồn tại!`;
export const address = ({
    shipAddress,
    shipProvince,
    shipDistrict,
    shipWard,
}) => `Địa chỉ: ${shipAddress}, ${shipProvince}, ${shipDistrict}, ${shipWard}`;
