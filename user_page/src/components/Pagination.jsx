import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { keys, types } from '~/common';
import {
    ChevronLeft,
    ChevronRight,
    DoubleChevronLeft,
    DoubleChevronRight,
} from '~/icons';
import { createObjectParams, getPageArray } from '~/utils/funcs';

function Pagination({ total = 7, display = 5, current = 1, step = 1, center }) {
    const [, setSearchParams] = useSearchParams();
    const [pages, setPages] = useState([]);
    const [isFirst, setIsFirst] = useState(current === step);
    const [isLast, setIsLast] = useState(current === total);

    useEffect(() => {
        if (display > total && total !== step) {
            setPages(
                getPageArray({
                    total,
                    length: total,
                    current,
                }),
            );
        }

        if (total === 1) setPages(getPageArray({ length: 0 }));

        setIsFirst(current === step);
        setIsLast(current === total);
    }, [current, display, step, total]);

    const handleFirst = () => {
        setSearchParams((prev) => ({
            ...createObjectParams(prev, [keys.page]),
            page: step,
        }));
    };
    const handlePrev = () => {
        setSearchParams((prev) => ({
            ...createObjectParams(prev, [keys.page]),
            page: current - 1,
        }));
    };
    const handleNext = () => {
        setSearchParams((prev) => ({
            ...createObjectParams(prev, [keys.page]),
            page: current + 1,
        }));
    };
    const handleLast = () => {
        setSearchParams((prev) => ({
            ...createObjectParams(prev, [keys.page]),
            page: total,
        }));
    };
    const handleClick = (value) => {
        setSearchParams((prev) => ({
            ...createObjectParams(prev, [keys.page]),
            page: value,
        }));
    };

    return (
        <div
            className={cx('pages', {
                'pages--center': center,
                'pages--hidden': total <= 1,
            })}
        >
            <button
                type={types.button}
                onClick={handleFirst}
                className={cx('pages-btn', 'pages-btn--border', {
                    'pages-btn--disabled': isFirst,
                })}
            >
                <DoubleChevronLeft />
            </button>
            <button
                type={types.button}
                onClick={handlePrev}
                className={cx('pages-btn', 'pages-btn--border', {
                    'pages-btn--disabled': isFirst,
                })}
            >
                <ChevronLeft classes={cx('chevron')} />
            </button>

            {pages.map((page) => (
                <button
                    type={types.button}
                    to={`?page=${page}`}
                    key={page}
                    onClick={() => handleClick(page)}
                    className={cx('pages-btn', {
                        'pages-btn--active': current === page,
                    })}
                >
                    {page}
                </button>
            ))}

            <button
                type={types.button}
                onClick={handleNext}
                className={cx('pages-btn', 'pages-btn--border', {
                    'pages-btn--disabled': isLast,
                })}
            >
                <ChevronRight classes={cx('chevron')} />
            </button>
            <button
                type={types.button}
                onClick={handleLast}
                className={cx('pages-btn', 'pages-btn--border', {
                    'pages-btn--disabled': isLast,
                })}
            >
                <DoubleChevronRight />
            </button>
        </div>
    );
}

export default Pagination;
