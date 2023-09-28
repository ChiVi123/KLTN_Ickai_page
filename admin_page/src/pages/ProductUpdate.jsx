import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import Swal from 'sweetalert2';

import {
    contextButton,
    directions,
    inputGroups,
    inputNames,
    keys,
    labels,
    lists,
    placeholders,
    schemas,
    titles,
    types,
} from '~/common';
import {
    Button,
    Col,
    FormGroup,
    FormQuill,
    FormSelect,
    Row,
    TextField,
    Typography,
} from '~/components';
import { UploadImage } from '~/components/upload_image';
import {
    categoriesAsync,
    categoriesSelector,
    productsAsync,
    productsSelector,
} from '~/redux';
import { productServices } from '~/services';
import { logger } from '~/utils/logger';

const addProduct = ({ data, formData }) => {
    let isSuccess = false;

    Swal.fire({
        title: 'Thêm sản phẩm',
        didOpen: async () => {
            Swal.showLoading();
            const result = await productServices.addProduct(data);
            const {
                data: { id },
            } = result;

            if (result.isSuccess === 'true') {
                await productServices.addImagesProduct({ id, data: formData });
                isSuccess = true;
            }

            Swal.close();
        },
    }).then(() => {
        Swal.fire({
            title: `Thêm sản phẩm ${isSuccess ? 'thành công' : 'thất bại'}`,
            confirmButtonText: 'Xác nhận',
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                window.location.reload();
            }
        });
    });
};

// Component
function ProductUpdate() {
    const isLogger = true;
    // Hooks
    const { items: categories } = useSelector(categoriesSelector.selectEnable);
    const product = useSelector(productsSelector.getProduct);
    const dispatch = useDispatch();
    const {
        control,
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schemas.product),
        defaultValues: {
            name: product.name,
            price: product.price,
            sale: product.sale,
            category: null,
            summary: '',
            description: product.description,
            quantity: product.quantity,
        },
    });
    const { id } = useParams();

    useEffect(() => {
        dispatch(categoriesAsync.getAllEnable());
        dispatch(productsAsync.getById(id));
        return () => {};
    }, [dispatch, id]);
    useEffect(() => {
        setValue(keys.name, product.name);
        setValue(keys.price, product.price);
        setValue(keys.sale, product.sale);
        setValue(keys.quantity, product.quantity);
        setValue(keys.description, product.description);

        return () => {};
    }, [
        product.description,
        product.isLoading,
        product.name,
        product.price,
        product.quantity,
        product.sale,
        setValue,
    ]);

    // Handle event
    const handleOnSubmit = async (data) => {
        const newSale = parseFloat(data.sale);
        const newSlugify = slugify(data.name);
        const formData = new FormData();

        data.images.forEach((image) => {
            if (image.preview) {
                formData.append('url', image);
            }
        });

        const newData = {
            name: data.name,
            slugify: newSlugify,
            price: data.price,
            sale: newSale,
            category: data.category,
            // category_id: product.category_id,
            quantity: data.quantity,
            tags: [],
            summary: '',
            description: data.description,
        };

        addProduct({ data: newData, formData });
    };

    if (isLogger) {
        logger({ groupName: ProductUpdate.name, values: [product] });
    }

    return (
        <div className='section section--full-screen'>
            <section className='width-md' style={{ marginBottom: '24px' }}>
                <Typography variant='h1'>{titles.productAdd}</Typography>
                <Button to={directions.products} color='primary'>
                    {contextButton.backPage}
                </Button>
            </section>

            <form className='width-md' onSubmit={handleSubmit(handleOnSubmit)}>
                <Row cols={1} gx={5}>
                    {inputGroups.product.map((item, index) => (
                        <Col key={index} baseCols={index ? 4 : 12}>
                            <TextField
                                type={item.type}
                                id={item.inputName}
                                name={item.inputName}
                                label={item.label}
                                placeholder={item.placeholder}
                                autoComplete={item.autoComplete}
                                required
                                {...item.props}
                                register={register}
                                errors={errors}
                            />
                        </Col>
                    ))}

                    <Col>
                        <FormGroup
                            name={inputNames.category}
                            label={labels.category}
                            errors={errors}
                            isRequired
                        >
                            <FormSelect
                                name={inputNames.category}
                                options={categories}
                                label='name'
                                value='id'
                                placeholder={placeholders.category}
                                control={control}
                            />
                        </FormGroup>
                    </Col>

                    {/* Description */}
                    <Col>
                        <FormGroup
                            name={inputNames.description}
                            label={labels.description}
                            errors={errors}
                        >
                            <FormQuill
                                name={inputNames.description}
                                control={control}
                                placeholder={placeholders.description}
                                formats={lists.formatsDescription}
                                modules={lists.modulesDescription}
                            />
                        </FormGroup>
                    </Col>

                    <Col>
                        {/* Images */}
                        <FormGroup
                            name={inputNames.productImages}
                            label={labels.productImages}
                            errors={errors}
                        >
                            <Controller
                                name={inputNames.productImages}
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <UploadImage
                                        onChange={(files) => onChange(files)}
                                        isMultiple
                                        cols={4}
                                    />
                                )}
                            />
                        </FormGroup>
                    </Col>

                    <Col style={{ marginTop: '14px' }}>
                        <Button type={types.submit} color='primary'>
                            {contextButton.addProduct}
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
}

export default ProductUpdate;
