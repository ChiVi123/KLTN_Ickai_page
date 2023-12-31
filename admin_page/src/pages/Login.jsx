import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    contextButton,
    contextPage,
    directions,
    inputNames,
    labels,
    notifies,
    placeholders,
    schemas,
    titles,
    types,
} from '~/common';
import { Button, Col, Row, TextField, Typography } from '~/components';
import { userActions, userSelector } from '~/redux';
import styles from '~/scss/pages/login.module.scss';
import { authServices } from '~/services';

const cx = classNames.bind(styles);

function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.login),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(userSelector.selectInfo);

    useEffect(() => {
        if (user.role === 'role_admin') {
            navigate(directions.dashboard);
        }
    }, [user, navigate]);

    const handleOnSubmit = async (data) => {
        const result = await authServices.login(data);

        if (result) {
            dispatch(userActions.addUser(result));
            toast.success(notifies.loginSuccess);
            navigate(directions.dashboard);
        } else {
            toast.error(notifies.loginFail);
        }
    };

    return (
        <main className={`df-center ${cx('wrap')}`}>
            <article className={`section width-xs ${cx('form')}`}>
                <Typography variant='para1' classes={cx('logo-text')}>
                    {contextPage.textLogo}
                </Typography>
                <Typography
                    variant='h2'
                    component='h1'
                    style={{ '--margin-bottom': '24px' }}
                >
                    {titles.login}
                </Typography>

                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Row cols={1} gy={2}>
                        <Col>
                            <TextField
                                type={types.email}
                                id={inputNames.email}
                                name={inputNames.email}
                                label={labels.email}
                                placeholder={placeholders.email}
                                register={register}
                                errors={errors}
                                required
                            />
                        </Col>
                        <Col>
                            <TextField
                                type={types.password}
                                id={inputNames.password}
                                name={inputNames.password}
                                label={labels.password}
                                placeholder={placeholders.password}
                                register={register}
                                errors={errors}
                                required
                            />
                        </Col>
                        <Col>
                            <Button type={types.submit} color='primary' full>
                                {contextButton.login}
                            </Button>
                        </Col>
                    </Row>
                </form>
            </article>
        </main>
    );
}

export default Login;
