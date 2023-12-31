import classNames from 'classnames/bind';
import { useState } from 'react';
import { Carousel, Col, Skeleton } from '~/components';

import styles from '~product/carousel-product.module.scss';

const cx = classNames.bind(styles);

function CarouselProduct({ images = [] }) {
    const [indexImage, setIndexImage] = useState(0);
    const handleClick = (value) => setIndexImage(value);

    return (
        <div className={cx('wrap-image')}>
            <div className={cx('wrap-thumb')}>
                <Skeleton
                    animation='wave'
                    ready={images[indexImage]?.url}
                    height='100%'
                    width='100%'
                    classes={cx('image-thumb')}
                />
                <img
                    src={images[indexImage]?.url}
                    alt={images[indexImage]?.url}
                    loading='lazy'
                    className={cx('image-thumb')}
                />
            </div>

            {!!images[0]?.url && (
                <Carousel cols={3} gx={2}>
                    {images.map((image, index) => (
                        <Col key={index} classes={cx('center')}>
                            <img
                                src={image?.url}
                                alt={image?.id_image}
                                className={cx('image', {
                                    'image--active': index === indexImage,
                                })}
                                onClick={() => handleClick(index)}
                            />
                        </Col>
                    ))}
                </Carousel>
            )}
        </div>
    );
}

export default CarouselProduct;
