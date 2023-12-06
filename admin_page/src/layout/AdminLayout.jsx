import classNames from 'classnames/bind';
import { Col, Row } from '~/components';
import styles from '~/scss/layouts/admin-layout.module.scss';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);
function AdminLayout({ children }) {
    return (
        <Row gx={0} noSide>
            <Col baseCols={3} classes={cx('side')}>
                <Sidebar />
            </Col>
            <Col baseCols={9} classes={cx('side')}>
                <main>{children}</main>
            </Col>
        </Row>
    );
}

export default AdminLayout;
