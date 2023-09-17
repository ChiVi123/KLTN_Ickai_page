import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { contextButton, lists, titles } from '~/common';
import { Table, Typography } from '~/components';
import { categoriesAsync, categoriesSelector } from '~/redux';
import { categoryServices } from '~/services';

import CategoryItem from './categories/CategoryItem';

const updateStateCategory = ({ id, name, state }, callback) => {
    Swal.fire({
        title: 'Thay đổi trạng thái',
        didOpen: async () => {
            Swal.showLoading();
            const result = await categoryServices.updateCategory(id, {
                name,
                state,
            });
            const expectMessage = 'update category success ';
            const toastMessage = 'Thay đổi trạng thái thành công';
            const toastError = 'Thay đổi trạng thái thất bại';

            if (result.message === expectMessage) {
                toast.success(toastMessage);
            } else {
                toast.error(toastError);
            }

            if (callback) {
                callback();
            }

            Swal.close();
        },
    });
};

function Categories() {
    const dispatch = useDispatch();
    const { itemsAdmin: categories, isLoadingAdmin } = useSelector(
        categoriesSelector.getCategoriesState,
    );

    const handleState = (category) => {
        Swal.fire({
            title: titles.confirmChange,
            input: 'radio',
            inputOptions: {
                enable: 'Enable',
                disable: 'Disable',
            },
            inputValue: category.state,
            inputValidator: (value) => {
                if (!value) {
                    return 'Bạn cần chọn trạng thái cho sản phẩm!';
                }
            },
            confirmButtonText: contextButton.confirm,
            showCancelButton: true,
            cancelButtonText: contextButton.cancel,
        }).then(async ({ isConfirmed, value }) => {
            if (isConfirmed) {
                updateStateCategory({ ...category, state: value }, () => {
                    dispatch(categoriesAsync.getAllCategoryByAdmin());
                });
            }
        });
    };

    useEffect(() => {
        dispatch(categoriesAsync.getAllCategoryByAdmin());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className='section'>
            <Typography variant='h1'>{titles.categories}</Typography>

            <Table heads={lists.tableCate} isLoading={isLoadingAdmin}>
                {!!categories.length &&
                    categories.map((category, index) => (
                        <CategoryItem
                            key={index}
                            category={category}
                            onSetState={handleState}
                        />
                    ))}
            </Table>
        </section>
    );
}

export default Categories;
