import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import { contextPage, keys } from '~/common';
import {
    Button,
    Col,
    Pagination,
    ProductWatched,
    Row,
    Typography,
} from '~/components';
import {
    Description,
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
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const currentPage = parseInt(searchParams.get(keys.page)) || 1;

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
                        productId={id}
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
                        {/* Send Review */}
                        <div className={cx('stat')}>
                            <Typography variant='text2'>
                                {contextPage.messageReview}
                            </Typography>

                            {isReview && (
                                <Button
                                    color='primary'
                                    size='sm'
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

                        {/* List Review */}
                        {review.isLoading || <Reviews reviews={review.list} />}

                        {review.isLoading || (
                            <Pagination
                                total={review.totalPage}
                                current={currentPage}
                                center
                            />
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
