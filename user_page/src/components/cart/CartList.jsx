import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import { cartSelector } from '~/redux';
import { logger } from '~/utils/logger';
import styles from '~cart/cart-list.module.scss';

import CartItem from './CartItem';

const cx = classNames.bind(styles);

function CartList() {
    const isLogger = false;
    const cart = useSelector(cartSelector.selectList);

    if (isLogger) {
        logger({ groupName: CartList.name, values: [cart] });
    }

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
