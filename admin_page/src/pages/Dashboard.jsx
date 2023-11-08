import ProgressBar from '@ramonak/react-progress-bar';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';

import 'react-calendar/dist/Calendar.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import { enums, titles } from '~/common';
import { ChartBar, Col, Row, Typography } from '~/components';
import { statAsync, statSelector } from '~/redux';
import { statisticalServices } from '~/services';
import { formatDate } from '~/utils/funcs';
import { logger } from '~/utils/logger';

import styles from '~/scss/pages/dashboard.module.scss';

const cx = classNames.bind(styles);

const randomColor = () => {
    let result = '';
    do {
        result = Math.floor(Math.random() * 16777215).toString(16);
    } while (result === 'e0e0de');
    return result;
};

function Dashboard() {
    const [categoryCount, setCategoryCount] = useState({
        totalQuantity: 0,
        list: [],
    });
    const [orderCount, setOrderCount] = useState({
        totalQuantity: 0,
        list: [],
    });
    const [productCount, setProductCount] = useState({
        totalQuantity: 0,
        list: [],
    });
    const [userCount, setUserCount] = useState({
        totalQuantity: 0,
        list: [],
    });
    const [startDate, setStartDate] = useState(new Date('12-01-2022'));
    const [endDate, setEndDate] = useState(new Date());
    const { statisticalAmount } = useSelector(statSelector.getStatsAmount);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const resultCount = await statisticalServices.getCountByState();
                const expectMessage = 'Get count by state success';

                if (resultCount?.message === expectMessage) {
                    const { data } = resultCount;

                    setCategoryCount(data.category);
                    setOrderCount(data.order);
                    setProductCount(data.product);
                    setUserCount(data.user);
                }
            } catch (error) {
                logger({ groupName: 'Dashboard catch', values: [error] });
            }
        })();
    }, []);
    useEffect(() => {
        dispatch(
            statAsync.getStatistical({
                from: formatDate(startDate),
                to: formatDate(endDate),
                type: 'month',
            }),
        );
    }, [startDate, endDate, dispatch]);

    const onStartDate = (value) => {
        setStartDate(value);
    };
    const onEndDate = (value) => {
        setEndDate(value);
    };

    return (
        <section className='section section--full-screen'>
            <Typography variant='h2'>{titles.statistics}</Typography>
            <Row cols={3} gy={2}>
                <Col>
                    <div className={cx('section')}>
                        <Typography variant='h3'>Danh mục sản phẩm</Typography>
                        <Row cols={1} gy={3}>
                            {categoryCount.list.map((item, index) => (
                                <Col key={index}>
                                    <Typography variant='h5'>
                                        {item.state === 'enable'
                                            ? 'Danh mục được phép xuất hiện'
                                            : 'Danh mục không được xuất hiện'}
                                    </Typography>
                                    <ProgressBar
                                        height='14px'
                                        labelSize='1.2rem'
                                        completed={item.count.toString()}
                                        maxCompleted={
                                            categoryCount.totalQuantity
                                        }
                                        bgColor={'#' + randomColor()}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>

                <Col>
                    <div className={cx('section')}>
                        <Typography variant='h4'>Người dùng</Typography>
                        <Row cols={1} gy={3}>
                            {userCount.list.map((item, index) => (
                                <Col key={index}>
                                    <Typography variant='h5'>
                                        {item.state === 'active'
                                            ? 'Đã được kích hoạt'
                                            : 'Chưa được kích hoạt'}
                                    </Typography>
                                    <ProgressBar
                                        height='14px'
                                        labelSize='1.2rem'
                                        completed={item.count.toString()}
                                        maxCompleted={userCount.totalQuantity}
                                        bgColor={'#' + randomColor()}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>

                <Col>
                    <div className={cx('section')}>
                        <Typography variant='h4'>Sản phẩm</Typography>
                        <Row cols={1} gy={3}>
                            {productCount.list.map((item, index) => (
                                <Col key={index}>
                                    <Typography variant='h5'>
                                        {item.state === 'enable'
                                            ? 'Sản phẩm được phép xuất hiện'
                                            : 'Sản phẩm không được xuất hiện'}
                                    </Typography>
                                    <ProgressBar
                                        height='14px'
                                        labelSize='1.2rem'
                                        completed={item.count.toString()}
                                        maxCompleted={
                                            productCount.totalQuantity
                                        }
                                        bgColor={'#' + randomColor()}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>

                <Col baseCols={12}>
                    <div className={cx('section')}>
                        <Typography variant='h4'>Đơn hàng</Typography>
                        <Row cols={2}>
                            {orderCount.list.map((item, index) => (
                                <Col key={index} baseCols={6}>
                                    <Typography variant='h5'>
                                        {enums.orderState[item.state].state}
                                    </Typography>
                                    <ProgressBar
                                        height='14px'
                                        labelSize='1.2rem'
                                        completed={item.count.toString()}
                                        maxCompleted={orderCount.totalQuantity}
                                        bgColor={'#' + randomColor()}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>

            <br style={{ marginTop: '10px' }} />

            <Typography variant='h2'>Thống kê tổng doanh thu</Typography>

            <Row>
                <Col baseCols={4}>
                    <Typography
                        variant='h3'
                        classes={cx('label-datetime-picker')}
                    >
                        Từ:
                    </Typography>
                    <DateTimePicker
                        clearIcon={null}
                        value={startDate}
                        format='dd/MM/y'
                        onChange={onStartDate}
                    />
                </Col>

                <Col baseCols={4}>
                    <Typography
                        variant='h3'
                        classes={cx('label-datetime-picker')}
                    >
                        Đến:
                    </Typography>
                    <DateTimePicker
                        clearIcon={null}
                        value={endDate}
                        format='dd/MM/y'
                        onChange={onEndDate}
                    />
                </Col>
            </Row>

            <ChartBar
                data={statisticalAmount}
                keyXAxis='date'
                keyBar='amount'
                name='Tổng doanh thu tháng'
            />
        </section>
    );
}

export default Dashboard;
