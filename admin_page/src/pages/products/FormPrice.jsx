import classNames from 'classnames/bind';
import styles from '~/scss/pages/products/form-price.module.scss';

const cx = classNames.bind(styles);

function FormPrice() {
    return (
        <form className={cx('wrap')}>
            <input
                type='number'
                name='minPrice'
                id='minPrice'
                className={cx('input')}
            />
            <span className={cx('separate')}></span>
            <input
                type='number'
                name='maxPrice'
                id='maxPrice'
                className={cx('input')}
            />
        </form>
    );
}

export default FormPrice;
