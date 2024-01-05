import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import { userActions, userSelector } from '~/redux';
import { authServices } from '~/services';

function CheckOtp() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.confirmOTP),
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userSelector.selectInfo);

    const handleOnSubmit = async (data) => {
        const email = user.email;
        const type = 'reset';
        const result = await authServices.verifyOtp({ ...data, email, type });

        if (result?.data?.id) {
            toast.success(notifies.confirmOTPSuccess);
            dispatch(
                userActions.addUser({
                    ...result.data,
                    accessToken: result.data.token,
                }),
            );
            navigate(directions.resetPassword);
        } else {
            toast.error(notifies.confirmOTPFail);
        }
    };

    return (
        <article className='width-sm'>
            <section className='section'>
                <Typography variant='h1' center>
                    {contextPage.confirmCode}
                </Typography>

                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Row cols={1} colsMd={2}>
                        <Col>
                            <TextField
                                type={types.text}
                                id={inputNames.otp}
                                label={labels.otp}
                                name={inputNames.otp}
                                placeholder={placeholders.otp}
                                autoComplete={autoCompletes.off}
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
                                    {contextPage.confirm}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </section>
        </article>
    );
}

export default CheckOtp;
