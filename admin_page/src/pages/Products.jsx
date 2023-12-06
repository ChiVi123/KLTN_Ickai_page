import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
    contextButton,
    directions,
    enums,
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
import { productsAsync, productsSelector } from '~/redux';
import { productServices } from '~/services';
import FormPrice from './products/FormPrice';
import ProductItem from './products/ProductItem';

function Products() {
    const [tabs, setTabs] = useState([]);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: products,
        totalPage,
        isLoading,
    } = useSelector(productsSelector.getProductsAdmin);
    // const listRoot = useSelector(productsSelector.selectListRoot);

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
    const productSort = searchParams.get(keys.sortBy) || 'latest';
    const productState = searchParams.get(keys.state) || '';

    useEffect(() => {
        dispatch(
            productsAsync.search({
                query,
                sortBy: productSort,
                state: productState,
                page: currentPage,
                size: itemPerPage,
            }),
        );
    }, [currentPage, dispatch, productSort, productState, query, searchParams]);
    useEffect(() => {
        (async () => {
            const result = (await productServices.countState()) || [];
            setTabs(
                result.map((item) => ({
                    ...item,
                    content: enums.contentProductStates[item.state],
                })),
            );
        })();
    }, []);

    return (
        <section className='section section--full-screen'>
            <Row sb>
                <Typography variant='h2'>{titles.listProduct}</Typography>
                <Button to={directions.addProduct} color='primary'>
                    {contextButton.addProduct}
                </Button>
            </Row>

            <Row gx={0} alignItems='center'>
                <Col baseCols={4}>
                    <Tabs tabs={tabs} />
                </Col>
                <Col>
                    <SearchList placeholder='Tìm kiếm...' />
                </Col>
                <Col baseCols={3}>
                    <SortSelect options={options} defaultValue={productSort} />
                </Col>
                <Col baseCols={12}>
                    <FormPrice />
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
