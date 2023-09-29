import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { contextButton, lists, titles } from '~/common';
import { Button, Row, Table, Typography } from '~/components';
import { categoriesAsync, categoriesSelector } from '~/redux';
import { logger } from '~/utils/logger';

import CategoryForm from './categories/CategoryForm';
import CategoryItem from './categories/CategoryItem';

function Categories() {
    const isLogger = false;
    const dispatch = useDispatch();
    const { items: categories, isLoading } = useSelector(
        categoriesSelector.selectAllState,
    );
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(categoriesAsync.getAllState());
    }, [dispatch]);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    if (isLogger) {
        logger({ groupName: Categories.name, values: ['render'] });
    }

    return (
        <section className='section section--full-screen'>
            <Row sb>
                <Typography variant='h2'>{titles.categories}</Typography>
                <Button onClick={handleOpen}>
                    {contextButton.addCategory}
                </Button>
                <ReactModal
                    isOpen={isOpen}
                    overlayClassName={'overlay'}
                    className={'modal'}
                    preventScroll={true}
                    ariaHideApp={false}
                    onRequestClose={handleClose}
                >
                    <CategoryForm onClose={handleClose} />
                </ReactModal>
            </Row>

            <Table heads={lists.tableCate} loading={isLoading}>
                {!!categories.length &&
                    categories.map((category, index) => (
                        <CategoryItem key={index} category={category} />
                    ))}
            </Table>
        </section>
    );
}

export default Categories;
