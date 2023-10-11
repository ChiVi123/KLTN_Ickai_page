import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { contextPage, lists } from '~/common';
import { Col, Row, Typography } from '~/components';
import { OrderItem, Tabs } from '~/components/order_history';
import { OrderItemSkeleton } from '~/components/skeletons';
import {
    orderHistoryActions,
    orderHistorySelector,
    ordersAsync,
} from '~/redux';
import { toArray } from '~/utils/funcs';

function OrderHistory() {
    const skeleton = toArray(10);
    const [tab, setTab] = useState({ content: 'Tất cả', value: '' });
    const dispatch = useDispatch();
    const { items: orders, isLoading } = useSelector(
        orderHistorySelector.selectFilter,
    );

    useEffect(() => {
        dispatch(ordersAsync.getAllOrder());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(orderHistoryActions.filter(tab.value));
    }, [dispatch, tab]);

    const handleClickTab = (tab) => setTab(tab);

    return (
        <div className='width-md'>
            <Row cols={1} gy={3}>
                <Col>
                    <div className='section'>
                        <Typography variant='h1'>
                            {contextPage.titleOrdersPage}
                        </Typography>
                    </div>
                </Col>

                <Col>
                    <nav className='section'>
                        <Tabs
                            tabs={lists.tabs}
                            tab={tab}
                            onClick={handleClickTab}
                        />
                    </nav>
                </Col>

                <Col>
                    <div className='width-sm'>
                        <Row cols={1}>
                            {isLoading &&
                                skeleton.map((_, index) => (
                                    <Col key={index}>
                                        <OrderItemSkeleton />
                                    </Col>
                                ))}

                            {isLoading ||
                                orders.map((order, index) => (
                                    <Col key={index}>
                                        <OrderItem order={order} />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default OrderHistory;
