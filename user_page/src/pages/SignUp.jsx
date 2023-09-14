import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
import { userActions } from '~/redux';
import { authServices } from '~/services';

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.register),
    });

    const dispatch = useDispatch();

    const handleOnSubmit = async ({ name, email, password }) => {
        Swal.fire({
            title: contextPage.sendOtp,
            didOpen: async () => {
                Swal.showLoading();
                const expectMessage = 'Register successfully ';
                const user = await authServices.registerSendMail({
                    name,
                    email,
                    password,
                });

                if (user?.message === expectMessage) {
                    toast.success(notifies.signUpSuccess);
                    dispatch(userActions.addUser({ name, email, password }));
                } else {
                    toast.error(notifies.signUpFail);
                }

                Swal.close();
            },
        });
    };

    return (
        <article className='width-sm'>
            <section className='section'>
                <Typography
                    variant='h1'
                    center
                    style={{ '--margin-bottom': 'var(--spacer-5)' }}
                >
                    {contextPage.signUp}
                </Typography>

                <form
                    onSubmit={handleSubmit(handleOnSubmit)}
                    className='form-sm'
                >
                    <Row cols={1} gy={4}>
                        {inputGroups.register.map((input) => (
                            <Col key={input.inputName}>
                                <TextField
                                    type={input.type}
                                    id={input.inputName}
                                    label={input.label}
                                    name={input.inputName}
                                    placeholder={input.placeholder}
                                    required
                                    register={register}
                                    errors={errors}
                                />
                            </Col>
                        ))}
                        <Col>
                            <Row cols={1} gy={3}>
                                <Col>
                                    <Button
                                        type={types.submit}
                                        color='primary'
                                        full
                                    >
                                        {contextPage.signUp}
                                    </Button>
                                </Col>
                                <Col>
                                    <TextLink to={directions.signIn} center>
                                        {contextPage.textLinkSignIn}
                                    </TextLink>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </section>
        </article>
    );
}

export default Register;
