import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { contextPage } from '~/common';
import styles from '~product/description.module.scss';
import Skeleton from '../Skeleton';
import TextLink from '../TextLink';
import Typography from '../Typography';

const cx = classNames.bind(styles);

function Description({ textHTML = '' }) {
    const maxHeight = 200;
    const [height, setHeight] = useState(maxHeight);
    const [isOpen, setToggle] = useState(false);
    const elementRef = useRef();
    const newTextHTML = textHTML.concat(`<div class='gradient'></div>`);

    useEffect(() => {
        const { scrollHeight } = elementRef.current;
        setHeight(scrollHeight);
    }, []);

    const handleToggle = () => setToggle((prev) => !prev);

    return (
        <section className='section'>
            <Typography variant='h3'>{contextPage.description}</Typography>

            <Skeleton
                animation='wave'
                ready={textHTML}
                variant='text'
                height={`${maxHeight}px`}
            />

            <div
                ref={elementRef}
                style={{ '--height': `${height}px` }}
                className={cx('description', 'ql-snow', 'ql-editor', {
                    'description--more': isOpen,
                })}
                dangerouslySetInnerHTML={{
                    __html:
                        isOpen || height < maxHeight ? textHTML : newTextHTML,
                }}
            ></div>
            {height > maxHeight && (
                <TextLink type='button' center onClick={handleToggle}>
                    {isOpen ? contextPage.showLess : contextPage.more}
                </TextLink>
            )}
        </section>
    );
}

export default Description;
