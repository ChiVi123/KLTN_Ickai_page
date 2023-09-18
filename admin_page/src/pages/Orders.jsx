import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styles from '~/scss/pages/orders.module.scss';

import { directions, enums, keys, lists, titles } from '~/common';
import { Button, Pagination, Table, Typography } from '~/components';
import { orderHistorySelector, ordersAsync } from '~/redux';
import { currencyVN } from '~/utils/funcs';

const cx = classNames.bind(styles);

function Orders() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: orders,
        totalPage,
        isLoading,
    } = useSelector(orderHistorySelector.getOrdersAdmin);

    const displayPages = 5;
    const firstPage = 1;

    useEffect(() => {
        const currentPage = searchParams.get(keys.page) || firstPage;
        dispatch(ordersAsync.getAllOrderEnableByAdmin(currentPage - 1));
    }, [dispatch, searchParams]);

    return (
        <section className='section'>
            <Typography variant='h1'>{titles.orders}</Typography>

            <Table heads={lists.tableOrders} isLoading={isLoading}>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td className={cx('td-id')} title={order.id}>
                            {order.id}
                        </td>
                        <td className={cx('td-name')}>{order.userName}</td>
                        <td>{order.lastModifiedDate || order.createdDate}</td>
                        <td className={cx('td-total')}>
                            {currencyVN(order.totalPrice)}
                        </td>
                        <td>
                            <span className={cx(order.state)}>
                                {enums.orderState[order.state].state}
                            </span>
                        </td>
                        <td>
                            <Button to={directions.orderDetail(order.id)}>
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </Table>

            <Pagination display={displayPages} total={totalPage} center />
        </section>
    );
}

export default Orders;
