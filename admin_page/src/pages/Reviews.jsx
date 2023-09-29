import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { keys, lists, titles } from '~/common';
import { Pagination, Table, Typography } from '~/components';
import { reviewsAsync, reviewsSelector } from '~/redux';

import ReviewItem from './reviews/ReviewItem';

function Reviews() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: reviews,
        isLoading,
        totalPage,
    } = useSelector(reviewsSelector.getReviewsByAdmin);

    const itemPerPage = 5;
    const displayPages = 4;
    const firstPage = 1;
    const currentPage = parseInt(searchParams.get(keys.page)) || firstPage;

    useEffect(() => {
        dispatch(
            reviewsAsync.getReviewsByAdmin({
                page: currentPage - 1,
                size: itemPerPage,
            }),
        );
    }, [currentPage, dispatch, searchParams]);

    return (
        <section className='section section--full-screen'>
            <Typography variant='h1'>{titles.reviews}</Typography>

            <Table heads={lists.tableReviews} loading={isLoading}>
                {reviews.map((item, index) => (
                    <ReviewItem
                        key={index}
                        review={item}
                        callback={() =>
                            dispatch(reviewsAsync.getReviewsByAdmin())
                        }
                    />
                ))}
            </Table>

            <Pagination
                display={displayPages}
                total={totalPage}
                current={currentPage}
                center
            />
        </section>
    );
}

export default Reviews;
