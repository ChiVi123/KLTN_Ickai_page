import { faCircleCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { ButtonIcon } from '~/components';
import styles from '~/scss/pages/categories/category-item.module.scss';

const cx = classNames.bind(styles);

function CategoryItem({ category, onSetState }) {
    const handleSetState = (category) => {
        if (onSetState) {
            onSetState(category);
        }
    };

    return (
        <tr>
            <td>{category.name}</td>
            <td>{category.state}</td>
            <td>
                <ButtonIcon classes={cx('btn--edit')}>
                    <FontAwesomeIcon icon={faPen} />
                </ButtonIcon>
                <ButtonIcon
                    color='second'
                    classes={cx('btn--check')}
                    onClick={() => handleSetState(category)}
                >
                    <FontAwesomeIcon icon={faCircleCheck} />
                </ButtonIcon>
            </td>
        </tr>
    );
}

export default CategoryItem;
