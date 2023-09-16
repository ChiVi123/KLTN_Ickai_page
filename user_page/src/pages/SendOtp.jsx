import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import {
    autoCompletes,
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
import { userActions } from '~/redux';
import { authServices } from '~/services';

function SendOtp() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.sendOTP),
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnSubmit = ({ email }) => {
        Swal.fire({
            title: contextPage.sendOtp,
            didOpen: async () => {
                Swal.showLoading();
                const errorMessage = `Can not found user with email ${email} is activated`;
                const expectMessage = 'Send otp email success';

                try {
                    const result = await authServices.getOtpReset({ email });

                    if (result?.message === expectMessage) {
                        toast.success(notifies.sendOTPSuccess);
                        dispatch(userActions.addUser({ email }));
                        navigate(directions.checkOtp);
                    }
                } catch (error) {
                    if (error === errorMessage) {
                        toast.error(notifies.emailNotExist(email));
                    } else {
                        toast.error(notifies.sendOTPFail);
                    }
                }

                Swal.close();
            },
        });
    };

    return (
        <article className='width-sm'>
            <section className='section'>
                <Typography variant='h1' center>
                    {contextPage.sendOtp}
                </Typography>
                <Typography variant='para1' center>
                    {contextPage.messageSendOtp}
                </Typography>

                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Row cols={1} colsMd={2}>
                        <Col>
                            <TextField
                                type={types.text}
                                id={inputNames.email}
                                label={labels.email}
                                name={inputNames.email}
                                placeholder={placeholders.email}
                                autoComplete={autoCompletes.email}
                                required
                                register={register}
                                errors={errors}
                            />
                        </Col>

                        <Col>
                            <div
                                className='df-center'
                                style={{ height: '100%' }}
                            >
                                <Button type={types.submit} color='primary'>
                                    {contextPage.send}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </section>
        </article>
    );
}

export default SendOtp;
