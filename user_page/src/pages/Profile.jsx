import { useSelector } from 'react-redux';
import { contextPage } from '~/common';
import { Col, Row, Typography } from '~/components';
import { FormProfile, FormProfileImage } from '~/components/profile';
import { userSelector } from '~/redux';

function Profile() {
    const user = useSelector(userSelector.selectInfo);

    return (
        <article className='width-md'>
            <section className='section'>
                <Typography
                    variant='h1'
                    center
                    style={{ '--margin-bottom': 'var(--spacer-5)' }}
                >
                    {contextPage.account}
                </Typography>

                <Row gx={5}>
                    <Col
                        baseCols={3}
                        style={{ borderRight: '1px dashed #ccc' }}
                    >
                        <FormProfileImage user={user} />
                    </Col>
                    <Col baseCols={9}>
                        <FormProfile user={user} />
                    </Col>
                </Row>
            </section>
        </article>
    );
}

export default Profile;
