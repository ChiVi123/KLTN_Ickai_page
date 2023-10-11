import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { contextPage, inputGroups, notifies, schemas, types } from '~/common';
import { Button, Col, Row, TextField } from '~/components';
import { userActions } from '~/redux';
import { userServices } from '~/services';
import { logger } from '~/utils/logger';

const userType = {
    id: '',
    name: '',
    email: '',
    phone: '',
};

function Form({ user = userType }) {
    const isLogger = false;
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemas.profile),
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone || '',
        },
    });

    const handleOnSubmit = async (data) => {
        const { name, phone } = data;
        const { id } = user;

        if (name !== user.name || phone !== user.phone) {
            const result = await userServices.updateUser(id, data);
            const expectMessage = 'Update info user successfully';

            if (result?.message === expectMessage) {
                toast.success(notifies.updateUserSuccess);
                dispatch(userActions.updateUser(data));
            } else {
                toast.error(notifies.updateUserFail);
            }
        }
    };

    if (isLogger) {
        logger({ groupName: Form.name, values: ['re-render'] });
    }

    return (
        <form
            className='form'
            style={{ '--width': '100%' }}
            onSubmit={handleSubmit(handleOnSubmit)}
        >
            <Row g={3}>
                <Col baseCols={8}>
                    <Row cols={1}>
                        {inputGroups.profile.map((item) => (
                            <Col key={item.inputName}>
                                <TextField
                                    type={item.type}
                                    id={item.inputName}
                                    label={item.label}
                                    name={item.inputName}
                                    placeholder={item.placeholder}
                                    disabled={item?.disabled}
                                    register={register}
                                    errors={errors}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col baseCols={4}>
                    <div className='df-center' style={{ height: '100%' }}>
                        <Button
                            type={types.submit}
                            variant='outlined'
                            color='primary'
                            size='sm'
                        >
                            {contextPage.save}
                        </Button>
                    </div>
                </Col>
            </Row>
        </form>
    );
}

export default Form;
