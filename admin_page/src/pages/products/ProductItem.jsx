import { faLock, faLockOpen, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { contextPage, directions, notifies, titles } from '~/common';
import { ButtonIcon } from '~/components';
import { productsAsync } from '~/redux';
import { productServices } from '~/services';
import { currencyVN } from '~/utils/funcs';

import styles from '~/scss/pages/products/product-item.module.scss';

const cx = classNames.bind(styles);

const handleSoftDelete = ({ id, state }, callback) => {
    Swal.fire({
        title: titles.confirmChange,
        confirmButtonText: contextPage.yes,
        showCancelButton: true,
        cancelButtonText: contextPage.no,
        width: 'auto',
    }).then(async (result) => {
        if (result.isConfirmed) {
            if (state === 'enable') {
                const result = await productServices.deleteProduct(id);
                const expectMessage = 'Delete product successfully ';

                if (result?.message === expectMessage) {
                    toast.success(notifies.changeSuccess);
                } else {
                    toast.error(notifies.changeFail);
                }
            } else {
                const result = await productServices.restoreProduct(id);
                const expectMessage = 'Update State product successfully ';

                if (result?.message === expectMessage) {
                    toast.success(notifies.changeSuccess);
                } else {
                    toast.error(notifies.changeFail);
                }
            }

            if (callback) {
                callback();
            }
        }
    });
};

function ProductItem({ product }) {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const itemPerPage = 5;
    const firstPage = 1;
    const currentPage = searchParams.get('page') || firstPage;

    const handleClick = (product) => {
        handleSoftDelete(product, () => {
            dispatch(
                productsAsync.getAllState({
                    page: currentPage - 1,
                    size: itemPerPage,
                }),
            );
        });
    };

    return (
        <tr>
            <td className={cx('col-img')}>
                {product.images[0]?.url && (
                    <img
                        className={cx('img')}
                        src={product.images[0].url}
                        alt={product.name}
                    />
                )}
            </td>
            <td>
                <span className={cx('product-name')}>{product.name}</span>
            </td>
            <td>{product.price && currencyVN(product.price)}</td>
            <td>
                {product.state === 'enable' && (
                    <ButtonIcon to={directions.editProduct(product.id)}>
                        <FontAwesomeIcon icon={faPen} />
                    </ButtonIcon>
                )}
                <ButtonIcon
                    color={product.state === 'enable' ? 'second' : 'third'}
                    onClick={() => handleClick(product)}
                >
                    <FontAwesomeIcon
                        icon={product.state === 'enable' ? faLockOpen : faLock}
                    />
                </ButtonIcon>
            </td>
        </tr>
    );
}

export default ProductItem;
