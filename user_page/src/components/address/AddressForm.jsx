import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    contextPage,
    inputNames,
    labels,
    placeholders,
    schemas,
    types,
} from '~/common';
import { servicesGHN } from '~/services';
import Button from '../Button';
import Col from '../Col';
import FormGroup from '../FormGroup';
import FormSelect from '../FormSelect';
import Row from '../Row';
import TextField from '../TextField';
import Typography from '../Typography';

function AddressForm({ edit = false, onClose = () => {} }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.addressForm),
        defaultValues: {
            name: '',
            phone: '',
            address: '',
        },
    });

    // - useEffect
    useEffect(() => {
        (async () => {
            const resultProvinces = await servicesGHN.getProvince();
            setProvinces(resultProvinces);
        })();
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
        };

        const subscription = watch((value, { name, type }) => {
            fetchApi(value, name, type);
        });

        return () => subscription.unsubscribe();
    }, [setValue, watch]);

    const handleOnSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}
            >
                <Typography variant='h2'>
                    {edit ? 'Chỉnh sửa' : 'Thêm địa chỉ'}
                </Typography>
                <button type='button' onClick={onClose}>
                    X
                </button>
            </div>
            <Row cols={1} gy={1}>
                <Col>
                    <TextField
                        type='text'
                        id='shipName'
                        name='shipName'
                        label='Tên người nhận'
                        placeholder=''
                        register={register}
                        errors={errors}
                    />
                </Col>
                <Col>
                    <TextField
                        type='text'
                        id='phone'
                        name='phone'
                        label='Số điện thoại'
                        placeholder=''
                        register={register}
                        errors={errors}
                    />
                </Col>
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
                        id='address'
                        name='address'
                        label={labels.address}
                        type={types.text}
                        placeholder=''
                        register={register}
                        errors={errors}
                    />
                </Col>
                <Col>
                    <Button
                        type={types.submit}
                        color='primary'
                        style={{ marginLeft: '6px' }}
                    >
                        {contextPage.send}
                    </Button>
                </Col>
            </Row>
        </form>
    );
}

export default AddressForm;
