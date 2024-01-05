import classNames from 'classnames/bind';
import { Fragment } from 'react';

import { contextPage, contextParams, enums } from '~/common';
import { Button, Col, Row, Typography } from '~/components';
import { currencyVN, formatLocalDate } from '~/utils/funcs';
import styles from '~order-history/order-item.module.scss';

const cx = classNames.bind(styles);

function OrderItem({ order }) {
    if (order?.state === 'enable') {
        return <Fragment />;
    } else {
        return (
            <article className='section'>
                <Row gx={4}>
                    <Col baseCols={12} baseColsMd={9}>
                        <div className={cx('inner')}>
                            <Typography variant='h4' classes={cx('title')}>
                                {order?.id &&
                                    contextParams.titleOrderId(order.id)}
                            </Typography>
                            <span className={cx('tag', `tag--${order?.state}`)}>
                                {enums.payments[order?.state]?.state}
                            </span>
                        </div>
                        <div className={cx('inner')}>
                            <span
                                className={cx('normal-text', 'info__summary')}
                            >
                                {order?.items &&
                                    contextParams.summaryItems(order.items)}
                            </span>
                        </div>
                        <div className={cx('inner')}>
                            <span className={cx('normal-text')}>
                                {order?.createdDate &&
                                    formatLocalDate(
                                        new Date(order.createdDate),
                                    )}
                            </span>
                            <span className={cx('normal-text')}>
                                {order?.totalPrice &&
                                    currencyVN(order.totalPrice)}
                            </span>
                        </div>
                    </Col>

                    <Col>
                        <div className={cx('wrap-btn')}>
                            {order?.id && (
                                <Button
                                    to={`/order/${order.id}`}
                                    color='primary'
                                    size='sm'
                                >
                                    {contextPage.moreDetail}
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </article>
        );
    }
}

export default OrderItem;
