import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from '~/assets/images';
import { contextPage, contextParams, directions } from '~/common';
import { Button, TextLink, Typography } from '~/components';
import { CartList } from '~/components/cart';
import { cartAsync, cartSelector } from '~/redux';
import { currencyVN } from '~/utils/funcs';

import styles from '~/scss/pages/cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const dispatch = useDispatch();
    const totalPrice = useSelector(cartSelector.selectTotalPrice);
    const totalProduct = useSelector(cartSelector.selectTotalProduct);

    useEffect(() => {
        dispatch(cartAsync.getByToken());
    }, [dispatch]);

    return (
        <div className='width-md'>
            <Typography variant='h4' style={{ marginBottom: '0' }}>
                {!!totalProduct && contextParams.productTotal(totalProduct)}
            </Typography>

            {/* Cart List */}
            {!!totalPrice && <CartList />}

            <div className={`section ${cx('section-bottom')}`}>
                {/* Sub Total */}
                {!!totalPrice && (
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
                )}

                {!totalPrice && (
                    <div className='df-center'>
                        <img src={emptyCart} alt='empty cart' />
                    </div>
                )}

                {/* Actions */}
                <div style={{ marginTop: '8px' }}>
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
                </div>
            </div>
        </div>
    );
}

export default Cart;
