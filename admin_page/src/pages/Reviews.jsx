import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { keys, lists, titles } from '~/common';
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
import ReviewItem from './reviews/ReviewItem';

function Reviews() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: reviews,
        isLoading,
        totalPage,
    } = useSelector(reviewsSelector.selectList);
    const { items: tabs } = useSelector(reviewsSelector.selectCount);

    const itemPerPage = 5;
    const firstPage = 1;
    const currentPage = parseInt(searchParams.get(keys.page)) || firstPage;
    const reviewState = searchParams.get(keys.state) || '';
    const reviewSort = searchParams.get(keys.sortBy) || 'newest';

    useEffect(() => {
        dispatch(
            reviewsAsync.search({
                sortBy: reviewSort,
                state: reviewState,
                page: currentPage - 1,
                size: itemPerPage,
            }),
        );
    }, [currentPage, dispatch, reviewSort, reviewState, searchParams]);
    useEffect(() => {
        dispatch(reviewsAsync.count());
    }, [dispatch]);

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
                    <ReviewItem key={index} review={item} />
                ))}
            </Table>

            <Pagination total={totalPage} current={currentPage} center />
        </section>
    );
}

export default Reviews;
