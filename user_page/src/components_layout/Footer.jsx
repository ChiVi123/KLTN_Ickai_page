import {
    faFacebookSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { contextPage } from '~/common';
import styles from '~/scss/layouts/footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer>
            <div className={cx('footer-top')}>
                <div className='container'>
                    <div className='row row-cols-1 gy-2'>
                        <div className='col col-sm-2'>
                            <p className={cx('text', 'text--middle')}>
                                KLTN Nhóm 2
                            </p>
                        </div>
                        <div className='col col-sm-8'>
                            <p className={cx('text', 'text--middle')}>
                                Địa chỉ: 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức,
                                Thành phố Hồ Chí Minh
                            </p>
                        </div>
                        <div className='col col-sm-2'>
                            <p className={cx('text')}>Liên hệ</p>
                            <a
                                href='https://www.facebook.com/chivi1801'
                                target='_blank'
                                rel='noopener noreferrer'
                                className={cx('btn')}
                            >
                                <FontAwesomeIcon icon={faFacebookSquare} />
                            </a>
                            <a
                                href='https://www.linkedin.com/in/chivi18/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className={cx('btn')}
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('footer-bottom')}>
                <div className='container'>
                    <p className={cx('text', 'text--center')}>
                        {contextPage.footer}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
