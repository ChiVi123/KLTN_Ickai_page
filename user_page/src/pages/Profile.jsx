import { useSelector } from 'react-redux';

import { contextPage } from '~/common';
import { Col, Row, Typography } from '~/components';
import { FormProfile, FormProfileImage } from '~/components/profile';
import { userSelector } from '~/redux';

function Profile() {
    const user = useSelector(userSelector.selectInfo);

    return (
        <article className='width-sm'>
            <section className='section'>
                <Typography
                    variant='h1'
                    center
                    style={{ '--margin-bottom': 'var(--spacer-5)' }}
                >
                    {contextPage.account}
                </Typography>

                <Row cols={1} gy={3}>
                    <Col baseCols={10} offset={1}>
                        <FormProfile user={user} />
                    </Col>
                    <Col baseCols={10} offset={1}>
                        <FormProfileImage user={user} />
                    </Col>
                </Row>
            </section>
        </article>
    );
}

export default Profile;
