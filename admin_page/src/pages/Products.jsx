import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
    contextButton,
    contextPage,
    directions,
    keys,
    lists,
    titles,
} from '~/common';
import {
    Button,
    Col,
    Pagination,
    Row,
    SearchList,
    SortSelect,
    Table,
    Tabs,
    Typography,
} from '~/components';
import { productsActions, productsAsync, productsSelector } from '~/redux';
import PriceField from './products/PriceField';
import ProductItem from './products/ProductItem';

function Products() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: products,
        totalPage,
        isLoading,
    } = useSelector(productsSelector.selectList);
    const { items: tabs } = useSelector(productsSelector.selectCount);
    const productMaxPrice = useSelector(productsSelector.selectMaxPrice);

    const options = [
        { value: 'latest', label: 'Mới nhất' },
        { value: 'oldest', label: 'Cũ nhất' },
        { value: 'sold', label: 'Bán chạy' },
        { value: 'priceDesc', label: 'Giá cao đến thấp' },
        { value: '', label: 'Giá thấp đến cao' },
    ];
    const itemPerPage = 5;
    const firstPage = 1;
    const currentPage = parseInt(searchParams.get(keys.page)) || firstPage;
    const query = searchParams.get(keys.query) || '';
    const minPrice = parseInt(searchParams.get(keys.minPrice)) || 0;
    const maxPrice = parseInt(searchParams.get(keys.maxPrice)) || undefined;
    const productSort = searchParams.get(keys.sortBy) || 'latest';
    const productState = searchParams.get(keys.state) || '';

    useEffect(() => {
        dispatch(
            productsAsync.search({
                query,
                minPrice,
                maxPrice,
                sortBy: productSort,
                state: productState,
                page: currentPage,
                size: itemPerPage,
            }),
        );

        return () => {
            dispatch(productsActions.resetList());
        };
    }, [
        currentPage,
        dispatch,
        maxPrice,
        minPrice,
        productSort,
        productState,
        query,
        searchParams,
    ]);
    useEffect(() => {
        dispatch(productsAsync.count());
    }, [dispatch]);

    return (
        <section className='section section--full-screen'>
            <Row sb>
                <Typography variant='h2'>{titles.listProduct}</Typography>
                <Button to={directions.addProduct} color='primary'>
                    {contextButton.addProduct}
                </Button>
            </Row>

            <div style={{ marginBlock: '60px' }}></div>

            <Row gx={0} alignItems='center'>
                <Col baseCols={3}>
                    {/* {isLoading ? (
                        <div style={{ height: '49px' }}></div>
                    ) : (
                        )} */}
                    <PriceField max={productMaxPrice} />
                </Col>
                <Col>
                    <SearchList placeholder='Tìm kiếm...' />
                </Col>
                <Col baseCols={2}>
                    <button
                        type='submit'
                        form='form-price'
                        className='btn'
                        style={{
                            '--btn-height': '49px',
                            '--btn-min-width': '80px',
                            '--btn-bg-color': '#372ff0',
                            '--btn-color': '#ffffff',
                        }}
                    >
                        {contextPage.apply}
                    </button>
                </Col>
                <Col baseCols={9}>
                    <Tabs tabs={tabs} />
                </Col>
                <Col baseCols={3}>
                    <SortSelect options={options} defaultValue={productSort} />
                </Col>
            </Row>

            <Table heads={lists.tableProducts} loading={isLoading}>
                {products.map((item, index) => (
                    <ProductItem key={index} product={item} />
                ))}
            </Table>

            <Pagination total={totalPage} current={currentPage} center />
        </section>
    );
}

export default Products;
