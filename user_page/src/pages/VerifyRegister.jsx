import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import {
    contextPage,
    directions,
    inputNames,
    labels,
    notifies,
    placeholders,
    schemas,
    types,
} from '~/common';
import { Button, Col, Row, TextField, Typography } from '~/components';
import { userActions, userSelector } from '~/redux';
import { authServices } from '~/services';

function CheckOtpRegister() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector.selectInfo);
    const [searchParams] = useSearchParams();

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.confirmOTPRegister),
        defaultValues: {
            email: user.email || searchParams.get('email') || '',
            otp: '',
        },
    });
    const navigate = useNavigate();

    const handleOnSubmit = async (
        data,
        {
            nativeEvent: {
                submitter: { attributes },
            },
        },
    ) => {
        const type = 'register';
        const attribute = 'button-type';
        const { value } = attributes[attribute];

        // logger({
        //     groupName: 'CheckOtpRegister handleSubmit',
        //     values: [value],
        // });

        switch (value) {
            case 're-send':
                Swal.fire({
                    title: contextPage.sendOtp,
                    didOpen: async () => {
                        Swal.showLoading();
                        const email = getValues(inputNames.email);
                        const result = await authServices.getOtp({
                            email: user.email || email,
                        });
                        const expectMessage = 'Send otp email success';
                        if (result?.message === expectMessage) {
                            toast.success(notifies.sendOTPSuccess);
                        } else {
                            toast.error(notifies.sendOTPFail);
                        }
                        Swal.close();
                    },
                });

                return;
            case 'confirm':
                const result = await authServices.verifyOtp({ ...data, type });

                if (result?.data?.id) {
                    dispatch(userActions.addUser(result.data));
                    toast.success(notifies.confirmOTPSuccess);
                    navigate(directions.home);
                } else {
                    toast.error(notifies.confirmOTPFail);
                }
                return;

            default:
                toast.error(notifies.error);
                return;
        }
    };

    return (
        <article className='width-sm'>
            <section className='section'>
                <Typography variant='h1' center>
                    {contextPage.confirmCode}
                </Typography>

                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Row cols={1}>
                        <Col>
                            <TextField
                                type={types.email}
                                id={inputNames.email}
                                label={labels.email}
                                name={inputNames.email}
                                placeholder={placeholders.email}
                                disabled
                                register={register}
                                errors={errors}
                            />
                        </Col>

                        <Col>
                            <TextField
                                type={types.text}
                                id={inputNames.otp}
                                label={labels.otp}
                                name={inputNames.otp}
                                placeholder={placeholders.otp}
                                required
                                register={register}
                                errors={errors}
                            />
                        </Col>

                        <Col>
                            <Row gx={3} center>
                                <Col baseCols={3}>
                                    <Button
                                        type={types.submit}
                                        variant='outlined'
                                        color='primary'
                                        button-type='re-send'
                                    >
                                        {contextPage.reSend}
                                    </Button>
                                </Col>
                                <Col baseCols={3}>
                                    <Button
                                        type={types.submit}
                                        color='primary'
                                        button-type='confirm'
                                    >
                                        {contextPage.confirm}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </section>
        </article>
    );
}

export default CheckOtpRegister;
