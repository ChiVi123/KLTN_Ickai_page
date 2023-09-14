import Skeleton from '../Skeleton';

function ProductCard() {
    return (
        <div className='product-card'>
            <div className='image'>
                <Skeleton animation='wave' height='218px' />
            </div>

            <section className='body'>
                <Skeleton
                    variant='text'
                    animation='wave'
                    height='56px'
                    marginBottom='16px'
                />

                <div className='price'>
                    <Skeleton variant='text' animation='wave' height='24px' />
                </div>

                <div className='stat'>
                    <Skeleton variant='text' animation='wave' height='14px' />
                </div>

                <Skeleton animation='wave' height='34px' />
            </section>
        </div>
    );
}

export default ProductCard;
