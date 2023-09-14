import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { contextPage, directions } from '~/common';
import { Col, ProductCard, Row, TextLink, Typography } from '~/components';
import { ProductCardSkeleton } from '~/components/skeletons';
import { cartAsync, categoriesSelector, userSelector } from '~/redux';
import styles from '~/scss/pages/home.module.scss';
import { productServices } from '~/services';
import { toArray } from '~/utils/funcs';

const cx = classNames.bind(styles);

const page = 0;
const size = 8;

function Home() {
    const productsSkeleton = toArray(size);
    const dispatch = useDispatch();
    const categories = useSelector(categoriesSelector.getAllCategory);
    const { accessToken } = useSelector(userSelector.getUser);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchApi = async (data) => {
            const result = await productServices.getProductsByState(data);
            setProducts(result?.list || []);
        };

        fetchApi({ page, size });
    }, []);

    useEffect(() => {
        if (accessToken) {
            // logger({ groupName: Home.name, values: ['Call api'] });
            dispatch(cartAsync.getCartByToken());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

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
                            {products.map((product) => (
                                <Col key={product.id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                        </Row>

                        {/* Skeleton */}
                        {!!products.length || (
                            <Row cols={2} colsMd={3} colsLg={4} g={3}>
                                {productsSkeleton.map((_, index) => (
                                    <Col key={index}>
                                        <ProductCardSkeleton />
                                    </Col>
                                ))}
                            </Row>
                        )}

                        <TextLink
                            to={directions.search}
                            center
                            classes={cx('main-link')}
                        >
                            {contextPage.more}
                        </TextLink>

                        {/* Popular */}
                        <Typography
                            variant='h2'
                            style={{ '--margin-bottom': 'var(--spacer-4)' }}
                        >
                            {contextPage.popular}
                        </Typography>

                        <Row cols={2} colsMd={3} colsLg={4} g={3}>
                            {products.map((product) => (
                                <Col key={product.id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                        </Row>

                        {/* Skeleton */}
                        {!!products.length || (
                            <Row cols={2} colsMd={3} colsLg={4} g={3}>
                                {productsSkeleton.map((_, index) => (
                                    <Col key={index}>
                                        <ProductCardSkeleton />
                                    </Col>
                                ))}
                            </Row>
                        )}

                        <TextLink
                            to={directions.search}
                            center
                            classes={cx('main-link')}
                        >
                            {contextPage.more}
                        </TextLink>
                    </section>
                </Col>
            </Row>
        </div>
    );
}

export default Home;
