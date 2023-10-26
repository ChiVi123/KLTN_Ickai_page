import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { contextPage, inputNames, notifies, titles } from '~/common';
import { Col, InputQuantity, Row, Typography } from '~/components';
import { TrashIcon } from '~/icons';
import { cartAsync } from '~/redux';
import { cartServices } from '~/services';
import { currencyVN, priceSaleVN } from '~/utils/funcs';
import { logger } from '~/utils/logger';

import styles from '~cart/item.module.scss';

const cx = classNames.bind(styles);

function CartItem({ product, isLoading = false }) {
    const isLogger = false;
    const newPrice = priceSaleVN(product.price, product.sale);
    const [loading, setLoading] = useState(isLoading);
    const dispatch = useDispatch();

    const handleChange = async (value) => {
        setLoading(true);

        const { productid: productId } = product;
        const data = { productId, quantity: value - product?.quantity };
        const result = await cartServices.addCart(data);

        if (!result?.isSuccess) {
            toast.error(notifies.outStock);
        }

        dispatch(cartAsync.getByToken());
        setLoading(false);
    };
    const handleRemove = () => {
        Swal.fire({
            title: titles.confirmRemove,
            confirmButtonText: contextPage.confirm,
            showCancelButton: true,
            cancelButtonText: contextPage.cancel,
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const result = await cartServices.deleteCart(product.itemId);

                if (result?.isSuccess) {
                    dispatch(cartAsync.getByToken());
                } else {
                    toast.error(notifies.removeItemCartFail);
                }
            }
        });
    };

    if (isLogger) {
        logger({
            groupName: CartItem.name,
            values: [product?.quantity, isLoading],
        });
    }

    return (
        <Row classes={cx('wrap')}>
            <Col baseCols={2}>
                <div className={cx('wrap-image')}>
                    <img
                        src={product.image[0].url}
                        alt={product.name}
                        width={170}
                        height={68}
                    />
                </div>
            </Col>

            <Col>
                <Typography variant='h5' clamp={1}>
                    {product.name}
                </Typography>
                <Typography variant='text1' classes={cx('text', 'price-new')}>
                    {currencyVN(newPrice)}
                </Typography>
                <Typography variant='text2' classes={cx('text', 'price-old')}>
                    {!!product.sale && currencyVN(product.price)}
                </Typography>
            </Col>

            <Col baseCols={2}>
                <div className={cx({ loading })}>
                    {!isLoading && (
                        <InputQuantity
                            id={product.itemId}
                            name={inputNames.quantity}
                            initValue={product?.quantity || 1}
                            onChange={handleChange}
                        />
                    )}
                    {isLoading && (
                        <InputQuantity
                            id={product.itemId}
                            name={inputNames.quantity}
                            initValue={product?.quantity || 1}
                        />
                    )}
                </div>
            </Col>
            <Col baseCols={2}>
                <Typography
                    variant='text1'
                    center
                    classes={cx('text', 'price-new')}
                >
                    {currencyVN(product.subPrice)}
                </Typography>
            </Col>
            <Col baseCols={1}>
                <button
                    type='button'
                    aria-label='trash'
                    onClick={handleRemove}
                    className={cx('icon-trash')}
                >
                    <TrashIcon />
                </button>
            </Col>
        </Row>
    );
}

export default CartItem;
