import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styles from '~/scss/pages/orders.module.scss';

import { directions, enums, keys, lists, titles } from '~/common';
import { ButtonIcon, Pagination, Table, Typography } from '~/components';
import { orderHistorySelector, ordersAsync } from '~/redux';
import { currencyVN } from '~/utils/funcs';
import { logger } from '~/utils/logger';

const cx = classNames.bind(styles);

function Orders() {
    const isLogger = false;
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: orders,
        totalPage,
        isLoading,
    } = useSelector(orderHistorySelector.getOrdersAdmin);

    if (isLogger) {
        logger({ groupName: Orders.name, values: [totalPage] });
    }

    const firstPage = 1;
    const currentPage = parseInt(searchParams.get(keys.page)) || firstPage;

    useEffect(() => {
        dispatch(ordersAsync.getAllOrderEnableByAdmin(currentPage - 1));
    }, [currentPage, dispatch]);

    return (
        <section className='section section--full-screen'>
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
                            <span className={cx('state', order.state)}>
                                {enums.orderState[order.state].state}
                            </span>
                        </td>
                        <td>
                            <ButtonIcon to={directions.orderDetail(order.id)}>
                                <FontAwesomeIcon icon={faEye} />
                            </ButtonIcon>
                        </td>
                    </tr>
                ))}
            </Table>

            <Pagination total={totalPage} current={currentPage} center />
        </section>
    );
}

export default Orders;
