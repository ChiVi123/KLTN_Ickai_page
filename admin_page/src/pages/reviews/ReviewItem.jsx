import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import HTMLReactParser from 'html-react-parser';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { notifies, titles } from '~/common';

import { Button } from '~/components';
import styles from '~/scss/pages/reviews/review-item.module.scss';
import { reviewServices } from '~/services';

const cx = classNames.bind(styles);
const reactSwal = withReactContent(Swal);

function ReviewItem({ review, callback }) {
    const handleReadContent = (content) => {
        reactSwal.fire({
            title: titles.contentReview,
            html: (
                <div className={cx('wrapper-content')}>
                    {HTMLReactParser(content)}
                </div>
            ),
        });
    };
    const handleToggleBlock = async ({ id, state }) => {
        switch (state) {
            case 'enable':
                const expectMessageBlock = 'Block comment successfully ';
                const resultBlock = await reviewServices.blockReview({ id });

                if (resultBlock?.message === expectMessageBlock) {
                    toast.success(notifies.blockReviewSuccess);

                    callback();
                } else {
                    toast.error(notifies.blockReviewFail);
                }
                break;
            case 'block':
                const expectMessageEnable = ' Comment successfully ';
                const resultEnable = await reviewServices.unblockReview({ id });

                if (resultEnable?.message === expectMessageEnable) {
                    toast.success(notifies.unblockReviewSuccess);

                    callback();
                } else {
                    toast.error(notifies.unblockReviewFail);
                }
                break;
            default:
                break;
        }
    };

    return (
        <tr>
            <td className={cx('td-review-id')} title={review.id}>
                {review.id}
            </td>
            <td className={cx('td-user')} title={review.reviewedBy}>
                {review.reviewedBy}
            </td>
            <td className={cx('td-product')} title={review.productname}>
                {review.productname}
            </td>
            <td>{review.lastupdateDate || review.createdDate}</td>
            <td>
                <Button
                    color={review.state === 'block' ? 'primary' : 'second'}
                    size='sm'
                    onClick={() => handleToggleBlock(review)}
                >
                    <FontAwesomeIcon
                        icon={review.state === 'enable' ? faLockOpen : faLock}
                    />
                </Button>
                <Button
                    color='primary'
                    variant='outlined'
                    size='sm'
                    onClick={() => handleReadContent(review.content)}
                >
                    <FontAwesomeIcon icon={faEye} />
                </Button>
            </td>
        </tr>
    );
}

ReviewItem.propTypes = {
    callback: PropTypes.func,
};

export default ReviewItem;
