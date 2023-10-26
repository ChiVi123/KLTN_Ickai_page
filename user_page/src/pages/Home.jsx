import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { contextPage, directions } from '~/common';
import { Col, ProductCard, Row, Typography } from '~/components';
import { ProductCardSkeleton } from '~/components/skeletons';
import { cartAsync, categoriesSelector, userSelector } from '~/redux';
import { productServices } from '~/services';
import { toArray } from '~/utils/funcs';
import { logger } from '~/utils/logger';

import styles from '~/scss/pages/home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const page = 0;
    const size = 8;
    const productsSkeleton = toArray(size);
    const isLogger = false;

    const [latest, setLatest] = useState([]);
    const [popular, setPopular] = useState([]);
    const categories = useSelector(categoriesSelector.selectItems);
    const { accessToken } = useSelector(userSelector.selectInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        (async (data) => {
            const latest = await productServices.getProducts(data);
            const popular = await productServices.getPopular(data);

            setLatest(latest?.list || []);
            setPopular(popular?.list || []);
        })({ page, size });
    }, []);

    useEffect(() => {
        if (accessToken) {
            dispatch(cartAsync.getByToken());
        }
    }, [accessToken, dispatch]);

    if (isLogger) {
        logger({ groupName: Home.name, values: ['re-render'] });
    }

    return (
        <div className='container'>
            <Row classes='inner'>
                <Col baseCols={2}>
                    <nav className={cx('section', 'main-nav')}>
                        <Typography
                            variant='h2'
                            style={{ '--margin-bottom': 'var(--spacer-3)' }}
                        >
                            {contextPage.category}
                        </Typography>
                        {categories.map((item) => {
                            const path = `${directions.search}?cate=${item.id}`;

                            return (
                                <Typography
                                    key={item.name}
                                    variant='para1'
                                    to={path}
                                    component={NavLink}
                                    classes={cx('link')}
                                >
                                    {item.name}
                                </Typography>
                            );
                        })}
                    </nav>
                </Col>
                <Col baseCols={10}>
                    <section className='section'>
                        {/* Latest */}
                        <Typography
                            variant='h2'
                            style={{ '--margin-bottom': 'var(--spacer-4)' }}
                        >
                            {contextPage.latest}
                        </Typography>

                        <Row cols={2} colsMd={3} colsLg={4} g={3}>
                            {latest.map((product) => (
                                <Col key={product.id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                        </Row>

                        {/* Skeleton */}
                        {!!latest.length || (
                            <Row cols={2} colsMd={3} colsLg={4} g={3}>
                                {productsSkeleton.map((_, index) => (
                                    <Col key={index}>
                                        <ProductCardSkeleton />
                                    </Col>
                                ))}
                            </Row>
                        )}

                        {/* Popular */}
                        <Typography
                            variant='h2'
                            style={{
                                marginTop: 'var(--spacer-4)',
                                '--margin-bottom': 'var(--spacer-4)',
                            }}
                        >
                            {contextPage.popular}
                        </Typography>

                        <Row cols={2} colsMd={3} colsLg={4} g={3}>
                            {popular.map((product) => (
                                <Col key={product.id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                        </Row>

                        {/* Skeleton */}
                        {!!popular.length || (
                            <Row cols={2} colsMd={3} colsLg={4} g={3}>
                                {productsSkeleton.map((_, index) => (
                                    <Col key={index}>
                                        <ProductCardSkeleton />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </section>
                </Col>
            </Row>
        </div>
    );
}

export default Home;
