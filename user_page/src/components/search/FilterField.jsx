import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { keys } from '~/common';
import { Checkbox, Typography } from '~/components';
import { ChevronDown } from '~/icons';
import { createObjectParams } from '~/utils/funcs';
import styles from '~search/filter-field.module.scss';

const cx = classNames.bind(styles);

function FilterField({ heading, inputName, data = [] }) {
    const heightField = 28;
    const [height, setHeight] = useState(heightField);
    const [isOpen, setIsOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const elementRef = useRef();

    useEffect(() => {
        const { scrollHeight } = elementRef.current;
        setHeight(scrollHeight);

        return () => {};
    }, []);

    const handleChange = (value) => {
        setSearchParams((prev) => {
            const params = createObjectParams(prev);
            const cateArray = params?.cates?.split(' ') || [];
            const cateFilter = cateArray.filter((item) => item !== value);
            const newCates =
                cateArray.length > cateFilter.length
                    ? cateFilter
                    : [...cateFilter, value];
            const cates = newCates.join(' ').trim();

            // logger({ groupName: FilterField.name, values: [cates] });

            return {
                ...params,
                cates,
            };
        });
    };
    const handleClick = () => setIsOpen((prev) => !prev);

    return (
        <div
            ref={elementRef}
            style={{ '--scroll-height': `${height}px` }}
            className={cx('field', {
                'field--open': isOpen,
            })}
        >
            <button
                type='button'
                className={cx('heading')}
                onClick={handleClick}
            >
                <Typography variant='text1'>{heading}</Typography>
                <ChevronDown classes={cx('icon', { 'icon--open': isOpen })} />
            </button>
            {data.map((item) => {
                const array = searchParams.get(keys.cates)?.split(' ') || [];

                return (
                    <Checkbox
                        key={item.id}
                        id={item.id}
                        name={inputName}
                        label={item.name}
                        initValue={array.some((value) => value === item.id)}
                        value={item.id}
                        onChange={handleChange}
                    />
                );
            })}
        </div>
    );
}

export default FilterField;
