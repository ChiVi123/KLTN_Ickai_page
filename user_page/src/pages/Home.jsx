import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { contextPage, directions } from '~/common';
import { Col, ProductCard, Row, TextLink, Typography } from '~/components';
import { ProductCardSkeleton } from '~/components/skeletons';
import { cartAsync, categoriesSelector, userSelector } from '~/redux';
import { productServices } from '~/services';
import { toArray } from '~/utils/funcs';
import { logger } from '~/utils/logger';

import styles from '~/scss/pages/home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const page = 0;
    const size = 10;
    const productsSkeleton = toArray(size);
    const isLogger = false;

    const [latest, setLatest] = useState([]);
    const [popular, setPopular] = useState([]);
    const [productByAllCategory, setProductByAllCategory] = useState([]);
    const categories = useSelector(categoriesSelector.selectItems);
    const { accessToken } = useSelector(userSelector.selectInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const result = await productServices.getProductsByCategories();
            setProductByAllCategory(result);
        })();

        return () => {};
    }, []);
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

    const listProduct = (array = []) => (
        <Row cols={2} colsMd={5} g={1}>
            {array.map((product) => (
                <Col key={product.id}>
                    <ProductCard product={product} />
                </Col>
            ))}
        </Row>
    );

    return (
        <div className='container'>
            <Row gx={2} classes='inner'>
                <Col baseCols={0} baseColsLg={3} baseColsXl={2}>
                    <nav className={cx('nav')}>
                        <Typography variant='h3' classes={cx('nav-heading')}>
                            {contextPage.category}
                        </Typography>
                        {categories.map((item) => {
                            const path = `${directions.search}/${item.id}`;

                            return (
                                <Typography
                                    key={item.name}
                                    variant='para1'
                                    to={path}
                                    component={NavLink}
                                    classes={cx('nav-link')}
                                >
                                    {item.name}
                                </Typography>
                            );
                        })}
                    </nav>
                </Col>

                <Col>
                    <div className={cx('heading-wrap')}>
                        <Typography variant='h2'>
                            {contextPage.latest}
                        </Typography>
                    </div>

                    {/* Latest */}
                    {listProduct(latest)}

                    {/* Skeleton */}
                    {!latest.length && (
                        <Row cols={2} colsMd={5} g={1}>
                            {productsSkeleton.map((_, index) => (
                                <Col key={index}>
                                    <ProductCardSkeleton />
                                </Col>
                            ))}
                        </Row>
                    )}

                    <div className={cx('heading-wrap')}>
                        <Typography variant='h2'>
                            {contextPage.popular}
                        </Typography>
                    </div>

                    {/* Popular */}
                    {listProduct(popular)}

                    {/* Skeleton */}
                    {!popular.length && (
                        <Row cols={2} colsMd={5} g={1}>
                            {productsSkeleton.map((_, index) => (
                                <Col key={index}>
                                    <ProductCardSkeleton />
                                </Col>
                            ))}
                        </Row>
                    )}

                    {productByAllCategory.map((item) => (
                        <Fragment key={item.categoryId}>
                            <div className={cx('heading-wrap')}>
                                <Typography variant='h2'>
                                    {item.title}
                                </Typography>
                                <TextLink to={`/search/${item.categoryId}`}>
                                    {contextPage.more}
                                </TextLink>
                            </div>

                            {listProduct(item?.items || [])}
                        </Fragment>
                    ))}
                </Col>
            </Row>
        </div>
    );
}

export default Home;
