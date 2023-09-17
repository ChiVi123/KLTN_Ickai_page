import { faLock, faLockOpen, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { contextPage, directions, notifies, titles } from '~/common';
import { Button } from '~/components';
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
                productsAsync.getAllProductByAdmin({
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
            <td className={cx('td', 'td-name')}>
                <span className={cx('product-name')}>{product.name}</span>
            </td>
            <td className={cx('td')}>
                {product.price && currencyVN(product.price)}
            </td>
            <td className={cx('td', 'td-summary')}>
                <div className={cx('ql-editor', 'summary')}>
                    {parse(product.summary)}
                </div>
            </td>
            <td className={cx('td')}>
                {product.state === 'enable' && (
                    <Button
                        to={directions.editProduct(product.id)}
                        color='primary'
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                )}
                <Button
                    color={product.state === 'enable' ? 'second' : ''}
                    onClick={() => handleClick(product)}
                >
                    <FontAwesomeIcon
                        icon={product.state === 'enable' ? faLockOpen : faLock}
                    />
                </Button>
            </td>
        </tr>
    );
}

export default ProductItem;
