import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useState } from 'react';
import { contextPage, directions, notifies } from '~/common';
import { cartActions } from '~/redux';
import { cartServices } from '~/services';
import { currencyVN, priceSaleVN } from '~/utils/funcs';
import { logger } from '~/utils/logger';
import { Button, Skeleton, Typography } from '.';

function ProductCard({ product }) {
    const isLogger = false;
    const percent = 100;
    const priceSale = priceSaleVN(product.price, product.sale);
    const width = Math.floor((1 - product.sale) * percent);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBuyNow = async () => {
        setIsLoading(true);
        const data = {
            productId: product.id,
            productOptionId: undefined,
            value: undefined,
            quantity: 1,
        };

        const result = await cartServices.addCart(data);

        if (result.isSuccess === 'true') {
            toast.success(notifies.addedItemCartSuccess);
            dispatch(cartActions.increaseQuantity());
            navigate(directions.cart);
        } else {
            toast.error(notifies.addedItemCartFail);
        }

        setIsLoading(false);
    };

    if (isLogger) {
        logger({ groupName: ProductCard.name, values: [product] });
    }

    return (
        <article className='product-card'>
            <Link to={directions.product(product.id)} className='link'>
                <figure className='image'>
                    <img
                        src={product?.images[0]?.url}
                        alt={product.name}
                        loading='lazy'
                    />
                    <Skeleton height='212px' />
                </figure>
            </Link>

            <section className='body'>
                <Link to={directions.product(product.id)} className='link'>
                    <Typography variant='para2' component='h3' clamp={2}>
                        {product.name}
                    </Typography>
                </Link>

                <div className='price'>
                    <span
                        style={{ '--width': `${width}%` }}
                        className='new-price'
                    >
                        {currencyVN(priceSale)}
                    </span>

                    {!!product.sale && (
                        <span className='old-price'>
                            {currencyVN(product.price)}
                        </span>
                    )}
                </div>

                <Button
                    color='primary'
                    disabled={!product?.quantity && !isLoading}
                    onClick={handleBuyNow}
                    classes='btn-link'
                >
                    {product?.quantity
                        ? contextPage.buyNow
                        : contextPage.outOfStock}
                </Button>
            </section>
        </article>
    );
}

export default ProductCard;
