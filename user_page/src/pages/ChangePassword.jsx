import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    contextButton,
    directions,
    inputNames,
    labels,
    notifies,
    schemas,
    titles,
    types,
} from '~/common';
import { Button, TextField, Typography } from '~/components';
import { userSelector } from '~/redux';
import { userServices } from '~/services';
import { logger } from '~/utils/logger';

function ChangePassword() {
    const isLogger = true;
    const userId = useSelector(userSelector.getUserId);
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schemas.changePassword),
        defaultValues: {
            oldpass: '',
            newpass: '',
        },
    });

    const handleOnSubmit = async (data) => {
        if (userId) {
            const result = await userServices.changePassword(userId, data);

            if (result?.message === 'Change password success') {
                toast.success(notifies.changePasswordSuccess);
                navigate(directions.profile);
            } else {
                toast.error(notifies.changePasswordFail);
            }
        }

        if (isLogger) {
            logger({ groupName: ChangePassword.name, values: [data] });
        }
    };

    return (
        <article className='width-sm'>
            <section className='section'>
                <Typography
                    variant='h1'
                    center
                    style={{ '--margin-bottom': 'var(--spacer-5)' }}
                >
                    {titles.changePassword}
                </Typography>

                <form
                    onSubmit={handleSubmit(handleOnSubmit)}
                    className='form-sm'
                >
                    <TextField
                        type={types.password}
                        id='old-password'
                        name={inputNames.oldPassword}
                        label={labels.oldPassword}
                        placeholder=''
                        autoComplete='off'
                        required
                        register={register}
                        errors={errors}
                    />
                    <TextField
                        type={types.password}
                        id='new-password'
                        name={inputNames.newPassword}
                        label={labels.newPassword}
                        placeholder=''
                        autoComplete='off'
                        required
                        register={register}
                        errors={errors}
                    />
                    <div className='df-center'>
                        <Button
                            type={types.submit}
                            color='primary'
                            size='md'
                            variant='contained'
                        >
                            {contextButton.change}
                        </Button>
                    </div>
                </form>
            </section>
        </article>
    );
}

export default ChangePassword;
