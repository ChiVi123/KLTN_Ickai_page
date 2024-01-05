import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { avatarDefault } from '~/assets/images';
import {
    contextButton,
    contextPage,
    contextParams,
    directions,
    enums,
    titles,
} from '~/common';
import { Button, Col, Row, Typography } from '~/components';
import { orderServices, userServices } from '~/services';
import { currencyVN } from '~/utils/funcs';

import styles from '~/scss/pages/order.module.scss';

const cx = classNames.bind(styles);
function AdminOrder() {
    const [order, setOrder] = useState();
    const [user, setUser] = useState();
    const [orderState, setOrderState] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async (id) => {
            const resultOrder = await orderServices.getOrderById(id);
            const resultUser = await userServices.getUserById(
                resultOrder.userId,
            );
            const state = enums.orderState[resultOrder.state];

            setOrder(resultOrder);
            setOrderState(state[resultOrder.paymentType]);
            setUser(resultUser);
        })(id);
    }, [id]);

    const handleCancel = () => {
        Swal.fire({
            title: 'Bạn muốn hủy đơn hàng',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Bỏ qua',
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const expectMessage = 'Cancel order successfully';
                const result = await orderServices.cancelById(id);

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
        });
    };

    const handleDelivery = () => {
        Swal.fire({
            title: 'Bạn muốn xác nhận đơn hàng',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Bỏ qua',
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const expectMessage = 'Delivery order successfully';
                const result = await orderServices.deliveryById(id);

                if (result?.message === expectMessage) {
                    Swal.fire({
                        title: 'Xác nhận đơn hàng thành công',
                        icon: 'success',
                        confirmButtonText: 'Xác nhận',
                        allowOutsideClick: false,
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            navigate(0);
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Xác nhận đơn hàng thất bại',
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
        });
    };

    const handleComplete = () => {
        Swal.fire({
            title: 'Xác nhận giao hàng thành công',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Bỏ qua',
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const expectMessage = 'Complete order successfully';
                const result = await orderServices.completeById(id);

                if (result?.message === expectMessage) {
                    Swal.fire({
                        title: 'Đã xác nhận đơn hàng',
                        icon: 'success',
                        confirmButtonText: 'Xác nhận',
                        allowOutsideClick: false,
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            navigate(0);
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Xác nhận đơn hàng thất bại',
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
        });
    };

    return (
        <section className='section section--full-screen'>
            <Typography variant='h1'>{titles.order}</Typography>
            <Button to={directions.orders}>{contextButton.backPage}</Button>

            <Row classes={cx('wrap')}>
                <Col baseColsXl={4}>
                    <img
                        src={user?.avatar || avatarDefault}
                        width='100'
                        height='100'
                        alt='avatar'
                        round='100%'
                    />

                    <Typography variant='para1' classes={cx('user-name')}>
                        {contextPage.fieldUsername}
                        {user?.name}
                    </Typography>
                </Col>

                <Col baseColsXl={8}>
                    <Row colsXl={1} gy={3}>
                        {/* Name order */}
                        <Col>
                            <span className={cx('large-text')}>
                                {contextPage.fieldGuestOrder}
                                {order?.userName}
                            </span>
                        </Col>

                        {/* Phone */}
                        <Col>
                            {order?.delivery && (
                                <span className={cx('large-text')}>
                                    {contextPage.fieldPhone}
                                    {order?.phone}
                                </span>
                            )}
                        </Col>

                        {/* Delivery */}
                        <Col>
                            <span className={cx('large-text')}>
                                {order?.delivery &&
                                    contextParams.address(order.delivery)}
                            </span>
                        </Col>

                        {/* Method payment */}
                        <Col>
                            <span className={cx('large-text')}>
                                {contextPage.fieldPayment}
                                {order?.paymentType}
                            </span>
                        </Col>

                        {/* State payment */}
                        {order?.paymentType && order?.state && (
                            <Col>
                                <span className={cx('large-text')}>
                                    {contextPage.fieldState}
                                    {orderState.state}
                                </span>
                            </Col>
                        )}

                        {/* Total price */}
                        <Col baseColsXl={6}>
                            <span className={cx('large-text')}>
                                {contextPage.resolvePrice}
                            </span>
                        </Col>
                        <Col baseColsXl={6}>
                            <span
                                className={cx('large-text', 'large-text--blue')}
                            >
                                {order?.subtotal && currencyVN(order.subtotal)}
                            </span>
                        </Col>

                        {orderState.isCancel && (
                            <Col baseColsXl={4}>
                                <Button color='second' onClick={handleCancel}>
                                    {contextButton.cancelOrder}
                                </Button>
                            </Col>
                        )}

                        {orderState.isDelivery && (
                            <Col baseColsXl={4}>
                                <Button color='third' onClick={handleDelivery}>
                                    {contextButton.confirmOrder}
                                </Button>
                            </Col>
                        )}

                        {orderState.isComplete && (
                            <Col baseColsXl={4}>
                                <Button onClick={handleComplete}>
                                    {contextButton.completeOrder}
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>

            <Typography variant='h2'>{titles.listProductOrder}</Typography>

            <ul className={cx('products')}>
                {order?.items.map((item, index) => (
                    <li key={index} className={cx('product')}>
                        <span className={cx('quantity')}>{item.quantity}</span>
                        <div className={cx('info')}>
                            <img
                                src={item.image[0].url}
                                alt={item.name}
                                className={cx('img')}
                            />
                            <Typography variant='para1' component='h3'>
                                {item.name}
                            </Typography>
                        </div>
                        <span className={cx('text')}>
                            {item?.price && currencyVN(item.price)}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default AdminOrder;
