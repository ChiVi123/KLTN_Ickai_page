import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
    autoCompletes,
    contextButton,
    inputNames,
    labels,
    placeholders,
    schemas,
    titles,
    types,
} from '~/common';
import { Button, ButtonIcon, TextField, Typography } from '~/components';
import { categoriesAsync } from '~/redux';
import { categoryServices } from '~/services';
import { logger } from '~/utils/logger';

function CategoryForm({
    category = { name: '', state: 'enable' },
    edit = false,
    onClose = () => {},
}) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schemas.category),
        defaultValues: {
            ...category,
        },
    });
    const dispatch = useDispatch();
    const handleOnSubmit = (data) => {
        Swal.fire({
            title: 'Thay đổi trạng thái',
            didOpen: async () => {
                Swal.showLoading();
                const result = await categoryServices.updateCategory(
                    data.id,
                    data,
                );
                const expectMessage = 'update category success ';
                const toastMessage = 'Thay đổi thành công';
                const toastError = 'Thay đổi thất bại';

                if (result.message === expectMessage) {
                    toast.success(toastMessage);
                } else {
                    toast.error(toastError);
                }

                dispatch(categoriesAsync.getAllState());
                onClose();

                Swal.close();
            },
        });
    };
    const isLogger = false;

    if (isLogger) {
        logger({ groupName: CategoryForm.name, values: ['re-render'] });
    }

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h3' component='h2'>
                    {edit ? titles.editCategory : titles.addCategory}
                </Typography>

                <ButtonIcon size='sm' onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} size='xs' />
                </ButtonIcon>
            </div>
            <div>
                <TextField
                    id={inputNames.name}
                    label={labels.category}
                    name={inputNames.name}
                    placeholder={placeholders.category}
                    autoComplete={autoCompletes.on}
                    required
                    register={register}
                    errors={errors}
                />
            </div>

            {edit && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        columnGap: '8px',
                        marginBottom: '8px',
                    }}
                >
                    <label htmlFor={labels.enable}>
                        <input
                            type='radio'
                            id={labels.enable}
                            {...register(inputNames.state)}
                            value='enable'
                        />
                        {labels.enable}
                    </label>
                    <label htmlFor={labels.disable}>
                        <input
                            type='radio'
                            id={labels.disable}
                            {...register(inputNames.state)}
                            value='disable'
                        />
                        {labels.disable}
                    </label>
                </div>
            )}
            <div className='df-center'>
                <Button type={types.submit}>
                    {edit ? contextButton.edit : contextButton.add}
                </Button>
            </div>
        </form>
    );
}

export default CategoryForm;
