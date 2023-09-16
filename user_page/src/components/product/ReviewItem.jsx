import classNames from 'classnames/bind';
import parser from 'html-react-parser';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { avatarDefault } from '~/assets/images';
import { contextPage } from '~/common';
import { StarRating, Typography } from '~/components';
import { userSelector } from '~/redux';
import { reviewServices } from '~/services';
import { logger } from '~/utils/logger';
import styles from '~product/review.module.scss';
import FormReview from './FormReview';
import Reviews from './Reviews';

const cx = classNames.bind(styles);

function ReviewItem({ review }) {
    const isLogger = false;
    const level1 = 1;
    const [isOpen, setIsOpen] = useState(false);
    const userId = useSelector(userSelector.getUserId);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleDelete = async () => {
        Swal.fire({
            title: contextPage.messageDeleteReview,
            confirmButtonText: contextPage.confirm,
            showCancelButton: true,
            cancelButtonText: contextPage.cancel,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await reviewServices.deleteReviewByUser({
                    id: review.id,
                });
            }
        });
    };

    if (isLogger) {
        logger({
            groupName: ReviewItem.name,
            values: [new Date()],
        });
    }

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
                        {parser(review.content)}
                    </Typography>

                    <div className={cx('wrap-info')}>
                        <Typography variant='text2' classes={cx('text-date')}>
                            {contextPage.date} {review.createdDate}
                        </Typography>

                        {userId === review.userid && (
                            <>
                                <div className={cx('dot')}></div>
                                <Typography
                                    variant={'text2'}
                                    classes={cx('text-line')}
                                    onClick={handleOpen}
                                >
                                    {contextPage.edit}
                                </Typography>
                            </>
                        )}

                        <ReactModal
                            isOpen={isOpen}
                            overlayClassName={'overlay'}
                            className={'modal'}
                            preventScroll={true}
                            ariaHideApp={false}
                            onRequestClose={closeModal}
                        >
                            <FormReview
                                rate={review.rate}
                                content={parser(review.content)}
                                onClose={closeModal}
                            />
                        </ReactModal>

                        {userId === review.userid && (
                            <>
                                <div className={cx('dot')}></div>
                                <Typography
                                    variant={'text2'}
                                    classes={cx('text-line')}
                                    onClick={handleDelete}
                                >
                                    {contextPage.textDelete}
                                </Typography>
                            </>
                        )}
                    </div>
                </div>

                {!!review?.child?.length && (
                    <Reviews reviews={review.child} isChild />
                )}
            </div>
        </div>
    );
}

export default ReviewItem;
