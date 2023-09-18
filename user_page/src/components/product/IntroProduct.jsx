import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
    contextPage,
    directions,
    inputNames,
    notifies,
    schemas,
    types,
} from '~/common';
import {
    Button,
    Col,
    InputQuantity,
    Row,
    Skeleton,
    Typography,
} from '~/components';
import { cartActions, userSelector } from '~/redux';
import { cartServices } from '~/services';
import { currencyVN, priceSaleVN } from '~/utils/funcs';
import styles from '~product/intro-product.module.scss';
import CarouselProduct from './CarouselProduct';

const cx = classNames.bind(styles);

function IntroProduct({
    producId,
    name,
    images,
    price,
    sale,
    stars,
    starStat,
    stockSale,
    stock,
    isLoading = false,
}) {
    const newPrice = priceSaleVN(price, sale);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(userSelector.getUserId);
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schemas.productDetailQuantity),
        defaultValues: {
            quantity: 1,
        },
    });

    const handleOnSubmit = async ({ quantity }) => {
        if (!userId) navigate(directions.signIn);

        if (quantity > stock) {
            toast.error(notifies.overStock);
            return;
        }

        const data = {
            producId,
            productOptionId: undefined,
            value: undefined,
            quantity,
        };
        const result = await cartServices.addCart(data);

        if (result.isSuccess === 'true') {
            toast.success(notifies.addedItemCartSuccess);
            dispatch(cartActions.increaseQuantity());
        } else {
            toast.error(notifies.addedItemCartFail);
        }
    };

    // logger({ groupName: IntroProduct.name, values: ['re-render'] });

    return (
        <section className='section'>
            <Row>
                <Col baseCols={5}>
                    <CarouselProduct images={images} />
                </Col>
                <Col component='section'>
                    <Skeleton
                        animation='wave'
                        ready={name}
                        variant='text'
                        height='48px'
                        marginBottom='8px'
                    >
                        <Typography variant='h2'>{name}</Typography>
                    </Skeleton>
                    <div className={cx('stats')}>
                        <div className={cx('stats-star')}>
                            <Typography variant='text1'>
                                {stars}
                                {contextPage.rateStar}
                            </Typography>

                            <FontAwesomeIcon icon={faStar} />

                            <Typography variant='text1'>
                                ({starStat} {contextPage.review})
                            </Typography>
                        </div>
                        <div className={cx('separate')}></div>
                        <Typography variant='text1'>
                            {stockSale} {contextPage.sold}
                        </Typography>
                        <div className={cx('separate')}></div>
                        <Typography variant='text1'>
                            {stock} {contextPage.stockAlready}
                        </Typography>
                    </div>

                    <Skeleton
                        animation='wave'
                        ready={newPrice}
                        height='46px'
                        width='262px'
                        marginTop='48px'
                    >
                        <div className={cx('wrap-price')}>
                            <Typography variant='h2' component='span'>
                                {currencyVN(newPrice)}
                            </Typography>

                            <Typography variant='text1'>
                                {currencyVN(price)}
                            </Typography>
                        </div>
                    </Skeleton>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(handleOnSubmit)}
                        className={cx('form')}
                    >
                        <div className={cx('form-group')}>
                            <Controller
                                control={control}
                                name={inputNames.quantity}
                                render={({
                                    field: { onChange, value: init },
                                }) => (
                                    <InputQuantity
                                        id={inputNames.quantity}
                                        name={inputNames.quantity}
                                        initValue={init}
                                        onChange={(value) => onChange(value)}
                                    />
                                )}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <Button disabled={!stock} color='primary' size='lg'>
                                {contextPage.buyNow}
                            </Button>
                            <Button
                                type={types.submit}
                                disabled={!stock}
                                variant='outlined'
                                color='primary'
                                size='lg'
                            >
                                {contextPage.addCart}
                            </Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </section>
    );
}

export default IntroProduct;