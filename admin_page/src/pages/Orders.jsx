import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { directions, enums, keys, lists, titles } from '~/common';
import { optionSorts } from '~/common/lists';
import {
    ButtonIcon,
    Col,
    Pagination,
    Row,
    SearchList,
    Skeleton,
    SortSelect,
    Table,
    Tabs,
    Typography,
} from '~/components';
import { orderHistorySelector, ordersAsync } from '~/redux';
import { orderServices } from '~/services';
import {
    createObjectParams,
    currencyVN,
    formatDate,
    formatLocalDate,
} from '~/utils/funcs';

import styles from '~/scss/pages/orders.module.scss';

const cx = classNames.bind(styles);
function Orders() {
    const [tabs, setTabs] = useState([]);
    const [startDate, setStartDate] = useState(new Date('01-01-2022'));
    const [endDate, setEndDate] = useState(new Date());
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: orders,
        totalPage,
        isLoading,
    } = useSelector(orderHistorySelector.selectList);

    const skeleton = Array.from({ length: 6 }, (_, index) => index);
    const firstPage = 1;
    const currentPage = parseInt(searchParams.get(keys.page)) || firstPage;
    const query = searchParams.get(keys.query) || '';
    const orderState = searchParams.get(keys.state) || '';
    const orderSort = searchParams.get(keys.sortBy) || '';

    useEffect(() => {
        dispatch(
            ordersAsync.search({
                query,
                sortBy: orderSort,
                from: formatDate(startDate),
                to: formatDate(endDate),
                state: orderState,
                page: currentPage - 1,
            }),
        );
    }, [
        currentPage,
        dispatch,
        endDate,
        orderSort,
        orderState,
        query,
        startDate,
    ]);
    useEffect(() => {
        (async () => {
            const result = (await orderServices.countState()) || [];
            result.pop();
            setTabs(
                result.map((item) => ({
                    ...item,
                    content: enums.contentOrderStates[item.state],
                })),
            );
        })();
    }, []);

    const onStartDate = (value) => {
        setStartDate(value);
        setSearchParams((prev) => ({
            ...createObjectParams(prev),
            page: 1,
        }));
    };
    const onEndDate = (value) => {
        setEndDate(value);
        setSearchParams((prev) => ({
            ...createObjectParams(prev),
            page: 1,
        }));
    };

    return (
        <section className='section section--full-screen'>
            <Typography variant='h2'>{titles.orders}</Typography>

            <Tabs tabs={tabs} />

            <Row gx={0} alignItems='center'>
                <Col baseCols={2}>
                    <DateTimePicker
                        clearIcon={null}
                        value={startDate}
                        format='dd/MM/y'
                        className='datetime-picker'
                        onChange={onStartDate}
                    />
                </Col>
                <Col baseCols={2}>
                    <DateTimePicker
                        clearIcon={null}
                        value={endDate}
                        format='dd/MM/y'
                        className='datetime-picker'
                        onChange={onEndDate}
                    />
                </Col>

                <Col>
                    <SearchList placeholder='người nhận hoặc mã đơn hàng...' />
                </Col>

                <Col baseCols={3}>
                    <SortSelect
                        options={optionSorts}
                        defaultValue={orderSort}
                    />
                </Col>
            </Row>

            <Table heads={lists.tableOrders} loading={isLoading}>
                {isLoading &&
                    skeleton.map((item) => (
                        <tr key={item}>
                            <td
                                style={{ padding: '10px' }}
                                className={cx('td-id')}
                            >
                                <Skeleton variant='text' height='26px' />
                            </td>
                            <td
                                style={{ padding: '10px' }}
                                className={cx('td-name')}
                            >
                                <Skeleton variant='text' height='26px' />
                            </td>
                            <td style={{ padding: '10px' }}>
                                <Skeleton variant='text' height='26px' />
                            </td>
                            <td style={{ padding: '10px' }}>
                                <Skeleton variant='text' height='26px' />
                            </td>
                            <td style={{ padding: '10px' }}>
                                <Skeleton variant='text' height='26px' />
                            </td>
                            <td style={{ padding: '10px' }}>
                                <Skeleton variant='text' height='26px' />
                            </td>
                        </tr>
                    ))}

                {!isLoading &&
                    orders.map((order, index) => (
                        <tr key={index}>
                            <td className={cx('td-id')} title={order.id}>
                                {order.id}
                            </td>
                            <td className={cx('td-name')}>
                                {order.delivery.shipName}
                            </td>
                            <td>
                                {formatLocalDate(new Date(order.createdDate))}
                            </td>
                            <td className={cx('td-total')}>
                                {currencyVN(order.totalPrice)}
                            </td>
                            <td>
                                <span className={cx('state', order.state)}>
                                    {enums.orderState[order.state].state}
                                </span>
                            </td>
                            <td>
                                <ButtonIcon
                                    to={directions.orderDetail(order.id)}
                                >
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
