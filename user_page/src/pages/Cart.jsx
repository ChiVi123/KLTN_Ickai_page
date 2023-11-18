import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { contextPage, contextParams, directions } from '~/common';
import { Button, Col, Row, TextLink, Typography } from '~/components';
import { CartList } from '~/components/cart';
import { cartAsync, cartSelector } from '~/redux';
import { currencyVN } from '~/utils/funcs';
import { logger } from '~/utils/logger';

import { emptyCart } from '~/assets/images';
import styles from '~/scss/pages/cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const isLogger = false;
    const dispatch = useDispatch();
    const totalPrice = useSelector(cartSelector.selectTotalPrice);
    const totalProduct = useSelector(cartSelector.selectTotalProduct);

    useEffect(() => {
        dispatch(cartAsync.getByToken());
    }, [dispatch]);

    if (isLogger) {
        logger({ groupName: Cart.name, values: [totalPrice] });
    }

    return (
        <div className='container'>
            <Typography variant='h4' style={{ marginBottom: '0' }}>
                {!!totalProduct && contextParams.productTotal(totalProduct)}
            </Typography>

            {/* Cart List */}
            <div
                style={{
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    marginTop: '16px',
                }}
            >
                <Row cols={1} gy={1}>
                    <Col>{!!totalPrice && <CartList />}</Col>
                </Row>
            </div>

            <div className='section' style={{ marginTop: '16px' }}>
                <Row cols={1} gy={3}>
                    {/* Sub Total */}
                    {!!totalPrice && (
                        <Col>
                            <div
                                className={cx(
                                    'flex',
                                    'flex-end',
                                    'line-bottom',
                                    'gap-1',
                                )}
                            >
                                <Typography variant='text1'>
                                    {contextPage.subTotal}
                                </Typography>
                                <Typography variant='text1'>
                                    {currencyVN(totalPrice)}
                                </Typography>
                            </div>
                        </Col>
                    )}

                    {!totalPrice && (
                        <Col>
                            <div className='df-center'>
                                <img src={emptyCart} alt='empty cart' />
                            </div>
                        </Col>
                    )}

                    {/* Actions */}
                    <Col>
                        {!!totalPrice && (
                            <div className='flex align-center flex-end gap-1'>
                                <Button
                                    to={directions.checkout}
                                    color='primary'
                                    size='sm'
                                >
                                    {contextPage.makePay}
                                </Button>
                                <Button
                                    to={directions.home}
                                    variant='outlined'
                                    color='primary'
                                    size='sm'
                                >
                                    {contextPage.backHome}
                                </Button>
                            </div>
                        )}

                        {!totalPrice && (
                            <TextLink to={directions.home} center>
                                {contextPage.backHome}
                            </TextLink>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Cart;
