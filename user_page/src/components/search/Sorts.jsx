import classNames from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';
import { contextPage, keys, lists, types } from '~/common';
import { Typography } from '~/components';
import { createObjectParams } from '~/utils/funcs';

import styles from '~search/sorts.module.scss';

const cx = classNames.bind(styles);

function Sorts({ classes }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const isActive = (value) => searchParams.get(keys.sortBy) === value;
    const handleClick = (sortBy) =>
        setSearchParams((prev) => ({
            ...createObjectParams(prev),
            sortBy,
        }));

    return (
        <div
            className={cx('list', {
                [classes]: classes,
            })}
        >
            <Typography variant='text1' classes={cx('list-text')}>
                {contextPage.sort}
            </Typography>
            {lists.sorts.map((sort) => (
                <button
                    key={sort.name}
                    type={types.button}
                    onClick={() => handleClick(sort.value)}
                    className={cx('btn', {
                        'btn--active': isActive(sort.value),
                    })}
                >
                    {sort.name}
                </button>
            ))}
        </div>
    );
}

export default Sorts;
