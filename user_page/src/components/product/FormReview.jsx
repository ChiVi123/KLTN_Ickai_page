import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
    contextPage,
    inputNames,
    placeholders,
    schemas,
    types,
} from '~/common';
import { Button, Col, Row, StarRating, Typography } from '~/components';
import { logger } from '~/utils/logger';

function FormReview({ rate = 1, content = '', onClose }) {
    const oneStar = 1;
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schemas.review),
        defaultValues: {
            rate,
            content,
        },
    });
    const handleOnSubmit = (data) => {
        logger({ groupName: FormReview.name, values: [data] });
    };

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h2'>{contextPage.titleReview}</Typography>
                <button type='button' onClick={onClose}>
                    X
                </button>
            </div>
            <Row cols={1} gy={3}>
                <Col>
                    <Controller
                        name={inputNames.rate}
                        control={control}
                        render={({ field: { onChange } }) => (
                            <StarRating
                                initialValue={oneStar}
                                transition
                                size='xl'
                                onClick={onChange}
                            />
                        )}
                    />
                    <div className='invalid'>{errors.rate?.message}</div>
                </Col>
                <Col>
                    <textarea
                        id={inputNames.content}
                        cols='60'
                        rows='6'
                        placeholder={placeholders.content}
                        style={{ padding: '8px', marginLeft: '6px' }}
                        {...register(inputNames.content)}
                    ></textarea>
                    <div style={{ marginLeft: '6px' }} className='invalid'>
                        {errors.content?.message}
                    </div>
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

export default FormReview;
