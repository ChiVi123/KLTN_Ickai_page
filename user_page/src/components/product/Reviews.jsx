import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import { contextPage, types } from '~/common';
import styles from '~product/review.module.scss';
import TextLink from '../TextLink';
import ReviewItem from './ReviewItem';

const cx = classNames.bind(styles);

function Reviews({ value, reviews = [], isChild = false }) {
    const [height, setHeight] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const elementRef = useRef();

    useEffect(() => {
        const { scrollHeight } = elementRef.current;
        setHeight(scrollHeight);
    }, []);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            {isChild && !!reviews.length && (
                <TextLink
                    type={types.button}
                    classes={cx('text-show')}
                    onClick={handleToggle}
                >
                    {isOpen ? contextPage.showLess : contextPage.more}
                </TextLink>
            )}

            <div
                id={isChild ? '' : 'list'}
                ref={elementRef}
                style={{ '--scroll-height': `${isOpen ? height : 0}px` }}
                className={cx('wrap-list', {
                    'wrap-list--show': isChild,
                })}
            >
                {reviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>
        </>
    );
}

export default Reviews;
