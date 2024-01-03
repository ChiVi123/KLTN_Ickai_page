import classNames from 'classnames/bind';
import ReactModal from 'react-modal';
import { contextPage } from '~/common';
import { Button, Typography } from '~/components';
import AddressForm from '~/components/address/AddressForm';
import { useModal } from '~/hooks';
import styles from '~/scss/components/address/address.module.scss';

const cx = classNames.bind(styles);

function Address() {
    const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();

    return (
        <article className='width-md'>
            <section className='section'>
                <Typography
                    variant='h2'
                    style={{ '--margin-bottom': 'var(--spacer-5)' }}
                >
                    {contextPage.address}
                </Typography>

                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>
                                <div className={cx('wrap')}>Tên người nhận</div>
                            </th>
                            <th className={cx('address')}>
                                <div className={cx('wrap')}>Địa chỉ</div>
                            </th>
                            <th>
                                <div className={cx('wrap')}>Số điện thoại</div>
                            </th>
                            <th>
                                <div className={cx('wrap')}></div>
                            </th>
                            <th className={cx('actions')}>
                                <div className={cx('wrap')}></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className={cx('wrap')}>sang</div>
                            </td>
                            <td>
                                <div className={cx('wrap')}>
                                    số 40, Đường D3, khu phố 4
                                </div>
                            </td>
                            <td>
                                <div className={cx('wrap')}>0375431663</div>
                            </td>
                            <td>
                                <div className={cx('wrap')}>(mặc định)</div>
                            </td>
                            <td>
                                <div className={cx('wrap')}>
                                    <span
                                        className={cx(
                                            'button-text',
                                            'button-text--edit',
                                        )}
                                    >
                                        chỉnh sửa
                                    </span>
                                    <span
                                        className={cx(
                                            'button-text',
                                            'button-text--delete',
                                        )}
                                    >
                                        xóa
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={cx('wrap')}>sang</div>
                            </td>
                            <td>
                                <div className={cx('wrap')}>
                                    số 40, Đường D3, khu phố 4
                                </div>
                            </td>
                            <td>
                                <div className={cx('wrap')}>0375431663</div>
                            </td>
                            <td>
                                <div className={cx('wrap')}></div>
                            </td>
                            <td>
                                <div className={cx('wrap')}>
                                    <span
                                        className={cx(
                                            'button-text',
                                            'button-text--edit',
                                        )}
                                    >
                                        chỉnh sửa
                                    </span>
                                    <span
                                        className={cx(
                                            'button-text',
                                            'button-text--delete',
                                        )}
                                    >
                                        xóa
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className={cx('button-wrap')}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleOpenModal}
                    >
                        Thêm địa chỉ mới
                    </Button>
                </div>

                <ReactModal
                    isOpen={isOpenModal}
                    overlayClassName='overlay'
                    className='modal modal--small modal--center'
                    preventScroll={true}
                    ariaHideApp={false}
                    onRequestClose={handleCloseModal}
                >
                    <AddressForm onClose={handleCloseModal} />
                </ReactModal>
            </section>
        </article>
    );
}

export default Address;
