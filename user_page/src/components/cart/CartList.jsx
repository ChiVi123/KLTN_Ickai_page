import { useSelector } from 'react-redux';
import { contextPage, contextParams } from '~/common';
import { Col, Row, Typography } from '~/components';
import { cartSelector } from '~/redux';
import { logger } from '~/utils/logger';
import CartItem from './CartItem';

function CartList() {
    const isLogger = false;
    const cart = useSelector(cartSelector.selectCart);

    if (isLogger) {
        logger({ groupName: CartList.name, values: [cart] });
    }

    return (
        <Row cols={1} gy={3}>
            <Col>
                <Row>
                    <Col>
                        <Typography variant='text1'>
                            {contextParams.productTotal(cart.totalProduct)}
                        </Typography>
                    </Col>
                    <Col baseCols={2}>
                        <Typography variant='text1' center>
                            {contextPage.quantity}
                        </Typography>
                    </Col>
                    <Col baseCols={2}>
                        <Typography variant='text1' center>
                            {contextPage.resolvePrice}
                        </Typography>
                    </Col>
                    <Col baseCols={1}></Col>
                </Row>
            </Col>

            {/* List */}
            {cart.items.map((item) => (
                <Col key={item.itemId}>
                    <CartItem product={item} isLoading={cart.isLoading} />
                </Col>
            ))}
        </Row>
    );
}

export default CartList;
