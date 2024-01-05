// Library
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import {
    contextPage,
    contextParams,
    directions,
    inputGroups,
    inputNames,
    labels,
    notifies,
    placeholders,
    schemas,
    types,
} from '~/common';
import {
    Button,
    Col,
    FormGroup,
    FormSelect,
    Row,
    TextField,
    TextLink,
    Typography,
} from '~/components';
import { PayMethods } from '~/components/checkout';
import { cartAsync, userSelector } from '~/redux';
import { cartServices, paymentServices, servicesGHN } from '~/services';
import { currencyVN } from '~/utils/funcs';

import styles from '~/scss/pages/checkout.module.scss';

const cx = classNames.bind(styles);

function Checkout() {
    // Hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userSelector.selectInfo);

    // - useState
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [feeShip, setFeeShip] = useState(0);
    const [cart, setCart] = useState();

    // - useForm
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.makeOrder),
        defaultValues: {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            payment: 'cod',
            address: '',
        },
    });

    // - useEffect
    useEffect(() => {
        const fetchApi = async () => {
            const resultCart = await cartServices.getCartByToken();
            setCart(resultCart);

            const resultProvinces = await servicesGHN.getProvince();
            setProvinces(resultProvinces);
        };

        fetchApi();
    }, []);
    useEffect(() => {
        const fetchApi = async (value, name, type) => {
            if (type === 'change') {
                let result;

                switch (name) {
                    case 'province':
                        result = await servicesGHN.getDistrict(
                            value[name].value,
                        );
                        console.log(result);
                        setDistricts(result);
                        setValue('district', undefined);
                        setValue('ward', undefined);
                        break;
                    case 'district':
                        result = await servicesGHN.getWard(value[name].value);
                        setWards(result);
                        setValue('ward', undefined);
                        break;
                    default:
                        break;
                }
            }

            const shippingOrder = {};
            const { district, ward } = value;

            if (district && ward) {
                shippingOrder.to_district_id = district.value;
                shippingOrder.to_ward_code = ward.value;

                const { service_id, service_type_id } =
                    await servicesGHN.getService(district.value);
                const resultFeeShip = await servicesGHN.getFee({
                    ...shippingOrder,
                    service_id,
                    service_type_id,
                });

                setFeeShip(resultFeeShip);
            }
        };

        const subscription = watch((value, { name, type }) => {
            fetchApi(value, name, type);
        });

        return () => subscription.unsubscribe();
    }, [setValue, watch]);

    const handleOnSubmit = (data) => {
        const { province, district, ward, payment, ...rest } = data;
        const { id: cartId } = cart;
        const newData = {
            ...rest,
            province: province.label,
            district: district.label,
            ward: ward.label,
            shippingFee: feeShip,
            payment,
        };

        Swal.fire({
            title: contextPage.titleModalOrder,
            confirmButtonText: contextPage.confirm,
            showCancelButton: true,
            cancelButtonText: contextPage.cancel,
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                Swal.fire({
                    title: contextPage.makeOrder,
                    didOpen: async () => {
                        Swal.showLoading();
                        const result = await paymentServices.postPayment({
                            cartId,
                            type: payment,
                            data: newData,
                        });

                        switch (result?.message) {
                            case 'Payment init complete':
                            case 'Payment Complete':
                                window.open(result.data, '_self');
                                break;
                            case ' Pay by COD successfully':
                                toast.success(notifies.paySuccess);
                                navigate(directions.home);
                                break;
                            default:
                                toast.error(notifies.payFail);
                                navigate(directions.cart);
                                break;
                        }
                        dispatch(cartAsync.getByToken());
                        Swal.close();
                    },
                });
            }
        });
    };

    return (
        <div className='container'>
            <div className='section'>
                <Row cols={1}>
                    <Col baseColsLg={3}>
                        {/* Info address */}
                        <Row cols={1} colsMd={2} colsLg={1}>
                            {inputGroups.checkout.map((item) => (
                                <Col key={item.inputName}>
                                    <TextField
                                        type={item.type}
                                        id={item.inputName}
                                        name={item.inputName}
                                        label={item.label}
                                        placeholder={item.placeholder}
                                        disabled={item.isDisable}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                            ))}

                            {/* Provinces */}
                            <Col>
                                <FormGroup
                                    name={inputNames.province}
                                    isLabel={false}
                                    errors={errors}
                                >
                                    <FormSelect
                                        name={inputNames.province}
                                        control={control}
                                        options={provinces}
                                        label='ProvinceName'
                                        value='ProvinceID'
                                        placeholder={placeholders.province}
                                    />
                                </FormGroup>
                            </Col>

                            {/* Districts */}
                            <Col>
                                <FormGroup
                                    name={inputNames.district}
                                    isLabel={false}
                                    errors={errors}
                                >
                                    <FormSelect
                                        name={inputNames.district}
                                        control={control}
                                        options={districts}
                                        label='DistrictName'
                                        value='DistrictID'
                                        placeholder={placeholders.district}
                                    />
                                </FormGroup>
                            </Col>

                            {/* Wards */}
                            <Col>
                                <FormGroup
                                    name={inputNames.ward}
                                    isLabel={false}
                                    errors={errors}
                                >
                                    <FormSelect
                                        name={inputNames.ward}
                                        control={control}
                                        options={wards}
                                        label='WardName'
                                        value='WardCod'
                                        placeholder={placeholders.ward}
                                    />
                                </FormGroup>
                            </Col>

                            {/* Address */}
                            <Col baseColsMd={12}>
                                <TextField
                                    id={inputNames.address}
                                    name={inputNames.address}
                                    label={labels.address}
                                    type={types.text}
                                    placeholder={placeholders.address}
                                    register={register}
                                    errors={errors}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col baseColsLg={4}>
                        <div className={cx('wrap')}>
                            <div className={cx('wrap-section')}>
                                <Typography variant='h2'>
                                    {contextPage.titlePaymentMethod}
                                </Typography>
                            </div>

                            <div style={{ padding: '14px' }}>
                                <PayMethods register={register} />
                            </div>
                        </div>
                    </Col>

                    <Col baseColsLg={5}>
                        <div className={cx('wrap')}>
                            <div className={cx('wrap-section')}>
                                <Typography variant='h2'>
                                    {contextParams.cartTotal(
                                        cart?.items?.length,
                                    )}
                                </Typography>
                            </div>

                            {/* Products */}
                            <div className={cx('wrap-section')}>
                                <ul className={cx('products')}>
                                    {!!cart?.items.length &&
                                        cart.items.map((item, index) => (
                                            <li
                                                key={index}
                                                className={cx('product')}
                                            >
                                                <span
                                                    className={cx('quantity')}
                                                >
                                                    {item.quantity}
                                                </span>
                                                <div className={cx('info')}>
                                                    <img
                                                        src={item.image[0].url}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                        className={cx('img')}
                                                    />
                                                    <Typography
                                                        variant='h5'
                                                        component='h3'
                                                        clamp={2}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                </div>
                                                <span
                                                    className={cx(
                                                        'text',
                                                        'text--price',
                                                    )}
                                                >
                                                    {currencyVN(item.subPrice)}
                                                </span>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            {/* Bill */}
                            <Row cols={1} classes={cx('wrap-section')}>
                                <Col>
                                    <div className={cx('wrap-text')}>
                                        <span className={cx('text')}>
                                            {contextPage.subTotal}
                                        </span>
                                        <span className={cx('text')}>
                                            {cart?.totalPrice &&
                                                currencyVN(cart?.totalPrice)}
                                        </span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className={cx('wrap-text')}>
                                        <span className={cx('text')}>
                                            {contextPage.feeShip}
                                        </span>
                                        <span className={cx('text')}>
                                            {feeShip || '-'}
                                        </span>
                                    </div>
                                </Col>
                            </Row>

                            <div className={cx('wrap-section')}>
                                <div className={cx('wrap-text')}>
                                    <span className={cx('large-text')}>
                                        {contextPage.priceTotal}
                                    </span>
                                    <span
                                        className={cx(
                                            'large-text',
                                            'large-text--blue',
                                        )}
                                    >
                                        {cart?.totalPrice &&
                                            currencyVN(
                                                cart?.totalPrice + feeShip,
                                            )}
                                    </span>
                                </div>
                            </div>

                            {/* Button */}
                            <Row
                                cols={1}
                                colsSm={2}
                                gy={4}
                                classes={cx('wrap-section')}
                            >
                                <Col>
                                    <TextLink
                                        to={directions.cart}
                                        reset
                                        classes={cx('link')}
                                    >
                                        <FontAwesomeIcon icon={faAngleLeft} />
                                        {contextPage.backToCart}
                                    </TextLink>
                                </Col>
                                <Col>
                                    <Button
                                        color='primary'
                                        full
                                        onClick={handleSubmit(handleOnSubmit)}
                                    >
                                        {contextPage.makeOrder}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Checkout;
