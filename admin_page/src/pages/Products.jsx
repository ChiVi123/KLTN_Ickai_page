import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { contextButton, directions, keys, lists, titles } from '~/common';
import { Button, Pagination, Row, Table, Typography } from '~/components';
import { productsAsync, productsSelector } from '~/redux';
import { logger } from '~/utils/logger';

import ProductItem from './products/ProductItem';

function Products() {
    const isLogger = false;
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: products,
        totalPage,
        isLoading,
    } = useSelector(productsSelector.getProductsAdmin);

    const itemPerPage = 5;
    const firstPage = 1;
    const currentPage = parseInt(searchParams.get(keys.page)) || firstPage;

    useEffect(() => {
        dispatch(
            productsAsync.getAllState({
                page: currentPage - 1,
                size: itemPerPage,
            }),
        );
    }, [currentPage, dispatch, searchParams]);

    if (isLogger) {
        logger({ groupName: Products.name, values: [isLoading, totalPage] });
    }

    return (
        <section className='section section--full-screen'>
            <Row sb>
                <Typography variant='h2'>{titles.listProduct}</Typography>
                <Button to={directions.addProduct} color='primary'>
                    {contextButton.addProduct}
                </Button>
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
