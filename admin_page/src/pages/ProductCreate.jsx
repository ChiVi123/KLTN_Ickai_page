import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import Swal from 'sweetalert2';
import {
    contextButton,
    directions,
    inputGroups,
    inputNames,
    labels,
    lists,
    notifies,
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
import { categoriesAsync, categoriesSelector } from '~/redux';
import { productServices } from '~/services';

// Component
function ProductCreate() {
    // Hooks
    const { items: categories } = useSelector(categoriesSelector.selectEnable);
    const dispatch = useDispatch();
    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schemas.product),
        defaultValues: {
            name: '',
            price: 0,
            sale: 0,
            category: null,
            summary: '',
            description: '',
            quantity: 0,
        },
    });

    useEffect(() => {
        dispatch(categoriesAsync.getAllEnable());
        return () => {};
    }, [dispatch]);

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
            category: data.category.value,
            quantity: data.quantity,
            tags: [],
            summary: data.summary,
            description: data.description,
        };

        Swal.fire({
            title: 'Thêm sản phẩm',
            didOpen: async () => {
                Swal.showLoading();

                const {
                    data: { id },
                    isSuccess,
                } = await productServices.addProduct(newData);

                if (isSuccess) {
                    await productServices.addImagesProduct({
                        id,
                        data: formData,
                    });

                    toast.success(notifies.success);
                } else {
                    toast.error(notifies.error);
                }

                Swal.close();
            },
        });
    };

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

                    {/* Summary */}
                    <Col>
                        <FormGroup
                            name={inputNames.summary}
                            label={labels.summary}
                            errors={errors}
                        >
                            <FormQuill
                                name={inputNames.summary}
                                control={control}
                                placeholder=''
                                formats={lists.formatsSummary}
                                modules={lists.modulesSummary}
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

export default ProductCreate;
