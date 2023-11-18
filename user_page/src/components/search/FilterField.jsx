import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { directions } from '~/common';
import { Typography } from '~/components';
import { ChevronDown } from '~/icons';
import { logger } from '~/utils/logger';

import styles from '~search/filter-field.module.scss';

const cx = classNames.bind(styles);

function FilterField({ heading, data = [] }) {
    const isLogger = useRef(false);
    const heightField = useRef(28);
    const elementRef = useRef();
    const [height, setHeight] = useState(heightField.current);
    const [isOpen, setIsOpen] = useState(true);
    const { categoryId } = useParams();

    useEffect(() => {
        const { scrollHeight } = elementRef.current;
        setHeight(scrollHeight);

        return () => {};
    }, []);

    const handleClick = () => setIsOpen((prev) => !prev);

    if (isLogger.current) {
        logger({ groupName: FilterField.name, values: ['re-render'] });
    }

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
                return (
                    <Typography
                        key={item.id}
                        variant='text1'
                        to={`${directions.search}/${item.id}`}
                        component={NavLink}
                        classes={cx('link', {
                            'link--active': categoryId === item.id,
                        })}
                    >
                        {item.name}
                    </Typography>
                );
            })}
        </div>
    );
}

export default FilterField;
