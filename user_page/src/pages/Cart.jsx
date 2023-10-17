import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { contextPage, directions } from '~/common';
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

    useEffect(() => {
        dispatch(cartAsync.getByToken());
    }, [dispatch]);

    if (isLogger) {
        logger({ groupName: Cart.name, values: [totalPrice] });
    }

    return (
        <div className='container'>
            <div className='section'>
                <Row cols={1} gy={3}>
                    {/* Cart */}
                    <Col>
                        <Typography variant='h2' component='h3'>
                            {contextPage.cart}
                        </Typography>

                        {!!totalPrice && <CartList />}
                    </Col>

                    {/* Sub Total */}
                    {!!totalPrice && (
                        <Col>
                            <Row classes={cx('line-bottom')}>
                                <Col offset={8}>
                                    <Typography variant='text1' component='h3'>
                                        {contextPage.subTotal}
                                    </Typography>
                                </Col>
                                <Col>
                                    <Typography
                                        variant='text1'
                                        component='h3'
                                        center
                                    >
                                        {currencyVN(totalPrice)}
                                    </Typography>
                                </Col>
                                <Col></Col>
                            </Row>
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
                            <Row>
                                <Col offset={8}>
                                    <Button
                                        to={directions.checkout}
                                        color='primary'
                                        size='sm'
                                    >
                                        {contextPage.makePay}
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        to={directions.home}
                                        variant='outlined'
                                        color='primary'
                                        size='sm'
                                    >
                                        {contextPage.backHome}
                                    </Button>
                                </Col>
                            </Row>
                        )}

                        {!totalPrice && (
                            <TextLink center>{contextPage.backHome}</TextLink>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Cart;
