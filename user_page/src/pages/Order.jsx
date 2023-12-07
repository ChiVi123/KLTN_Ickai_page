import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { contextPage, contextParams, enums } from '~/common';
import { Button, Col, Row, Typography } from '~/components';
import { orderServices } from '~/services';
import { currencyVN } from '~/utils/funcs';

import styles from '~/scss/pages/order.module.scss';

const cx = classNames.bind(styles);

function Order() {
    const [order, setOrder] = useState();
    const [isCancel, setIsCancel] = useState(false);
    const { orderId } = useParams();
    const navigate = useNavigate();

    const isCancelDisplay = ({ state = '', paymentType = '' }) => {
        return state === 'pending' && paymentType === 'COD';
    };

    useEffect(() => {
        (async (orderId) => {
            const result = await orderServices.getOrderById(orderId);

            setOrder(result);
            setIsCancel(isCancelDisplay(result));
        })(orderId);
    }, [orderId]);

    const handleCancel = () => {
        Swal.fire({
            title: 'Bạn muốn hủy đơn hàng',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Bỏ qua',
        }).then(async ({ isConfirmed }) => {
            const expectMessage = 'Cancel order successfully';
            if (isConfirmed) {
                try {
                    const result = await orderServices.cancelById(orderId);
                    if (result?.message === expectMessage) {
                        Swal.fire({
                            title: 'Hủy đơn hàng thành công',
                            icon: 'success',
                            confirmButtonText: 'Xác nhận',
                            allowOutsideClick: false,
                        }).then(({ isConfirmed }) => {
                            if (isConfirmed) {
                                navigate(0);
                            }
                        });
                    }
                } catch (error) {
                    const errorMessage = 'You cannot cancel';
                    if (error === errorMessage) {
                        Swal.fire({
                            title: 'Không thể hủy khi đơn hàng đang được giao',
                            icon: 'error',
                            confirmButtonText: 'Xác nhận',
                            allowOutsideClick: false,
                        }).then(({ isConfirmed }) => {
                            if (isConfirmed) {
                                navigate(0);
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Hủy đơn hàng thất bại',
                            icon: 'error',
                            confirmButtonText: 'Xác nhận',
                            allowOutsideClick: false,
                        }).then(({ isConfirmed }) => {
                            if (isConfirmed) {
                                navigate(0);
                            }
                        });
                    }
                }
            }
        });
    };

    return (
        <div className='container'>
            <Row classes='section'>
                <Col baseCols={12} baseColsMd={5} classes={cx('section')}>
                    <Typography variant='h1'>
                        {contextPage.titleOrderPage}
                    </Typography>
                    <Row cols={1} gy={2}>
                        {/* Recipient's name */}
                        <Col>
                            <span className={cx('large-text')}>
                                {contextPage.recipientName}
                                {order?.userName}
                            </span>
                        </Col>

                        {/* Phone */}
                        <Col>
                            <span className={cx('large-text')}>
                                {contextPage.phone}
                                {order?.phone}
                            </span>
                        </Col>

                        {/* Delivery */}
                        <Col>
                            {order?.delivery && (
                                <span className={cx('large-text')}>
                                    {contextParams.address(order?.delivery)}
                                </span>
                            )}
                        </Col>

                        {/* Method payment */}
                        <Col>
                            <span className={cx('large-text')}>
                                {contextPage.methodPay}
                                {order?.paymentType}
                            </span>
                        </Col>

                        {/* State payment */}
                        {order?.paymentType && order?.state && (
                            <Col>
                                <span className={cx('large-text')}>
                                    {contextPage.status}
                                    {enums.payments[order.state].state}
                                </span>
                            </Col>
                        )}

                        {/* Total price */}
                        <Col>
                            <span className={cx('large-text')}>
                                {contextPage.priceTotal}
                            </span>
                            {order?.totalPrice && (
                                <span
                                    className={cx(
                                        'large-text',
                                        'large-text--blue',
                                    )}
                                >
                                    {currencyVN(order?.totalPrice)}
                                </span>
                            )}
                        </Col>

                        {isCancel && (
                            <div
                                className={cx('col', 'l-4')}
                                style={{ marginTop: '12px' }}
                            >
                                <Button color='second' onClick={handleCancel}>
                                    {contextPage.cancel}
                                </Button>
                            </div>
                        )}
                    </Row>
                </Col>

                <Col classes={cx('section')}>
                    <Typography variant='h2'>
                        {contextPage.subTitleOrderPage}
                    </Typography>

                    <ul className={cx('products')}>
                        {order?.items.map((item, index) => (
                            <li key={index} className={cx('product')}>
                                <span className={cx('quantity')}>
                                    {item.quantity}
                                </span>
                                <div className={cx('info')}>
                                    <img
                                        src={item.image[0].url}
                                        alt={item.name}
                                        className={cx('img')}
                                    />
                                    <Typography
                                        variant='h5'
                                        component='h3'
                                        clamp={2}
                                    >
                                        {item.name}
                                    </Typography>
                                </div>
                                {item?.price && (
                                    <span className={cx('text')}>
                                        {currencyVN(item?.subPrice)}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </div>
    );
}

export default Order;
