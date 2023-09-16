import classNames from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';
import { contextPage, keys, lists, types } from '~/common';
import { Typography } from '~/components';
import { createObjectParams } from '~/utils/funcs';
import styles from '~search/sorts.module.scss';

const cx = classNames.bind(styles);

function Sorts({ classes }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const isActive = ({ value, order }) => {
        if (!searchParams.get(keys.sortBy)) return false;

        const isMatch = searchParams.get(keys.sortBy) === value;

        if (!searchParams.get(keys.order)) return isMatch;

        return searchParams.get(keys.order) === order && isMatch;
    };
    const handleClick = (sortBy, order) => {
        setSearchParams((prev) => {
            const orderObject = {};
            const oldParams = createObjectParams(prev, [
                keys.sortBy,
                keys.order,
            ]);

            if (order) orderObject.order = order;

            return {
                ...oldParams,
                sortBy,
                ...orderObject,
            };
        });
    };

    return (
        <div
            className={cx('sorts', {
                [classes]: classes,
            })}
        >
            <Typography variant='text1' classes={cx('sorts-text')}>
                {contextPage.sort}
            </Typography>
            {lists.sorts.map((sort) => {
                const array = [sort.value, sort?.order];

                return (
                    <button
                        key={sort.name}
                        type={types.button}
                        onClick={() => handleClick(...array)}
                        className={cx('sorts-btn', {
                            'sorts-btn--active': isActive({
                                value: sort.value,
                                order: sort?.order,
                            }),
                        })}
                    >
                        {sort.name}
                    </button>
                );
            })}
        </div>
    );
}

export default Sorts;
