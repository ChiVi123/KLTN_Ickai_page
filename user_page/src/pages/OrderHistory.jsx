import { useEffect, useRef, useState } from 'react';
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
    const size = 5;
    const skeleton = toArray(size);
    const [page, setPage] = useState(0);
    const [tab, setTab] = useState(lists.tabs[0]);
    const stateRef = useRef(lists.tabs[0].value);
    const dispatch = useDispatch();
    const {
        items: orders,
        isLoading,
        totalPage,
    } = useSelector(orderHistorySelector.selectFilter);

    useEffect(() => {
        const isChange = tab.value !== stateRef.current;
        let currentPage = isChange ? 0 : page;

        if (isChange) {
            setPage(0);
            stateRef.current = tab.value;
        }

        dispatch(
            ordersAsync.getAllOrder({
                state: tab.value,
                page: currentPage,
                size,
                isChange,
            }),
        );

        return () => {
            dispatch(orderHistoryActions.reset());
            stateRef.current = lists.tabs[0].value;
        };
    }, [dispatch, page, tab.value]);

    function handleClickTab(tab) {
        setTab(tab);
    }
    function handleMore() {
        if (page + 1 < totalPage) {
            setPage(page + 1);
        }
    }

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
                    {orders &&
                        orders.map((order, index) => (
                            <Col key={index}>
                                <OrderItem order={order} />
                            </Col>
                        ))}
                    {isLoading &&
                        skeleton.map((_, index) => (
                            <Col key={index}>
                                <OrderItemSkeleton />
                            </Col>
                        ))}
                </Row>
                {page + 1 < totalPage && (
                    <span
                        style={{
                            display: 'block',
                            marginTop: '20px',
                            textAlign: 'center',
                            color: 'var(--primary-color)',
                            cursor: 'pointer',
                            opacity: isLoading && 0.4,
                        }}
                        onClick={handleMore}
                    >
                        Xem thêm
                    </span>
                )}
            </div>
        </div>
    );
}

export default OrderHistory;
