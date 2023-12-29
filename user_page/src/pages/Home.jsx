import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { contextPage } from '~/common';
import { Col, ProductCard, Row, TextLink, Typography } from '~/components';
import { ProductCardSkeleton } from '~/components/skeletons';
import { cartAsync, categoriesSelector, userSelector } from '~/redux';
import { productServices } from '~/services';
import { toArray } from '~/utils/funcs';

import styles from '~/scss/pages/home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const page = 0;
    const size = 10;
    const productsSkeleton = toArray(size);

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

    const listProduct = (array = []) => (
        <Row cols={2} colsMd={5} g={1}>
            {array.map((product) => (
                <Col key={product.id}>
                    <ProductCard product={product} />
                </Col>
            ))}
        </Row>
    );

    const listSkeleton = (length = 0) => (
        <>
            {!length && (
                <Row cols={2} colsMd={5} g={1}>
                    {productsSkeleton.map((_, index) => (
                        <Col key={index}>
                            <ProductCardSkeleton />
                        </Col>
                    ))}
                </Row>
            )}
        </>
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
                            const path = `/search?categoryName=${item.name}`;

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
                        <TextLink to={`/search?sortBy=latest`}>
                            {contextPage.more}
                        </TextLink>
                    </div>

                    {/* Latest */}
                    {listProduct(latest)}

                    {/* Skeleton */}
                    {listSkeleton(latest.length)}

                    <div className={cx('heading-wrap')}>
                        <Typography variant='h2'>
                            {contextPage.popular}
                        </Typography>
                        <TextLink to={`/search/?sortBy=sold`}>
                            {contextPage.more}
                        </TextLink>
                    </div>

                    {/* Popular */}
                    {listProduct(popular)}

                    {/* Skeleton */}
                    {listSkeleton(popular.length)}

                    {productByAllCategory.map((item) => (
                        <Fragment key={item.categoryId}>
                            <div className={cx('heading-wrap')}>
                                <Typography variant='h2'>
                                    {item.title}
                                </Typography>
                                <TextLink
                                    to={`/search?categoryName=${item.title}`}
                                >
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
