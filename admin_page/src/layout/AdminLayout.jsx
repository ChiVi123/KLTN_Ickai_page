import { Col, Row } from '~/components';
import Sidebar from './Sidebar';

function AdminLayout({ children }) {
    return (
        <Row gx={3} noSide>
            <Col baseCols={3}>
                <Sidebar />
            </Col>
            <Col baseCols={9}>
                <main>{children}</main>
            </Col>
        </Row>
    );
}

export default AdminLayout;
