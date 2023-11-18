import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
    contextPage,
    inputNames,
    notifies,
    placeholders,
    schemas,
    types,
} from '~/common';
import {
    Button,
    Col,
    FormQuill,
    Row,
    StarRating,
    Typography,
} from '~/components';
import { reviewsAsync } from '~/redux';
import { reviewServices } from '~/services';
import { logger } from '~/utils/logger';

function FormReview({
    productId = '',
    review = { id: '', rate: 1, content: '' },
    edit = false,
    onClose,
}) {
    const isLogger = false;
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schemas.review),
        defaultValues: {
            id: review.id,
            rate: review.rate,
            content: review.content,
        },
    });
    const dispatch = useDispatch();

    const handleOnSubmit = async (data) => {
        if (edit) {
            const expectMessage = 'Update comment successfully';
            const result = await reviewServices.editReview({
                id: review.id,
                data,
            });

            if (result?.message === expectMessage) {
                toast.success(notifies.success);
            } else {
                toast.error(notifies.fail);
            }
        } else {
            const result = await reviewServices.addReview({
                productId,
                ...data,
            });
            const expectMessage = 'Add comment success ';

            if (result?.message === expectMessage) {
                toast.success(notifies.success);
            } else {
                toast.error(notifies.fail);
            }
        }

        dispatch(reviewsAsync.getByProductId(productId));
        onClose();
    };

    if (isLogger) {
        logger({ groupName: FormReview.name, values: ['re-render'] });
    }

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
                                initialValue={review.rate}
                                transition
                                size='lg'
                                onClick={onChange}
                            />
                        )}
                    />
                    <div className='invalid'>{errors.rate?.message}</div>
                </Col>
                <Col>
                    <FormQuill
                        name={inputNames.content}
                        placeholder={placeholders.content}
                        control={control}
                    />
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
