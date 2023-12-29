import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import { cartSelector } from '~/redux';
import styles from '~cart/cart-list.module.scss';

import CartItem from './CartItem';

const cx = classNames.bind(styles);

function CartList() {
    const cart = useSelector(cartSelector.selectList);

    return (
        <div className={cx('wrap')}>
            {cart.map((item) => (
                <CartItem
                    key={item.itemId}
                    product={item}
                    isLoading={cart.isLoading}
                />
            ))}
        </div>
    );
}

export default CartList;
