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
    }, []);

    useEffect(() => {
        dispatch(orderHistoryActions.filter(tab.value));
    }, [dispatch, tab]);

    const handleClickTab = (tab) => setTab(tab);

    return (
        <div className='width-md'>
            <div className='section' style={{ marginBottom: '16px' }}>
                <Typography variant='h2'>
                    {contextPage.titleOrdersPage}
                </Typography>
            </div>
            <nav className='section' style={{ marginBottom: '16px' }}>
                <Tabs tabs={lists.tabs} tab={tab} onClick={handleClickTab} />
            </nav>

            <div className='width-sm'>
                <Row cols={1} gy={1}>
                    {isLoading
                        ? skeleton.map((_, index) => (
                              <Col key={index}>
                                  <OrderItemSkeleton />
                              </Col>
                          ))
                        : orders.map((order, index) => (
                              <Col key={index}>
                                  <OrderItem order={order} />
                              </Col>
                          ))}
                </Row>
            </div>
        </div>
    );
}

export default OrderHistory;
