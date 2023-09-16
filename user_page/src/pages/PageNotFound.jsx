import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import image from '~/assets/images/404.png';
import { contextParams } from '~/common';
import { Typography } from '~/components';
import styles from '~/scss/pages/page-not-found.module.scss';

const cx = classNames.bind(styles);

function PageNotFound() {
    const { pathname } = useLocation();
    // logger({ groupName: 'Page not found', values: [pathname] });

    return (
        <article className='container'>
            <div className={cx('wrap')}>
                <img src={image} alt='404' width={212} height={95} />

                <div className={cx('background-heading')}>
                    <Typography variant='h1' center>
                        {contextParams.pageNoteFound(pathname)}
                    </Typography>
                </div>
            </div>
        </article>
    );
}

export default PageNotFound;
