import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { contextPage, directions } from '~/common';
import { currencyVN, priceSaleVN } from '~/utils/funcs';
import { Button, Skeleton, Typography } from '.';

function ProductCard({ product }) {
    const percent = 100;
    const priceSale = priceSaleVN(product.price, product.sale);
    const width = Math.floor((1 - product.sale) * percent);

    // logger({ groupName: ProductCard.name, values: [product] });

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
                    <Typography variant='para1' component='h3' clamp={2}>
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

                <div className='stat'>
                    <Typography variant='text2' classes='text-color'>
                        {product?.rate}
                    </Typography>

                    <FontAwesomeIcon icon={faStar} className='stat-icon' />

                    <Typography
                        variant='text2'
                        classes='text-color text-color--sub'
                    >
                        ({product?.starStat})
                    </Typography>
                </div>

                <Button
                    to={directions.cart}
                    disabled={!product?.quantity}
                    color='primary'
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
