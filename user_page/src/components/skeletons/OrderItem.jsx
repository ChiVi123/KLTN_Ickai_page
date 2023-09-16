import classNames from 'classnames/bind';
import styles from '~order-history/order-item.module.scss';
import Col from '../Col';
import Row from '../Row';
import Skeleton from '../Skeleton';

const cx = classNames.bind(styles);

function OrderItem() {
    return (
        <article className='section'>
            <Row gx={4}>
                <Col baseCols={9}>
                    <div className={cx('inner')}>
                        <Skeleton
                            height='16px'
                            style={{ marginBottom: '8px' }}
                        />
                        <Skeleton height='24px' />
                    </div>
                    <div className={cx('inner')}>
                        <Skeleton height='14px' />
                    </div>
                    <div className={cx('inner')}>
                        <Skeleton height='14px' style={{ marginLeft: '6px' }} />
                        <Skeleton height='14px' />
                    </div>
                </Col>

                <Col>
                    <div className={cx('wrap-btn')}>
                        <Skeleton height='34px' />
                    </div>
                </Col>
            </Row>
        </article>
    );
}

export default OrderItem;
