import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { enums, keys, lists, titles } from '~/common';
import { optionSorts } from '~/common/lists';
import {
    Col,
    Pagination,
    Row,
    SortSelect,
    Table,
    Tabs,
    Typography,
} from '~/components';
import { reviewsAsync, reviewsSelector } from '~/redux';
import { reviewServices } from '~/services';
import ReviewItem from './reviews/ReviewItem';

function Reviews() {
    const [tabs, setTabs] = useState([]);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: reviews,
        isLoading,
        totalPage,
    } = useSelector(reviewsSelector.getAllReview);

    const itemPerPage = 5;
    const displayPages = 5;
    const firstPage = 1;
    const currentPage = parseInt(searchParams.get(keys.page)) || firstPage;
    const reviewState = searchParams.get(keys.state) || '';
    const reviewSort = searchParams.get(keys.sortBy) || 'newest';

    useEffect(() => {
        dispatch(
            reviewsAsync.getAllReview({
                sortBy: reviewSort,
                state: reviewState,
                page: currentPage - 1,
                size: itemPerPage,
            }),
        );
    }, [currentPage, dispatch, reviewSort, reviewState, searchParams]);
    useEffect(() => {
        (async () => {
            const result = (await reviewServices.countState()) || [];
            setTabs(
                result.map((item) => ({
                    ...item,
                    content: enums.contentReviewStates[item.state],
                })),
            );
        })();
    }, []);

    return (
        <section className='section section--full-screen'>
            <Typography variant='h2'>{titles.reviews}</Typography>

            {/* <SearchList placeholder='Tìm kiếm...' /> */}

            <Row alignItems='center'>
                <Col baseCols={10}>
                    <Tabs tabs={tabs} />
                </Col>
                <Col>
                    <SortSelect
                        options={optionSorts}
                        defaultValue={reviewSort}
                    />
                </Col>
            </Row>

            <Table heads={lists.tableReviews} loading={isLoading}>
                {reviews.map((item, index) => (
                    <ReviewItem
                        key={index}
                        review={item}
                        callback={() => dispatch(reviewsAsync.getAllReview())}
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
