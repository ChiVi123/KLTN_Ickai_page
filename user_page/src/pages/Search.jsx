import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
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
import { FilterField, ModalFilter, Sorts } from '~/components/search';
import { ProductCardSkeleton } from '~/components/skeletons';
import { useModal } from '~/hooks';
import {
    categoriesSelector,
    searchActions,
    searchAsync,
    searchSelector,
} from '~/redux';
import styles from '~/scss/pages/search.module.scss';
import { createObjectParams, toArray } from '~/utils/funcs';

const cx = classNames.bind(styles);

function Search() {
    const sizeSearch = 8;
    const skeleton = toArray(sizeSearch);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { categoryId } = useParams();
    const categories = useSelector(categoriesSelector.selectItems);
    const search = useSelector(searchSelector.selectList);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.filterPrice),
        defaultValues: {
            minPrice: parseInt(searchParams.get(keys.minPrice)) || 0,
            maxPrice: parseInt(searchParams.get(keys.maxPrice)) || 0,
        },
    });

    // Custom hooks
    const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();

    const query = searchParams.get(keys.query) || '';
    const sortBy = searchParams.get(keys.sortBy) || '';
    const minPrice = parseInt(searchParams.get(keys.minPrice)) || undefined;
    const maxPrice = parseInt(searchParams.get(keys.maxPrice)) || undefined;
    const currentPage = parseInt(searchParams.get(keys.page)) || 1;

    useEffect(() => {
        const params = {
            sortBy,
            minPrice,
            maxPrice,
            page: currentPage,
            size: sizeSearch,
        };

        if (categoryId) {
            params.categoryId = categoryId;
            dispatch(searchAsync.getAllByCategoryId(params));
        } else {
            params.query = query;
            dispatch(searchAsync.getAllByQuery(params));
        }

        return () => {
            dispatch(searchActions.reset());
        };
    }, [categoryId, currentPage, dispatch, maxPrice, minPrice, query, sortBy]);

    const handleOnSubmit = (data) => {
        setSearchParams((prev) => ({
            ...createObjectParams(prev),
            ...data,
        }));
    };

    return (
        <div className='container'>
            <Row gx={2} classes='inner'>
                <Col baseCols={0} baseColsLg={3}>
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

                <Col baseCols={12} baseColsLg={9}>
                    <Sorts classes={cx('sorts')} />
                    <div className={cx('filter-wrap')}>
                        <button
                            type='button'
                            className={cx('btn-filter')}
                            onClick={handleOpenModal}
                        >
                            <FontAwesomeIcon icon={faFilter} />
                            <Typography variant='text1'>
                                {contextPage.filter}
                            </Typography>
                        </button>
                    </div>

                    <ReactModal
                        isOpen={isOpenModal}
                        overlayClassName='overlay'
                        className='modal modal--right'
                        ariaHideApp={false}
                        onRequestClose={handleCloseModal}
                    >
                        <ModalFilter
                            categories={categories}
                            errors={errors}
                            register={register}
                            onSubmit={handleSubmit(handleOnSubmit)}
                            onClose={handleCloseModal}
                        />
                    </ReactModal>

                    {/* Skeleton */}
                    {search.status === 'pending' && (
                        <Row
                            cols={2}
                            colsSm={3}
                            colsMd={4}
                            g={1}
                            classes={cx('list')}
                        >
                            {skeleton.map((item) => (
                                <Col key={item}>
                                    <ProductCardSkeleton />
                                </Col>
                            ))}
                        </Row>
                    )}

                    {/* List */}
                    <Row
                        cols={2}
                        colsSm={3}
                        colsMd={4}
                        g={1}
                        classes={cx('list')}
                    >
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
                </Col>
            </Row>
        </div>
    );
}

export default Search;
