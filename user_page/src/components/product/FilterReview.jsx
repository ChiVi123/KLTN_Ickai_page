import classNames from 'classnames/bind';
import { useState } from 'react';

import { contextPage } from '~/common';
import styles from '~product/filter-review.module.scss';
import Typography from '../Typography';

const cx = classNames.bind(styles);

function FilterReview({ filters = [], component, ...passProps }) {
    const Component = component;
    const zeroStar = 0;
    const [props, setProps] = useState({ value: zeroStar, ...passProps });

    const handleClick = (value) => {
        setProps((prev) => ({ ...prev, value }));
    };

    return (
        <>
            <div className={cx('wrap')}>
                <button
                    type='button'
                    className={cx('btn', {
                        'btn--active': props.value === zeroStar,
                    })}
                    onClick={() => {
                        handleClick(zeroStar);
                    }}
                >
                    <Typography variant='text1'>{contextPage.all}</Typography>
                </button>

                {filters.map((filter) => (
                    <button
                        key={filter.star}
                        type='button'
                        className={cx('btn', {
                            'btn--active': props.value === filter.star,
                        })}
                        onClick={() => handleClick(filter.star)}
                    >
                        <Typography variant='text1'>
                            {filter.star} {contextPage.star} ({filter.members})
                        </Typography>
                    </button>
                ))}
            </div>
            <Component {...props} />
        </>
    );
}

export default FilterReview;
