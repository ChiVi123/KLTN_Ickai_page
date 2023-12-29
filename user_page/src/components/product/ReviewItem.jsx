import classNames from 'classnames/bind';
import parser from 'html-react-parser';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { avatarDefault } from '~/assets/images';
import { contextPage } from '~/common';
import { StarRating, Typography } from '~/components';
import { useModal } from '~/hooks';
import { reviewsAsync, userSelector } from '~/redux';
import { reviewServices } from '~/services';

import styles from '~product/review.module.scss';

import { formatLocalDate } from '~/utils/funcs';
import FormReview from './FormReview';

const cx = classNames.bind(styles);

function ReviewItem({ review }) {
    const level1 = 1;

    const dispatch = useDispatch();
    const { id } = useParams();
    const userId = useSelector(userSelector.selectId);
    const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();

    const handleDelete = async () => {
        Swal.fire({
            title: contextPage.messageDeleteReview,
            confirmButtonText: contextPage.confirm,
            showCancelButton: true,
            cancelButtonText: contextPage.cancel,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await reviewServices.deleteByUser(review.id);

                if (result.isSuccess) {
                    dispatch(reviewsAsync.getByProductId(review.productid));
                }
            }
        });
    };

    return (
        <div className={cx('wrap-review')}>
            <div className={cx('avatar')}>
                <img
                    src={review.userimage || avatarDefault}
                    alt={review.reviewedBy}
                />
            </div>

            {/* Body Review */}
            <div>
                <div className={cx({ 'wrap-child': review.level > level1 })}>
                    <Typography variant='h3'>{review.reviewedBy}</Typography>

                    <StarRating initialValue={review.rate} size='xs' readonly />

                    <Typography variant='para1' component='div'>
                        {parser(review.content || '')}
                    </Typography>

                    <div className={cx('wrap-info')}>
                        <Typography variant='text2' classes={cx('text-date')}>
                            {contextPage.date}{' '}
                            {formatLocalDate(new Date(review.createdDate))}
                        </Typography>

                        {userId === review.userid && (
                            <>
                                <div className={cx('dot')}></div>
                                <Typography
                                    variant='text2'
                                    classes={cx('text-line')}
                                    onClick={handleOpenModal}
                                >
                                    {contextPage.edit}
                                </Typography>
                            </>
                        )}

                        <ReactModal
                            isOpen={isOpenModal}
                            overlayClassName='overlay'
                            className='modal modal--small modal--center'
                            preventScroll={true}
                            ariaHideApp={false}
                            onRequestClose={handleCloseModal}
                        >
                            <FormReview
                                productId={id}
                                review={review}
                                edit
                                onClose={handleCloseModal}
                            />
                        </ReactModal>

                        {userId === review.userid && (
                            <>
                                <div className={cx('dot')}></div>
                                <Typography
                                    variant='text2'
                                    classes={cx('text-line')}
                                    onClick={handleDelete}
                                >
                                    {contextPage.textDelete}
                                </Typography>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewItem;
