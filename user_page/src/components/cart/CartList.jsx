import { useSelector } from 'react-redux';
import { Col, Row } from '~/components';
import { cartSelector } from '~/redux';
import { logger } from '~/utils/logger';
import CartItem from './CartItem';

function CartList() {
    const isLogger = false;
    const cart = useSelector(cartSelector.selectList);

    if (isLogger) {
        logger({ groupName: CartList.name, values: [cart] });
    }

    return (
        <Row cols={1} gy={1}>
            {cart.map((item) => (
                <Col key={item.itemId}>
                    <CartItem product={item} isLoading={cart.isLoading} />
                </Col>
            ))}
        </Row>
    );
}

export default CartList;
