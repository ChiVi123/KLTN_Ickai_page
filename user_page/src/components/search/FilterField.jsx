import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { keys } from '~/common';
import { Typography } from '~/components';
import { createObjectParams } from '~/utils/funcs';

import styles from '~search/filter-field.module.scss';

const cx = classNames.bind(styles);

function FilterField({ heading, data = [] }) {
    const isLogger = useRef(false);
    const [searchParams, getSearchParams] = useSearchParams();
    const categoryName = searchParams.get(keys.categoryName) || '';

    if (isLogger.current) {
    }

    function handleClick(value) {
        getSearchParams((prev) => ({
            ...createObjectParams(prev),
            categoryName: value,
        }));
    }

    return (
        <div className={cx('field')}>
            <button type='button' className={cx('heading')}>
                <Typography variant='text1'>{heading}</Typography>
            </button>
            {data.map((item) => {
                return (
                    <Typography
                        key={item.id}
                        variant='text1'
                        classes={cx('link', {
                            'link--active': categoryName === item.name,
                        })}
                        onClick={() => handleClick(item.name)}
                    >
                        {item.name}
                    </Typography>
                );
            })}
        </div>
    );
}

export default FilterField;
