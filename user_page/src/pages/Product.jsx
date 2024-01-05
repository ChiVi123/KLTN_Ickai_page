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
import { useModal } from '~/hooks';
import {
    productsActions,
    productsAsync,
    productsSelector,
    reviewsActions,
    reviewsAsync,
    reviewsSelector,
    userSelector,
    watchedActions,
    watchedSelector,
} from '~/redux';
import { orderServices } from '~/services';
import { averageRating, documentTitle } from '~/utils/funcs';

import styles from '~/scss/pages/product.module.scss';

import 'react-quill/dist/quill.snow.css';

import { ickai } from '~/common/titles';
import '~/scss/vendors/quill.scss';

const cx = classNames.bind(styles);

function Product() {
    const [isReview, setIsReview] = useState(false);
    const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();

    const userId = useSelector(userSelector.selectId);
    const watched = useSelector(watchedSelector.selectList);
    const product = useSelector(productsSelector.selectItem);
    const review = useSelector(reviewsSelector.selectItem);

    const { id } = useParams();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get(keys.page)) || 1;

    useEffect(() => {
        dispatch(productsAsync.getProductById(id));
        dispatch(reviewsAsync.getByProductId(id));
        window.scrollTo(0, 0);

        return () => {
            dispatch(reviewsActions.reset());
            dispatch(productsActions.reset());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (product.discount) {
            const { name, images, price, sale, discount } = product;
            dispatch(
                watchedActions.addItem({
                    id,
                    name,
                    images,
                    price,
                    sale,
                    discount,
                }),
            );
        }
    }, [dispatch, id, product]);
    useEffect(() => {
        if (product?.name) {
            document.title = documentTitle(product.name);
        }
        return () => {
            document.title = ickai;
        };
    }, [product.name]);
    useEffect(() => {
        (async () => {
            if (userId) {
                console.log(userId);
                const orders = await orderServices.getAllStateComplete();

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

    return (
        <div className='container'>
            <Row cols={1} gy={3}>
                {/* Intro */}
                <Col>
                    <IntroProduct
                        productId={id}
                        name={product.name}
                        discount={product.discount}
                        price={product.price}
                        summary={product.summary}
                        images={product.images}
                        stars={averageRating(rating.totalStar, rating.quantity)}
                        stock={product.quantity}
                    />
                </Col>

                {/* Description */}
                <Col>
                    <Description textHTML={product.description} />
                </Col>

                {/* Review */}
                {review.status === 'fulfilled' && (
                    <Col>
                        <section className={cx('section')}>
                            <Typography variant='h3'>
                                {contextPage.review}
                            </Typography>

                            {/* Send Review */}
                            {isReview && (
                                <div className={cx('stat')}>
                                    <Typography variant='text2'>
                                        {contextPage.messageReview}
                                    </Typography>

                                    <Button
                                        color='primary'
                                        size='sm'
                                        onClick={handleOpenModal}
                                    >
                                        {contextPage.sendReview}
                                    </Button>

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
                                            onClose={handleCloseModal}
                                        />
                                    </ReactModal>
                                </div>
                            )}

                            {/* List Review */}
                            {review.isLoading || (
                                <Reviews reviews={review.list} />
                            )}

                            {review.isLoading || (
                                <Pagination
                                    total={review.totalPage}
                                    current={currentPage}
                                    center
                                />
                            )}
                        </section>
                    </Col>
                )}

                {/* Watched */}
                <Col classes={cx('watched')}>
                    <section
                        className='section'
                        style={{ marginBottom: 'var(--spacer-2)' }}
                    >
                        <Typography variant='h3' style={{ marginBottom: '0' }}>
                            {contextPage.watched}
                        </Typography>
                    </section>

                    <Row cols={5} gx={2}>
                        {watched.map((item) => (
                            <Col key={item.id}>
                                <ProductWatched product={item} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Product;
