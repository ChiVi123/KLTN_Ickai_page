import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { ButtonIcon } from '~/components';
import styles from '~/scss/pages/categories/category-item.module.scss';
import CategoryForm from './CategoryForm';

const cx = classNames.bind(styles);

function CategoryItem({ category }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <tr>
            <td>{category.name}</td>
            <td>{category.state}</td>
            <td>
                <ButtonIcon classes={cx('btn--edit')} onClick={handleOpen}>
                    <FontAwesomeIcon icon={faPen} />
                </ButtonIcon>
                <ReactModal
                    isOpen={isOpen}
                    overlayClassName={'overlay'}
                    className={'modal'}
                    preventScroll={true}
                    ariaHideApp={false}
                    onRequestClose={handleClose}
                >
                    <CategoryForm
                        category={category}
                        edit
                        onClose={handleClose}
                    />
                </ReactModal>
            </td>
        </tr>
    );
}

export default CategoryItem;
