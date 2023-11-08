import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { uploadImage } from '~/assets/images';
import { Button, Col, Row, Typography } from '~/components';
import { productServices } from '~/services';

import { logger } from '~/utils/logger';
import { context, cx } from './constant';

function UploadImage({ id, onChange, value = [], cols }) {
    const isLogger = false;
    // Hooks
    // - useState
    const [dragover, setDragOver] = useState(false);
    const [files, setFiles] = useState(value);
    const [filesAddition, setFilesAddition] = useState([]);
    // - useEffect
    useEffect(() => {
        return () =>
            filesAddition.forEach((item) => {
                URL.revokeObjectURL(item.preview);
            });
    }, [filesAddition]);

    // Handle event
    const handleDragEnter = () => setDragOver(true);
    const handleDragLeave = () => setDragOver(false);
    const handleDrop = () => setDragOver(false);
    const handleOnChange = ({ target: { files } }) => {
        const multipleFile = [...files];

        multipleFile.map((item) => (item.preview = URL.createObjectURL(item)));

        setFilesAddition(multipleFile);

        if (onChange) {
            onChange(multipleFile);
        }
    };
    const handleAddImages = (event) => {
        event.preventDefault();
        const formData = new FormData();

        filesAddition.forEach((item) => {
            if (item.preview) {
                formData.append('url', item);
            }
        });

        Swal.fire({
            title: 'Thêm ảnh',
            didOpen: async () => {
                Swal.showLoading();
                const result = await productServices.addImagesProduct({
                    id,
                    data: formData,
                });
                const expectMessage = 'Add image to product successfully';

                if (result?.message === expectMessage) {
                    toast.success('Thêm ảnh thành công');
                    setFiles(result.data);
                    setFilesAddition([]);
                } else {
                    toast.error('Thêm ảnh thất bại');
                }

                Swal.close();
            },
        });
    };
    const handleDeleteImage = ({ id_image }) => {
        Swal.fire({
            title: 'Xóa ảnh',
            didOpen: async () => {
                Swal.showLoading();
                const result = await productServices.deleteImageProduct({
                    id,
                    idImage: id_image,
                });
                const expectMessage = 'Delete image successfully';

                if (result?.message === expectMessage) {
                    toast.success('Xóa ảnh thành công');
                    setFiles((previous) => {
                        const newFiles = previous.filter(
                            (item) => item.id_image !== result.data,
                        );

                        return newFiles;
                    });
                } else {
                    toast.error('Xóa ảnh thất bại');
                }

                Swal.close();
            },
        });
    };

    if (isLogger) {
        logger({ groupName: UploadImage.name, values: [id] });
    }

    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('drop-zone', {
                    'dropzone--drag-over': dragover,
                })}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <img
                    src={uploadImage}
                    alt='upload'
                    className={cx('upload-img')}
                />
                <input
                    type='file'
                    title=''
                    multiple={true}
                    className={cx('input-img')}
                    onChange={handleOnChange}
                />
                <span className={cx('topic')}>{context.dragNDrop}</span>
            </div>

            <div
                className={cx('images-preview', {
                    'images-preview--empty': !files.length,
                })}
            >
                {!!files.length && <Typography variant='h2'>Ảnh cũ</Typography>}
                <Row cols={cols}>
                    {!!files.length &&
                        files.map((item, index) => (
                            <Col key={index}>
                                <div classes={cx('image-preview')}>
                                    <div className={cx('wrapper-image')}>
                                        <img
                                            className={cx('image')}
                                            src={item?.url || item}
                                            alt=''
                                        />
                                    </div>
                                    <Button
                                        color='second'
                                        size='sm'
                                        full
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleDeleteImage(item);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </Button>
                                </div>
                            </Col>
                        ))}
                </Row>
            </div>

            <div
                className={cx('images-preview', {
                    'images-preview--empty': !filesAddition.length,
                })}
            >
                {!!filesAddition.length && (
                    <Typography variant='h2'>Ảnh mới</Typography>
                )}
                <Row cols={cols} g={2}>
                    {filesAddition.map((item, index) => (
                        <Col key={index}>
                            <div className={cx('wrapper-image')}>
                                <img
                                    className={cx('image')}
                                    src={item.preview}
                                    alt=''
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            {id && (
                <div
                    style={{
                        width: '800px',
                        margin: '0 auto',
                        padding: '0 1px',
                    }}
                >
                    {!!filesAddition.length && (
                        <Button
                            color='primary'
                            size='sm'
                            full
                            onClick={handleAddImages}
                        >
                            <FontAwesomeIcon icon={faImage} />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default UploadImage;
