import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { lists, titles } from '~/common';
import { Table, Typography } from '~/components';
import { categoriesAsync, categoriesSelector } from '~/redux';

import { logger } from '~/utils/logger';
import CategoryItem from './categories/CategoryItem';

function Categories() {
    const isLogger = false;
    const dispatch = useDispatch();
    const { items: categories, isLoading } = useSelector(
        categoriesSelector.selectAllState,
    );

    useEffect(() => {
        dispatch(categoriesAsync.getAllState());
    }, [dispatch]);

    if (isLogger) {
        logger({ groupName: Categories.name, values: ['render'] });
    }

    return (
        <section className='section section--full-screen'>
            <Typography variant='h1'>{titles.categories}</Typography>

            <Table heads={lists.tableCate} isLoading={isLoading}>
                {!!categories.length &&
                    categories.map((category, index) => (
                        <CategoryItem key={index} category={category} />
                    ))}
            </Table>
        </section>
    );
}

export default Categories;
