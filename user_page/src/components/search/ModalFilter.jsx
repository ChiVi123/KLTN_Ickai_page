import classNames from 'classnames/bind';
import { Fragment } from 'react';

import { contextPage, inputNames, placeholders, types } from '~/common';

import styles from '~/scss/pages/search.module.scss';

import Button from '../Button';
import Typography from '../Typography';
import FilterField from './FilterField';

const cx = classNames.bind(styles);

function ModalFilter({
    categories = [],
    errors,
    register = () => {},
    onSubmit = () => {},
    onClose = () => {},
}) {
    return (
        <Fragment>
            {/* Head */}
            {/* Body */}
            <div className={cx('section', 'filter')}>
                <div className={cx('filter-item')}>
                    <Typography variant='text1'>
                        {contextPage.rangePrice}
                    </Typography>

                    <form onSubmit={onSubmit} className={cx('form-price')}>
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
                            {errors?.minPrice?.message}
                        </span>
                        {!!errors?.minPrice?.message || (
                            <span className='invalid'>
                                {errors?.maxPrice?.message}
                            </span>
                        )}

                        <Button type={types.submit} color='primary' size='sm'>
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
            </div>
        </Fragment>
    );
}

export default ModalFilter;
