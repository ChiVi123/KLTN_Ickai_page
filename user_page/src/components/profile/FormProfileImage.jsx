import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { avatarDefault } from '~/assets/images';
import { contextPage, inputNames, labels, notifies, types } from '~/common';
import { Button, Col, Row } from '~/components';
import { userActions } from '~/redux';
import { userServices } from '~/services';

import styles from '~profile/input-image.module.scss';

const cx = classNames.bind(styles);
const userType = {
    id: '',
    avatar: '',
};

function FormProfileImage({ user = userType }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState({
        preview: user?.avatar || avatarDefault,
    });

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(file.preview);
        };
    }, [file]);

    const handleChange = ({ target: { files } }) => {
        setFile((prev) => {
            const avatar = files[0];
            if (!avatar) return prev;
            avatar.preview = URL.createObjectURL(avatar);
            return avatar;
        });
    };
    const handleOnSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        const { id } = user;
        formData.append(inputNames.avatar, file);

        Swal.fire({
            title: contextPage.updateAvatar,
            didOpen: async () => {
                Swal.showLoading();

                const result = await userServices.uploadAvatar(id, formData);
                const expectMessage = 'Update user success';

                if (result?.message === expectMessage) {
                    toast.success(notifies.updateAvatarSuccess);
                    dispatch(
                        userActions.updateAvatar({
                            avatar: result.data.avatar,
                        }),
                    );
                } else {
                    toast.error(notifies.updateAvatarFail);
                }

                Swal.close();
            },
        });
    };

    return (
        <form className='form' onSubmit={handleOnSubmit}>
            <Row cols={1} gx={3}>
                <Col>
                    <div className={cx('input')}>
                        <label
                            htmlFor={inputNames.avatar}
                            className={cx('input-label')}
                        >
                            {labels.avatar}
                        </label>

                        <img
                            src={file.preview}
                            alt='avatar'
                            className={cx('avatar')}
                        />

                        <input
                            type='file'
                            name={inputNames.avatar}
                            id={inputNames.avatar}
                            accept='image/jpg, image/jpeg, image/png'
                            className={cx('input-image')}
                            onChange={handleChange}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='df-center'>
                        <Button
                            type={types.submit}
                            variant='outlined'
                            color='primary'
                            size='sm'
                        >
                            Lưu ảnh đại diện
                        </Button>
                    </div>
                </Col>
            </Row>
        </form>
    );
}

export default FormProfileImage;
