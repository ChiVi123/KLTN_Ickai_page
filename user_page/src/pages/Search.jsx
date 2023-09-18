import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
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
import { categoriesSelector } from '~/redux';
import styles from '~/scss/pages/search.module.scss';
import { productServices, searchServices } from '~/services';
import { createObjectParams, toArray } from '~/utils/funcs';

const cx = classNames.bind(styles);

function Search() {
    const sizeSearch = 6;
    const skeleton = toArray(sizeSearch);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchResult, setSearchResult] = useState({
        list: [],
        totalQuantity: 0,
        totalPage: 0,
    });
    const categories = useSelector(categoriesSelector.getAllCategory);
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

    useEffect(() => {
        const fetchApi = async ({ q, category, page, size }) => {
            if (category) {
                const errorMessage = `Can not found any product with category or brand id: ${category}`;

                try {
                    const result = await productServices.getProductsByCategory({
                        id: category,
                        page,
                        size,
                    });

                    setSearchResult(result);
                } catch (error) {
                    if (error === errorMessage) {
                        setSearchResult((prev) => ({
                            ...prev,
                            list: [],
                            totalQuantity: 0,
                        }));
                    }
                }

                return;
            }

            if (q) {
                try {
                    const result = await searchServices.searchProducts({
                        q,
                        page,
                        size,
                    });

                    if (result?.totalQuantity) {
                        setSearchResult(result);
                    }
                } catch (error) {
                    setSearchResult({});
                }
            } else {
                const result = await productServices.getProductsByState({
                    page,
                    size,
                });
                if (result?.totalQuantity) {
                    setSearchResult(result);
                }
            }
        };

        fetchApi({
            q: searchParams.get(keys.query),
            category: searchParams.get(keys.cate),
            page: parseInt(searchParams.get(keys.page)) - 1 || 0,
            size: sizeSearch,
        });
    }, [searchParams]);

    const handleOnSubmit = (data) => {
        setSearchParams((prev) => ({
            ...createObjectParams(prev),
            ...data,
        }));
    };

    // logger({
    //     groupName: Search.name,
    //     values: [searchResult],
    // });

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
                        {!searchResult.totalPage && (
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
                            {searchResult?.list.map((item) => (
                                <Col key={item.id}>
                                    <ProductCard product={item} />
                                </Col>
                            ))}
                        </Row>

                        <Pagination total={searchResult.totalPage} center />
                    </section>
                </Col>
            </Row>
        </div>
    );
}

export default Search;