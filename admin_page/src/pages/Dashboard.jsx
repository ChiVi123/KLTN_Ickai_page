import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { ChartBar, Col, Row, Typography } from '~/components';
import { categoriesAsync, statAsync, statSelector } from '~/redux';
import { categoryServices, statisticalServices } from '~/services';
import { formatDate } from '~/utils/funcs';

import 'react-calendar/dist/Calendar.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import styles from '~/scss/pages/dashboard.module.scss';

const cx = classNames.bind(styles);
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function Dashboard() {
    const [startDate, setStartDate] = useState(new Date('12-01-2022'));
    const [endDate, setEndDate] = useState(new Date());
    const [statisticSold, setStatisticSold] = useState([]);
    const [sortByParam, setSortByParam] = useState('asc-name');
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
    useEffect(() => {
        dispatch(categoriesAsync.getAllEnable());
        (async () => {
            const [names, statistic] = await Promise.all([
                categoryServices.getAllEnable(),
                statisticalServices.getQuantitySoldByCategory(),
            ]);

            statistic.forEach((item) => {
                const category = names.find(
                    (value) => value.id === item.category,
                );

                if (category) {
                    item.name = category.name;
                }
            });

            setStatisticSold(statistic);
        })();
    }, [dispatch]);

    const onStartDate = (value) => {
        setStartDate(value);
    };
    const onEndDate = (value) => {
        setEndDate(value);
    };

    const options = [
        { value: 'asc-name', label: 'Tên A-Z' },
        { value: 'desc-name', label: 'Tên Z-A' },
        { value: 'desc-sold', label: 'Bán chạy' },
    ];

    const visibleStatisticSold = useMemo(() => {
        let [order, orderBy] = sortByParam.split('-');
        if (orderBy === 'sold') {
            orderBy = 'totalQuantitySold';
        }
        return stableSort(statisticSold, getComparator(order, orderBy));
    }, [sortByParam, statisticSold]);

    function handleSelect({ value }) {
        setSortByParam(value);
    }

    return (
        <section className='section section--full-screen'>
            <br style={{ marginTop: '10px' }} />

            <Typography variant='h2'>Thống kê số lượng đã bán</Typography>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant='h3'
                    classes={cx('label-datetime-picker')}
                    style={{ marginBottom: '0' }}
                >
                    Sắp xếp:
                </Typography>
                <ReactSelect
                    options={options}
                    onChange={handleSelect}
                    placeholder='Sắp xếp theo...'
                    defaultValue={options.find(
                        (item) => item.value === sortByParam,
                    )}
                    styles={{
                        input: (baseStyle) => ({
                            ...baseStyle,
                            color: 'var(--text-1-color)',
                        }),
                        singleValue: (baseStyle) => ({
                            ...baseStyle,
                            color: 'var(--text-1-color)',
                        }),
                        menu: (baseStyle) => ({
                            ...baseStyle,
                            background: 'var(--bg-color)',
                            zIndex: '2',
                        }),
                        control: (baseStyle) => ({
                            ...baseStyle,
                            padding: '0',
                            background: 'transparent',
                            color: 'var(--text-1-color)',
                        }),
                    }}
                />
            </div>

            <ChartBar
                data={visibleStatisticSold}
                dataKey='name'
                keyBar='totalQuantitySold'
                name='Số lượng đã bán theo danh mục'
                layout='vertical'
            />

            <Typography variant='h2'>Thống kê tổng doanh thu</Typography>
            <Row>
                <Col baseCols={3}>
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

                <Col baseCols={3}>
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

            <ResponsiveContainer height={400}>
                <LineChart
                    data={statisticalAmount}
                    margin={{
                        top: 50,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type='monotone'
                        dataKey='amount'
                        stroke='#82ca9d'
                        name='Doanh thu tháng'
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </section>
    );
}

export default Dashboard;
