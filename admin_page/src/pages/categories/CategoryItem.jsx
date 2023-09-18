import { faCircleCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Button } from '~/components';
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
            <td>
                {category?.categoryimage && (
                    <img
                        className={cx('image-category')}
                        src={category?.categoryimage}
                        alt={category.name}
                    />
                )}
            </td>
            <td>{category.name}</td>
            <td>{category.state}</td>
            <td>
                <Button
                    color='primary'
                    variant='outlined'
                    classes={cx('btn', 'btn--edit')}
                >
                    <FontAwesomeIcon icon={faPen} />
                </Button>
                <Button
                    color='second'
                    classes={cx('btn', 'btn--check')}
                    onClick={() => handleSetState(category)}
                >
                    <FontAwesomeIcon icon={faCircleCheck} />
                </Button>
            </td>
        </tr>
    );
}

export default CategoryItem;
