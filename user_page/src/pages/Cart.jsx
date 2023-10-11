import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { contextPage, directions } from '~/common';
import { Button, Col, Row, Typography } from '~/components';
import { CartList } from '~/components/cart';
import { cartAsync } from '~/redux';
import { currencyVN } from '~/utils/funcs';
import { logger } from '~/utils/logger';

import styles from '~/scss/pages/cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const isLogger = false;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cartAsync.getByToken());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLogger) {
        logger({ groupName: 'Cart', values: ['re-render'] });
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

                        <CartList />
                    </Col>

                    {/* Sub Total */}
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
                                    {currencyVN(100000)}
                                </Typography>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Col>

                    {/* Actions */}
                    <Col>
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
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Cart;
