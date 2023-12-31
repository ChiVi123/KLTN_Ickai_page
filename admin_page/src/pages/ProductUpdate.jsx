import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    notifies,
    placeholders,
    schemas,
    titles,
    types,
} from '~/common';
import { documentTitle, resetDocumentTitle } from '~/common/document.title';
import {
    Button,
    Col,
    FormGroup,
    FormQuill,
    FormSelect,
    Row,
    Skeleton,
    TextField,
    Typography,
} from '~/components';
import { UploadImage } from '~/components/upload_image';
import {
    categoriesAsync,
    categoriesSelector,
    productsActions,
    productsAsync,
    productsSelector,
} from '~/redux';
import { productServices } from '~/services';

// Component
function ProductUpdate() {
    const { items: categories } = useSelector(categoriesSelector.selectEnable);
    const product = useSelector(productsSelector.selectItem);
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
            category: { label: '', value: '' },
            tags: product.tags,
            summary: product.summary,
            description: product.description,
            quantity: product.quantity,
        },
    });
    const { id } = useParams();

    // Call api
    useEffect(() => {
        dispatch(categoriesAsync.getAllEnable());
        dispatch(productsAsync.getById(id));

        return () => {
            dispatch(productsActions.resetItem());
        };
    }, [dispatch, id]);
    // Set value form
    useEffect(() => {
        setValue(keys.name, product.name);
        setValue(keys.price, product.price);
        setValue(keys.sale, product.sale);
        setValue(keys.category, {
            label: product.category,
            value: product.category_id,
        });
        setValue(keys.quantity, product.quantity);
        setValue(keys.summary, product.summary);
        setValue(keys.description, product.description);
        setValue(keys.images, product.images);

        return () => {};
    }, [
        product.category,
        product.category_id,
        product.description,
        product.images,
        product.name,
        product.price,
        product.quantity,
        product.sale,
        product.summary,
        setValue,
    ]);
    useEffect(() => {
        if (product.name) {
            document.title = documentTitle(product.name);
        }
        return () => {
            document.title = resetDocumentTitle;
        };
    }, [product.name]);

    // Handle event
    const handleOnSubmit = async (data) => {
        const newSale = parseFloat(data.sale);
        const newSlugify = slugify(data.name);
        const newData = {
            ...data,
            slugify: newSlugify,
            sale: newSale,
            category: data.category.value,
            state: product.state,
        };
        const dataEntries = Object.entries(data);
        const isUpdate = dataEntries.some((value) => {
            if (value[0] === 'category') {
                return value[1].value !== product.category_id;
            }

            if (value[0] === 'tags' || value[0] === 'images') {
                return false;
            }

            return value[1] !== product[value[0]];
        });

        delete newData.images;

        if (isUpdate) {
            Swal.fire({
                title: 'Chỉnh sửa sản phẩm',
                didOpen: async () => {
                    Swal.showLoading();
                    const result = await productServices.editProduct({
                        id: product.id,
                        data: newData,
                    });

                    if (result.isSuccess) {
                        toast.success(notifies.success);
                    } else {
                        toast.error(notifies.fail);
                    }

                    Swal.close();
                },
            });
        } else {
            toast.warn('Không có thay đổi nào!!!');
        }
    };

    return (
        <div className='section section--full-screen'>
            <section className='width-md' style={{ marginBottom: '24px' }}>
                <Typography variant='h1' style={{ marginBottom: '30px' }}>
                    {titles.productEdit}
                </Typography>
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
                            <Skeleton ready={product.category} height='38px'>
                                <FormSelect
                                    name={inputNames.category}
                                    options={categories}
                                    label='name'
                                    value='id'
                                    placeholder={placeholders.category}
                                    defaultValue={{
                                        name: product.category,
                                        id: product.category_id,
                                    }}
                                    control={control}
                                />
                            </Skeleton>
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
                            <Skeleton
                                ready={product.status === 'fulfilled'}
                                height='156px'
                            >
                                <Controller
                                    name={inputNames.productImages}
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <UploadImage
                                            id={product.id}
                                            value={product.images}
                                            onChange={(files) =>
                                                onChange(files)
                                            }
                                            cols={4}
                                        />
                                    )}
                                />
                            </Skeleton>
                        </FormGroup>
                    </Col>

                    <Col style={{ marginTop: '15px', marginBottom: '15px' }}>
                        <Button type={types.submit} color='primary'>
                            {contextButton.edit}
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
}

export default ProductUpdate;
