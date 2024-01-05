import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { contextPage, inputNames, keys, schemas } from '~/common';
import { Col, Row } from '~/components';
import styles from '~/scss/pages/products/filter-sort.module.scss';
import { createObjectParams } from '~/utils/funcs';
import { logger } from '~/utils/logger';

const cx = classNames.bind(styles);

function FilterSort({ max = 999999, placeholder = '' }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        register,
        formState: { errors },
        setValue,
        watch,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schemas.filterPrice),
        defaultValues: {
            minPrice: parseInt(searchParams.get(keys.minPrice)) || 0,
            maxPrice: parseInt(searchParams.get(keys.maxPrice)) || max,
            query: searchParams.get(keys.query) || '',
        },
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            console.log(type);
            if (type === 'blur' && name === 'maxPrice' && !value[name]) {
                logger({ groupName: FilterSort.name, values: [max] });
                setValue('maxPrice', max);
            }

            if (type === 'blur' && name === 'minPrice' && !value[name]) {
                setValue('minPrice', 0);
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [max, setValue, watch]);

    function handleWheel(event) {
        if (event?.currentTarget) {
            event.currentTarget?.blur();
        }
    }
    function handleBlur({ target }) {
        if (target.name === 'maxPrice' && !target.value) {
            setValue('maxPrice', max);
        }

        if (target.name === 'minPrice' && !target.value) {
            setValue('minPrice', 0);
        }
    }
    function handleOnSubmit(data) {
        console.log(data);
        setSearchParams((prev) => ({
            ...createObjectParams(prev),
            ...data,
            page: 1,
        }));
    }

    return (
        <Row
            alignItems='center'
            gx={3}
            component='form'
            onSubmit={handleSubmit(handleOnSubmit)}
        >
            <Col baseCols={3}>
                <div className={cx('wrap-price')}>
                    <div className={cx('group')}>
                        <input
                            type='number'
                            id='minPrice'
                            placeholder='Từ'
                            className={cx('input-price')}
                            {...register('minPrice')}
                            onWheel={handleWheel}
                            onBlur={handleBlur}
                        />
                        <span className={cx('error')}>
                            {errors.minPrice?.message}
                        </span>
                    </div>
                    <span className={cx('separate')}></span>
                    <div className={cx('group')}>
                        <input
                            type='number'
                            name='maxPrice'
                            id='maxPrice'
                            placeholder='Đến'
                            className={cx('input-price')}
                            {...register('maxPrice')}
                            onWheel={handleWheel}
                            onBlur={handleBlur}
                        />
                        <span className={cx('error')}>
                            {errors.maxPrice?.message}
                        </span>
                    </div>
                </div>
            </Col>
            <Col>
                <div className={cx('search-list')}>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className={cx('search-list__icon')}
                    />
                    <input
                        id={inputNames.query}
                        type='text'
                        autoComplete='off'
                        placeholder={placeholder}
                        className={cx('search-list__input')}
                        {...register('query')}
                    />
                </div>
            </Col>
            <Col baseCols={2}>
                <button
                    type='submit'
                    className='btn'
                    style={{
                        '--btn-height': '42px',
                        '--btn-min-width': '100%',
                        '--btn-bg-color': '#372ff0',
                        '--btn-color': '#ffffff',
                    }}
                >
                    {contextPage.apply}
                </button>
            </Col>
        </Row>
    );
}

export default FilterSort;
