import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
    ChevronLeft,
    ChevronRight,
    DoubleChevronLeft,
    DoubleChevronRight,
} from '~/icons';
import { params, types } from '~/utils';
import { createObjectParams, getPageArray } from '~/utils/funcs';

function Pagination({ total = 7, display = 5, step = 1, center }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [pages, setPages] = useState([]);
    const [current, setCurrent] = useState(
        parseInt(searchParams.get(params.page)) || 1,
    );
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
        setCurrent(step);
        setSearchParams((prev) => ({
            ...createObjectParams(prev, [params.page]),
            page: step,
        }));
    };
    const handlePrev = () => {
        setCurrent((prev) => prev - 1);
        setSearchParams((prev) => ({
            ...createObjectParams(prev, [params.page]),
            page: current - 1,
        }));
    };
    const handleNext = () => {
        setCurrent((prev) => prev + 1);
        setSearchParams((prev) => ({
            ...createObjectParams(prev, [params.page]),
            page: current + 1,
        }));
    };
    const handleLast = () => {
        setCurrent((prev) => ({ ...prev, current: total }));
        setSearchParams((prev) => ({
            ...createObjectParams(prev, [params.page]),
            page: total,
        }));
    };
    const handleClick = (value) => {
        setCurrent(value);
        setSearchParams((prev) => ({
            ...createObjectParams(prev, [params.page]),
            page: value,
        }));
    };

    return (
        <div className={cx('pages', { 'pages--center': center })}>
            <button
                type={types.button}
                onClick={handleFirst}
                className={cx('pages-btn', 'pages-btn--border', {
                    'pages-btn--hidden': isFirst,
                })}
            >
                <DoubleChevronLeft />
            </button>
            <button
                type={types.button}
                onClick={handlePrev}
                className={cx('pages-btn', 'pages-btn--border', {
                    'pages-btn--hidden': isFirst,
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
                    'pages-btn--hidden': isLast,
                })}
            >
                <ChevronRight classes={cx('chevron')} />
            </button>
            <button
                type={types.button}
                onClick={handleLast}
                className={cx('pages-btn', 'pages-btn--border', {
                    'pages-btn--hidden': isLast,
                })}
            >
                <DoubleChevronRight />
            </button>
        </div>
    );
}

export default Pagination;
