import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { contextPage, contextParams, enums } from '~/common';
import { Button, Col, Row, Typography } from '~/components';
import { orderServices } from '~/services';
import { currencyVN, priceSaleVN } from '~/utils/funcs';

import styles from '~/scss/pages/order.module.scss';

const cx = classNames.bind(styles);

function Order() {
    const [order, setOrder] = useState();
    const [orderState, setOrderState] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async (id) => {
            const result = await orderServices.userGetOrderById(id);
            const state = enums.orderState[result.state];

            setOrder(result);
            setOrderState(state[result.paymentType]);
        };

        fetchApi(id);
    }, [id]);

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
                    const result = await orderServices.userCancelOrderById({
                        id,
                    });
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
        <div className='width-md'>
            <div className='section'>
                <Typography variant='h1'>
                    {contextPage.titleOrderPage}
                </Typography>

                <div className={cx('section')}>
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
                                    {orderState.isPay}
                                </span>
                            </Col>
                        )}

                        {/* Total price */}
                        <Col baseCols={6}>
                            <span className={cx('large-text')}>
                                {contextPage.priceTotal}
                            </span>
                        </Col>
                        {order?.totalPrice && (
                            <Col baseCols={6}>
                                <span
                                    className={cx(
                                        'large-text',
                                        'large-text--blue',
                                    )}
                                >
                                    {currencyVN(order?.totalPrice)}
                                </span>
                            </Col>
                        )}

                        {orderState?.isCancel && (
                            <div
                                className={cx('col', 'l-4')}
                                style={{ marginTop: '1.2rem' }}
                            >
                                <Button color={'second'} onClick={handleCancel}>
                                    {contextPage.cancel}
                                </Button>
                            </div>
                        )}
                    </Row>
                </div>

                <div className={cx('section')}>
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
                                        {currencyVN(
                                            priceSaleVN(
                                                item?.price,
                                                item?.sale,
                                            ),
                                        )}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Order;
