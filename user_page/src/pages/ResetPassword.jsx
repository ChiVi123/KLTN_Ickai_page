import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import { Button, Col, TextField, Typography } from '~/components';
import { userActions, userSelector } from '~/redux';
import { userServices } from '~/services';

function ResetPassword() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.resetPassword),
        defaultValues: {
            password: '',
        },
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userSelector.selectInfo);

    const handleOnSubmit = async (data) => {
        const id = user.id;
        const resetpass = data.password;
        const result = await userServices.resetPassword(id, { resetpass });

        if (result?.data?.id) {
            toast.success(notifies.resetPasswordSuccess);
            navigate(directions.signIn);
        } else {
            toast.error(notifies.resetPasswordFail);
        }
        dispatch(userActions.reset());
    };

    return (
        <article className='width-sm'>
            <section className='section'>
                <Typography variant='h1' center>
                    {contextPage.resetPassword}
                </Typography>

                <Form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Col baseCols={12} baseColsMd={6}>
                        <TextField
                            type={types.password}
                            id={inputNames.password}
                            label={labels.password}
                            name={inputNames.password}
                            placeholder={placeholders.password}
                            register={register}
                            errors={errors}
                        />
                    </Col>
                    <Col baseCols={12} baseColsMd={6}>
                        <Button type={types.submit} color='primary'>
                            {contextPage.confirm}
                        </Button>
                    </Col>
                </Form>
            </section>
        </article>
    );
}

export default ResetPassword;
