import { Link } from 'react-router-dom';
import { directions } from '~/common';
import { currencyVN, priceSaleVN } from '~/utils/funcs';
import Skeleton from './Skeleton';
import Typography from './Typography';

function ProductWatched({ product }) {
    const percent = 100;
    const priceSale = priceSaleVN(product.price, product.sale);
    const width = Math.floor((1 - product.sale) * percent);

    return (
        <article className='product-card'>
            <Link to={directions.product(product.id)} className='link'>
                <figure className='image'>
                    <img src={product?.images[0]?.url} alt={product.name} />
                    <Skeleton ready={false} height='212px' />
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
                    <span className='text-price'>
                        {!!product.sale && currencyVN(product.price)}
                    </span>
                </div>
            </section>
        </article>
    );
}

export default ProductWatched;
