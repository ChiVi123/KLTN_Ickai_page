import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import HTMLReactParser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { keys, notifies, titles } from '~/common';
import { ButtonIcon } from '~/components';
import { reviewsAsync } from '~/redux';
import { reviewServices } from '~/services';
import { formatLocalDate } from '~/utils/funcs';

import styles from '~/scss/pages/reviews/review-item.module.scss';

const cx = classNames.bind(styles);
const reactSwal = withReactContent(Swal);

function ReviewItem({ review }) {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const itemPerPage = 5;
    const firstPage = 1;
    const currentPage = parseInt(searchParams.get(keys.page)) || firstPage;
    const reviewState = searchParams.get(keys.state) || '';
    const reviewSort = searchParams.get(keys.sortBy) || 'newest';

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
                const resultBlock = await reviewServices.blockReview(id);

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
                const resultEnable = await reviewServices.unblockReview(id);

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
    };

    return (
        <tr>
            <td className={cx('td-user')} title={review.reviewedBy}>
                {review.reviewedBy}
            </td>
            <td className={cx('td-product')} title={review.productname}>
                {review.productname}
            </td>
            <td>{formatLocalDate(new Date(review.createdDate))}</td>
            <td>
                <ButtonIcon
                    color={review.state === 'block' ? 'third' : 'second'}
                    size='sm'
                    onClick={() => handleToggleBlock(review)}
                >
                    <FontAwesomeIcon
                        icon={review.state === 'enable' ? faLockOpen : faLock}
                    />
                </ButtonIcon>
                <ButtonIcon
                    color='primary'
                    size='sm'
                    onClick={() => handleReadContent(review.content)}
                >
                    <FontAwesomeIcon icon={faEye} />
                </ButtonIcon>
            </td>
        </tr>
    );
}

export default ReviewItem;
