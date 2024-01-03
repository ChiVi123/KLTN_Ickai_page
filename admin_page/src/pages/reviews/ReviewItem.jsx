import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import HTMLReactParser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { contextPage, keys, notifies, titles } from '~/common';
import { ButtonIcon } from '~/components';
import { reviewsAsync } from '~/redux';
import { reviewServices } from '~/services';
import { formatLocalDate } from '~/utils/funcs';

import styles from '~/scss/pages/reviews/review-item.module.scss';

const cx = classNames.bind(styles);

function ReviewItem({ review }) {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const itemPerPage = 5;
    const firstPage = 1;
    const currentPage = parseInt(searchParams.get(keys.page)) || firstPage;
    const reviewState = searchParams.get(keys.state) || '';
    const reviewSort = searchParams.get(keys.sortBy) || '';

    const handleToggleBlock = async ({ id, state }) => {
        Swal.fire({
            title: titles.confirmChange,
            confirmButtonText: contextPage.yes,
            showCancelButton: true,
            cancelButtonText: contextPage.no,
            width: 'auto',
        }).then(async (result) => {
            if (result.isConfirmed) {
                switch (state) {
                    case 'enable':
                        const expectMessageBlock =
                            'Block comment successfully ';
                        const resultBlock = await reviewServices.blockReview(
                            id,
                        );

                        if (resultBlock?.message === expectMessageBlock) {
                            toast.success(notifies.blockReviewSuccess);

                            dispatch(
                                reviewsAsync.search({
                                    sortBy: reviewSort,
                                    state: reviewState,
                                    page: currentPage - 1,
                                    size: itemPerPage,
                                }),
                            );
                            dispatch(reviewsAsync.count());
                        } else {
                            toast.error(notifies.blockReviewFail);
                        }
                        break;
                    case 'block':
                        const expectMessageEnable = ' Comment successfully ';
                        const resultEnable = await reviewServices.unblockReview(
                            id,
                        );

                        if (resultEnable?.message === expectMessageEnable) {
                            toast.success(notifies.unblockReviewSuccess);

                            dispatch(
                                reviewsAsync.search({
                                    sortBy: reviewSort,
                                    state: reviewState,
                                    page: currentPage - 1,
                                    size: itemPerPage,
                                }),
                            );
                            dispatch(reviewsAsync.count());
                        } else {
                            toast.error(notifies.unblockReviewFail);
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    };

    return (
        <tr>
            <td className={cx('td-product')} title={review.productname}>
                <div className={cx('data-product')}>{review.productname}</div>
            </td>
            <td className={cx('td-user')} title={review.reviewedBy}>
                <div className={cx('data-user')}>{review.reviewedBy}</div>
            </td>
            <td className={cx('td-content')}>
                <div className={cx('data-content')}>
                    {HTMLReactParser(review.content)}
                </div>
            </td>
            <td className={cx('td-create-date')}>
                {formatLocalDate(new Date(review.createdDate))}
            </td>
            <td className={cx('td-action')}>
                <ButtonIcon
                    color={review.state === 'block' ? 'third' : 'second'}
                    size='sm'
                    onClick={() => handleToggleBlock(review)}
                >
                    <FontAwesomeIcon
                        icon={review.state === 'enable' ? faLockOpen : faLock}
                    />
                </ButtonIcon>
            </td>
        </tr>
    );
}

export default ReviewItem;
