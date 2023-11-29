import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';

import 'react-calendar/dist/Calendar.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import { ChartBar, Col, Row, Typography } from '~/components';
import { statAsync, statSelector } from '~/redux';
import { formatDate } from '~/utils/funcs';

import styles from '~/scss/pages/dashboard.module.scss';

const cx = classNames.bind(styles);

function Dashboard() {
    const [startDate, setStartDate] = useState(new Date('12-01-2022'));
    const [endDate, setEndDate] = useState(new Date());
    const { statisticalAmount } = useSelector(statSelector.getStatsAmount);
    const dispatch = useDispatch();

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
