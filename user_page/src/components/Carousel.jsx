import cx from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from '~/icons';

function Carousel({ children, cols, g, gx, gy, classes }) {
    const [params, setParams] = useState({
        index: 0,
        width: 0,
        limit: 0,
    });
    const element = useRef();

    useEffect(() => {
        if (element.current) {
            const { childNodes } = element.current;

            if (childNodes.length) {
                setParams((prev) => ({
                    ...prev,
                    width: childNodes.item(0).clientWidth,
                    limit: childNodes.length - cols,
                }));
            }
        }
    }, [element, cols]);

    const handlePrev = () => {
        if (params.index === 0) return;

        setParams((prev) => {
            const index = --prev.index;
            return { ...prev, index };
        });
    };
    const handleNext = () => {
        if (params.index === params.limit) return;

        setParams((prev) => {
            const index = ++prev.index;
            return { ...prev, index };
        });
    };

    return (
        <div className='carousel'>
            <div
                ref={element}
                style={{
                    '--index': params.index,
                    '--width': `${params.width}px`,
                }}
                className={cx('list', 'row', 'no-wrap', {
                    [`row-cols-${cols}`]: cols,
                    [`g-${g}`]: g,
                    [`gx-${gx}`]: gx,
                    [`gy-${gy}`]: gy,
                    [classes]: classes,
                })}
            >
                {children}
            </div>
            <button
                type='button'
                title='prev'
                className={cx('btn-prev', {
                    'btn-prev--disable': params.index === 0,
                })}
                onClick={handlePrev}
            >
                <ArrowLeft />
            </button>
            <button
                type='button'
                title='next'
                className={cx('btn-next', {
                    'btn-next--disable': params.index === params.limit,
                })}
                onClick={handleNext}
            >
                <ArrowRight />
            </button>
        </div>
    );
}

Carousel.propTypes = {
    children: PropTypes.node,
    cols: PropTypes.number,
    g: PropTypes.number,
    gx: PropTypes.number,
    gy: PropTypes.number,
    classes: PropTypes.string,
};

export default Carousel;
