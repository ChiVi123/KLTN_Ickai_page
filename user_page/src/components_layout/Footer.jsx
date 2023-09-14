import classNames from 'classnames/bind';
import { contextPage } from '~/common';
import styles from '~/scss/layouts/footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <p className={cx('text')}>{contextPage.footer}</p>
        </footer>
    );
}

export default Footer;
