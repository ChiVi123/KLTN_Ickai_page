import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { contextPage, contextParams, inputNames, notifies } from '~/common';
import { Col, InputQuantity, Row, Typography } from '~/components';
import { TrashIcon } from '~/icons';
import { cartAsync } from '~/redux';
import { cartServices } from '~/services';
import { currencyVN, priceSaleVN } from '~/utils/funcs';
import styles from '~cart/item.module.scss';

const cx = classNames.bind(styles);

function CartItem({ product, isLoading = false }) {
    const [loading, setLoading] = useState(isLoading);
    const [quantity, setQuantity] = useState(product?.quantity || 1);
    const dispatch = useDispatch();
    const newPrice = priceSaleVN(product.price, product.sale);
    const handleChange = async (value) => {
        setQuantity(value);
        setLoading(true);

        const { productid: producId } = product;
        const data = {
            producId,
            quantity: value - quantity,
            productOptionId: null,
            value: null,
        };
        const result = await cartServices.addCart(data);
        const expectMessage = 'Update product null in cart success';

        if (result?.message === expectMessage) {
            dispatch(cartAsync.getCartByToken());
        } else {
            toast.error(notifies.error);
        }

        setLoading(false);
    };
    const handleRemove = () => {
        Swal.fire({
            title: contextParams.confirmRemoveItemCart(product.name),
            confirmButtonText: contextPage.confirm,
            showCancelButton: true,
            cancelButtonText: contextPage.cancel,
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const result = await cartServices.deleteCart(product.itemId);
                const expectMessage = `Delete item ${product.itemId} in cart success`;

                if (result?.message === expectMessage) {
                    dispatch(cartAsync.getCartByToken());
                } else {
                    toast.error(notifies.removeItemCartFail);
                }
            }
        });
    };

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
                    <InputQuantity
                        id={product.itemId}
                        name={inputNames.quantity}
                        initValue={quantity}
                        onChange={handleChange}
                    />
                </div>
            </Col>
            <Col baseCols={2}>
                <Typography
                    variant='text1'
                    center
                    classes={cx('text', 'price-new')}
                >
                    {currencyVN(newPrice * product.quantity)}
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
