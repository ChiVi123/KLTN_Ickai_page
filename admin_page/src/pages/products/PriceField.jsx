import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { keys, schemas } from '~/common';
import styles from '~/scss/pages/products/price-field.module.scss';
import { createObjectParams } from '~/utils/funcs';
import { logger } from '~/utils/logger';

const cx = classNames.bind(styles);

function PriceField({ max }) {
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
        },
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'blur' && name === 'maxPrice' && !value[name]) {
                logger({ groupName: PriceField.name, values: [max] });
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

    const handleOnSubmit = (data) => {
        setSearchParams((prev) => ({
            ...createObjectParams(prev),
            ...data,
            page: 1,
        }));
    };

    return (
        <form
            id='form-price'
            className={cx('wrap')}
            onSubmit={handleSubmit(handleOnSubmit)}
        >
            <div className={cx('group')}>
                <input
                    type='number'
                    id='minPrice'
                    placeholder='Từ'
                    className={cx('input')}
                    {...register('minPrice')}
                />
                <span className={cx('error')}>{errors.minPrice?.message}</span>
            </div>
            <span className={cx('separate')}></span>
            <div className={cx('group')}>
                <input
                    type='number'
                    name='maxPrice'
                    id='maxPrice'
                    placeholder='Đến'
                    className={cx('input')}
                    {...register('maxPrice')}
                />
                <span className={cx('error')}>{errors.maxPrice?.message}</span>
            </div>
        </form>
    );
}

export default PriceField;
