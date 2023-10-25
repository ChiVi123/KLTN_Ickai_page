import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
    contextPage,
    inputNames,
    keys,
    placeholders,
    schemas,
    types,
} from '~/common';
import {
    Button,
    Col,
    Pagination,
    ProductCard,
    Row,
    Typography,
} from '~/components';
import { FilterField, Sorts } from '~/components/search';
import { ProductCardSkeleton } from '~/components/skeletons';
import {
    categoriesSelector,
    searchActions,
    searchAsync,
    searchSelector,
} from '~/redux';
import { createObjectParams, toArray } from '~/utils/funcs';
import { logger } from '~/utils/logger';

import styles from '~/scss/pages/search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const isLogger = false;
    const sizeSearch = 6;
    const skeleton = toArray(sizeSearch);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const categories = useSelector(categoriesSelector.selectItems);
    const search = useSelector(searchSelector.selectList);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.filterPrice),
        defaultValues: {
            minPrice: parseInt(searchParams.get(keys.minPrice)) || '',
            maxPrice: parseInt(searchParams.get(keys.maxPrice)) || '',
        },
    });
    const query = searchParams.get(keys.query) || '';
    const sortBy = searchParams.get(keys.sortBy) || 'latest';
    const category = searchParams.get(keys.cate);
    const minPrice = parseInt(searchParams.get(keys.minPrice)) || 0;
    const maxPrice = parseInt(searchParams.get(keys.maxPrice)) || 0;
    const currentPage = parseInt(searchParams.get(keys.page)) || 1;

    useEffect(() => {
        const params = { sortBy, minPrice, maxPrice };

        if (query) {
            params.query = query;
            dispatch(searchAsync.getAllProductByQuery(params));
        }

        if (category) {
            params.categoryId = category;
            dispatch(searchAsync.getAllProductByCategory(params));
        }

        return () => {
            dispatch(searchActions.reset());
        };
    }, [category, dispatch, maxPrice, minPrice, query, sortBy]);

    const handleOnSubmit = (data) => {
        setSearchParams((prev) => ({
            ...createObjectParams(prev),
            ...data,
        }));
    };

    if (isLogger) {
        logger({ groupName: Search.name, values: [search] });
    }

    return (
        <div className='container'>
            <Row classes='inner'>
                <Col baseCols={3}>
                    <section className={cx('section', 'filter')}>
                        <div className={cx('filter-item')}>
                            <Typography variant='text1'>
                                {contextPage.rangePrice}
                            </Typography>

                            <form
                                onSubmit={handleSubmit(handleOnSubmit)}
                                className={cx('form-price')}
                            >
                                <div className={cx('group-price')}>
                                    <label htmlFor={inputNames.minPrice}>
                                        <input
                                            type='text'
                                            id={inputNames.minPrice}
                                            {...register(inputNames.minPrice)}
                                            placeholder={placeholders.minPrice}
                                            className={cx('filter-input')}
                                        />
                                    </label>

                                    <div className={cx('line')}></div>

                                    <label htmlFor={inputNames.maxPrice}>
                                        <input
                                            type='text'
                                            id={inputNames.maxPrice}
                                            {...register(inputNames.maxPrice)}
                                            placeholder={placeholders.maxPrice}
                                            className={cx('filter-input')}
                                        />
                                    </label>
                                </div>
                                <span className='invalid'>
                                    {errors.minPrice?.message}
                                </span>
                                {!!errors.minPrice?.message || (
                                    <span className='invalid'>
                                        {errors.maxPrice?.message}
                                    </span>
                                )}

                                <Button
                                    type={types.submit}
                                    color='primary'
                                    size='sm'
                                >
                                    {contextPage.apply}
                                </Button>
                            </form>
                        </div>

                        {!!categories.length && (
                            <div className={cx('filter-item')}>
                                <FilterField
                                    heading={contextPage.category}
                                    inputName={inputNames.categories}
                                    data={categories}
                                />
                            </div>
                        )}
                    </section>
                </Col>

                <Col baseCols={9}>
                    <section className='section'>
                        {/* Sort */}
                        <Sorts classes={cx('sorts')} />

                        {/* Skeleton */}
                        {search.status === 'pending' && (
                            <Row
                                colsMd={2}
                                colsLg={3}
                                gy={3}
                                classes={cx('list')}
                            >
                                {skeleton.map((_, index) => (
                                    <Col key={index}>
                                        <ProductCardSkeleton />
                                    </Col>
                                ))}
                            </Row>
                        )}

                        {/* List */}
                        <Row colsMd={2} colsLg={3} gy={3} classes={cx('list')}>
                            {search.items.map((item) => (
                                <Col key={item.id}>
                                    <ProductCard product={item} />
                                </Col>
                            ))}
                        </Row>

                        <Pagination
                            total={search.totalPage}
                            current={currentPage}
                            center
                        />
                    </section>
                </Col>
            </Row>
        </div>
    );
}

export default Search;
