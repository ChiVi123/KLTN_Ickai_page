import classNames from 'classnames/bind';
import { useState } from 'react';

import { Carousel, Col, Skeleton } from '~/components';
import { toArray } from '~/utils/funcs';
import { logger } from '~/utils/logger';

import styles from '~product/carousel-product.module.scss';

const cx = classNames.bind(styles);

function CarouselProduct({ images = [] }) {
    const isLogger = false;
    const skeleton = toArray(3);
    const [indexImage, setIndexImage] = useState(0);
    const handleClick = (value) => setIndexImage(value);

    if (isLogger) {
        logger({ groupName: CarouselProduct.name, values: [...images] });
    }

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

            {!!images[0]?.url || (
                <Carousel cols={3} gx={2}>
                    {skeleton.map((_, index) => (
                        <Col key={index} classes={cx('center')}>
                            <Skeleton
                                animation='wave'
                                height='135px'
                                classes={cx('image')}
                            />
                        </Col>
                    ))}
                </Carousel>
            )}

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
