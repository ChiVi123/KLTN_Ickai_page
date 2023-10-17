import classNames from 'classnames/bind';
import styles from '~/scss/components/icon.module.scss';

const cx = classNames.bind(styles);
function PayPal() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='-12 0 140 140'
            className={cx('icon')}
        >
            <path
                d='M192.95,386.87h38.74c20.8,0,28.63,10.53,27.42,26-2,25.54-17.44,39.67-37.92,39.67H210.85c-2.81,0-4.7,1.86-5.46,6.9L201,488.74c-0.29,1.9-1.29,3-2.79,3.15H173.87c-2.29,0-3.1-1.75-2.5-5.54l14.84-93.93C186.79,388.66,188.85,386.87,192.95,386.87Z'
                transform='translate(-143.48 -354.54)'
                className={cx('paypal-1')}
            />
            <path
                d='M168.72,354.54h38.78c10.92,0,23.88.35,32.54,8,5.79,5.11,8.83,13.24,8.13,22-2.38,29.61-20.09,46.2-43.85,46.2H185.2c-3.26,0-5.41,2.16-6.33,8l-5.34,34c-0.35,2.2-1.3,3.5-3,3.66H146.6c-2.65,0-3.59-2-2.9-6.42L160.9,361C161.59,356.62,164,354.54,168.72,354.54Z'
                transform='translate(-143.48 -354.54)'
                className={cx('paypal-2')}
            />
            <path
                d='M179.43,435.29l6.77-42.87c0.59-3.76,2.65-5.56,6.75-5.56h38.74c6.41,0,11.6,1,15.66,2.85-3.89,26.36-20.94,41-43.26,41H185C182.44,430.72,180.56,432,179.43,435.29Z'
                transform='translate(-143.48 -354.54)'
                className={cx('paypal-3')}
            />
        </svg>
    );
}

export default PayPal;
