export const payments = {
    cancel: {
        state: 'Hủy đơn hàng',
        COD: 'Chưa thanh toán',
        PAYPAL: 'Chưa thanh toán',
        VNPAY: 'Chưa thanh toán',
    },
    enable: {
        state: 'Trong giỏ hàng',
        COD: 'Chưa thanh toán',
        PAYPAL: 'Chưa thanh toán',
        VNPAY: 'Chưa thanh toán',
    },
    process: {
        state: 'Đang tiến hành',
        COD: 'Chưa thanh toán',
        PAYPAL: 'Chưa thanh toán',
        VNPAY: 'Chưa thanh toán',
    },
    pendingpay: {
        state: 'Đã thanh toán và đang xử lý',
        COD: 'Chưa thanh toán',
        PAYPAL: 'Đã thanh toán',
        VNPAY: 'Đã thanh toán',
    },
    pending: {
        state: 'Đang xử lý',
        COD: 'Chưa thanh toán',
        PAYPAL: 'Đã thanh toán',
        VNPAY: 'Đã thanh toán',
    },
    delivery: {
        state: 'Đang giao hàng',
        COD: 'Chưa thanh toán',
        PAYPAL: 'Đã thanh toán',
        VNPAY: 'Đã thanh toán',
    },
    complete: {
        state: 'Giao hàng thành công',
        COD: 'Đã thanh toán',
        PAYPAL: 'Đã thanh toán',
        VNPAY: 'Đã thanh toán',
    },
};
