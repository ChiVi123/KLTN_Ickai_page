import { yupResolver } from '@hookform/resolvers/yup';
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
    contextPage,
    directions,
    inputGroups,
    notifies,
    schemas,
    types,
} from '~/common';
import {
    Button,
    Col,
    Row,
    TextField,
    TextLink,
    Typography,
} from '~/components';
import { userActions, userSelector } from '~/redux';
import { authServices, googleServices } from '~/services';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.login),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    const userId = useSelector(userSelector.getUserId);
    const login = useGoogleLogin({
        onSuccess: (response) => setUser(response),
        onError: (error) => {
            console.log(error);
            toast.error(notifies.loginGoogleFail);
        },
    });

    useEffect(() => {
        (async () => {
            if (user) {
                const result = await googleServices.getProfile(
                    user.access_token,
                );
                setProfile(result);
            }
        })();

        return () => {
            setProfile(null);
        };
    }, [user]);
    useEffect(() => {
        if (userId) {
            navigate(directions.home);
        }
    }, [userId, navigate]);
    useEffect(() => {
        (async () => {
            if (profile) {
                const data = {
                    id: profile.id,
                    email: profile.email,
                    name: profile.name,
                    avatar: profile.picture,
                };
                const result = await authServices.withSocial(data);

                dispatch(userActions.addUser(result));
                toast.success(notifies.loginGoogleSuccess);
            }
        })();
    }, [dispatch, profile]);

    const handleSubmitData = async (data) => {
        const result = await authServices.login(data);

        if (result) {
            dispatch(userActions.addUser(result));
            toast.success(notifies.loginSuccess);
            navigate(directions.home);
        } else {
            toast.error(notifies.loginFail);
        }
    };

    // logger({ groupName: 'Login', values: [inputs.login] });

    return (
        <article className='width-sm'>
            <section className='section'>
                <Typography
                    variant='h1'
                    center
                    style={{ '--margin-bottom': 'var(--spacer-5)' }}
                >
                    {contextPage.signIn}
                </Typography>

                <form
                    onSubmit={handleSubmit(handleSubmitData)}
                    className='form-sm'
                >
                    <Row cols={1} gy={2}>
                        {inputGroups.login.map((input) => (
                            <Col key={input.inputName}>
                                <TextField
                                    type={input.type}
                                    id={input.inputName}
                                    label={input.label}
                                    name={input.inputName}
                                    placeholder={input.placeholder}
                                    autoComplete={input.autoComplete}
                                    required
                                    register={register}
                                    errors={errors}
                                />
                            </Col>
                        ))}

                        <Col>
                            <Button type={types.submit} color='primary' full>
                                {contextPage.signIn}
                            </Button>
                            <div style={{ marginTop: 'var(--spacer-3)' }}></div>
                            <Row sb g={0}>
                                <TextLink to={directions.sendOtp}>
                                    {contextPage.forgotPassword}
                                </TextLink>
                                <TextLink to={directions.signUp}>
                                    {contextPage.textLinkSignUp}
                                </TextLink>
                            </Row>
                        </Col>

                        <Col>
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => login()}
                            >
                                {contextPage.signInWithGoogle}
                            </Button>
                        </Col>
                    </Row>
                </form>
            </section>
        </article>
    );
}

export default Login;
