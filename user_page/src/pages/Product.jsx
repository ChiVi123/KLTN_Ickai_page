import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { contextPage, others } from '~/common';
import {
    Button,
    Col,
    Pagination,
    ProcessBar,
    ProductWatched,
    Row,
    StarRating,
    Typography,
} from '~/components';
import {
    Description,
    FilterReview,
    FormReview,
    IntroProduct,
    Reviews,
} from '~/components/product';
import {
    productsAsync,
    productsSelector,
    reviewsActions,
    reviewsAsync,
    reviewsSelector,
    userSelector,
    watchedActions,
    watchedSelector,
} from '~/redux';
import styles from '~/scss/pages/product.module.scss';
import { orderServices } from '~/services';
import { averageRating } from '~/utils/funcs';
import { logger } from '~/utils/logger';

const cx = classNames.bind(styles);

function Product() {
    const isLogger = false;
    const [isOpen, setIsOpen] = useState(false);
    const [isReview, setIsReview] = useState(false);

    const dispatch = useDispatch();
    const userId = useSelector(userSelector.getUserId);
    const watched = useSelector(watchedSelector.selectListWatched);
    const product = useSelector(productsSelector.getProduct);
    const review = useSelector(reviewsSelector.getReviewByProductId);
    const { id } = useParams();

    useEffect(() => {
        dispatch(productsAsync.getProductById(id));
        dispatch(reviewsAsync.getReviewByProductId(id));
        window.scrollTo(0, 0);

        return () => {
            dispatch(reviewsActions.resetItem());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (product.name) {
            const { name, images, price, sale } = product;
            const newProduct = { id, name, images, price, sale };
            dispatch(watchedActions.addItem(newProduct));
        }
    }, [dispatch, id, product]);

    useEffect(() => {
        (async () => {
            if (userId) {
                const orders = await orderServices.userGetOrdersComplete({
                    id: userId,
                });

                const existOrder = orders.list.some((order) =>
                    order.items.some((item) => item.productid === id),
                );

                const existReview = review.list.some(
                    (item) => item.userid === userId,
                );

                setIsReview(existOrder && !existReview);
            }
        })();

        return () => {};
    }, [id, review.list, userId]);

    const rating = useMemo(() => {
        const total = review.list.reduce(
            (prev, current) => {
                if (current.state === 'enable') {
                    prev.totalStar += current.rate;
                    prev.quantity += 1;
                }
                return prev;
            },
            { totalStar: 0, quantity: 0 },
        );

        return total;
    }, [review.list]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    if (isLogger) {
        logger({ groupName: Product.name, values: [userId] });
    }
    return (
        <div className='container'>
            <Row cols={1} gy={3}>
                {/* Intro */}
                <Col>
                    <IntroProduct
                        producId={id}
                        name={product.name}
                        images={product.images}
                        stars={averageRating(rating.totalStar, rating.quantity)}
                        starStat={product.starStat}
                        stock={product.quantity}
                        stockSale={product.stockSale}
                        price={product.price}
                        sale={product.sale}
                    />
                </Col>

                {/* Description */}
                <Col>
                    <Description textHTML={product.description} />
                </Col>

                {/* Review */}
                <Col>
                    <section className={cx('section')}>
                        <Typography variant='h2'>
                            {contextPage.review}
                        </Typography>
                        {/* Stat */}
                        <Row cols={3} gx={3} classes={cx('stat-wrap')}>
                            <Col>
                                <div
                                    className={cx(
                                        'stat-section',
                                        'stat-section--center',
                                    )}
                                >
                                    <Typography
                                        variant='h1'
                                        classes={cx('stat-text-strong')}
                                    >
                                        {averageRating(
                                            rating.totalStar,
                                            rating.quantity,
                                        )}
                                        {contextPage.rateStar}
                                    </Typography>

                                    <StarRating
                                        initialValue={averageRating(
                                            rating.totalStar,
                                            rating.quantity,
                                        )}
                                        allowFraction
                                        readonly
                                        classes={cx('stat-rating')}
                                    />

                                    <Typography variant='text1'>
                                        ({rating.quantity} {contextPage.review})
                                    </Typography>
                                </div>
                            </Col>

                            {/* Process Bars */}
                            <Col>
                                <div className={cx('stat-section')}>
                                    {product.starMembers.map((item) => {
                                        const percentWidth =
                                            (item.members * 100) /
                                            product.starStat;

                                        return (
                                            <div
                                                key={item.star}
                                                className={cx('stat-process')}
                                            >
                                                <Typography variant='text1'>
                                                    {item.star}
                                                </Typography>

                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    color={others.starColor}
                                                />

                                                <ProcessBar
                                                    width={percentWidth}
                                                />
                                                <Typography variant='text1'>
                                                    {item.members}
                                                </Typography>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Col>

                            {/* Send Review */}
                            <Col>
                                <div
                                    className={cx(
                                        'stat-section',
                                        'stat-section--center',
                                    )}
                                >
                                    <Typography variant='text3'>
                                        {contextPage.messageReview}
                                    </Typography>

                                    {isReview && (
                                        <Button
                                            color='primary'
                                            onClick={handleOpen}
                                        >
                                            {contextPage.sendReview}
                                        </Button>
                                    )}

                                    <ReactModal
                                        isOpen={isOpen}
                                        overlayClassName={'overlay'}
                                        className={'modal'}
                                        preventScroll={true}
                                        ariaHideApp={false}
                                        onRequestClose={closeModal}
                                    >
                                        <FormReview onClose={closeModal} />
                                    </ReactModal>
                                </div>
                            </Col>
                        </Row>

                        {/* Filter */}
                        {review.isLoading || (
                            <FilterReview
                                filters={product.starMembers}
                                reviews={review.list}
                                component={Reviews}
                            />
                        )}

                        {review.isLoading && (
                            <Pagination total={review.totalPage} center />
                        )}
                    </section>
                </Col>

                {/* Watched */}
                <Col>
                    <section className='section'>
                        <Typography variant='h2'>
                            {contextPage.watched}
                        </Typography>

                        <Row cols={4} gx={3}>
                            {watched.map((item) => (
                                <Col key={item.id}>
                                    <ProductWatched product={item} />
                                </Col>
                            ))}
                        </Row>
                    </section>
                </Col>
            </Row>
        </div>
    );
}

export default Product;
