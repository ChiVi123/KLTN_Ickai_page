import {
    faList,
    faMagnifyingGlass,
    faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import ReactModal from 'react-modal';
import { Link, useSearchParams } from 'react-router-dom';

import {
    contextPage,
    directions,
    inputNames,
    keys,
    placeholders,
} from '~/common';
import { Col, Row } from '~/components';
import styles from '~/scss/layouts/header.module.scss';

import { useModal } from '~/hooks';
import Actions from './header/Actions';
import ModalMenu from './header/ModalMenu';

const cx = classNames.bind(styles);

function Header() {
    const [searchParams] = useSearchParams();
    const inputRef = useRef();
    const inputMobileRef = useRef();
    const formAction = useRef(process.env.REACT_APP_CLIENT);
    const { isOpenModal, handleCloseModal, handleOpenModal } = useModal(false);
    const query = searchParams.get(keys.query) || '';

    useEffect(() => {
        inputRef.current.value = query;
        inputMobileRef.current.value = query;
        return () => {};
    }, [query]);

    return (
        <header className={cx('wrap')}>
            <div className='container'>
                <Row gy={2}>
                    {/* Logo */}
                    <Col baseCols={0} baseColsLg={2}>
                        <div className={cx('logo')}>
                            <Link
                                to={directions.home}
                                className={cx('logo-link')}
                            >
                                <FontAwesomeIcon
                                    icon={faMicrochip}
                                    className={cx('logo-icon')}
                                />
                            </Link>
                            <p className={cx('logo-text')}>
                                {contextPage.textLogo}
                            </p>
                        </div>
                    </Col>

                    {/* Menu */}
                    <Col baseCols={2} baseColsSm={1} baseColsLg={0}>
                        <button
                            type='button'
                            className={cx('btn-menu')}
                            onClick={handleOpenModal}
                        >
                            <FontAwesomeIcon icon={faList} size='lg' />
                        </button>

                        <ReactModal
                            isOpen={isOpenModal}
                            overlayClassName='overlay'
                            className='modal modal--left'
                            ariaHideApp={false}
                            onRequestClose={handleCloseModal}
                        >
                            <ModalMenu onClose={handleCloseModal} />
                        </ReactModal>
                    </Col>

                    {/* Search bar */}
                    <Col
                        baseCols={0}
                        baseColsSm={6}
                        baseColsLg={4}
                        offsetSm={2}
                    >
                        <form
                            action={`${formAction.current}/search`}
                            method='get'
                            className={cx('form')}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <input
                                ref={inputRef}
                                name={inputNames.search}
                                type='text'
                                placeholder={placeholders.search}
                                autoComplete='off'
                                defaultValue={query}
                                className={cx('input')}
                            />
                        </form>
                    </Col>

                    {/* Actions */}
                    <Col
                        baseCols={10}
                        baseColsSm={3}
                        baseColsLg={4}
                        baseColsXl={3}
                        offsetXl={1}
                    >
                        <Actions />
                    </Col>

                    {/* Search bar mobile */}
                    <Col baseCols={10} baseColsSm={0}>
                        <form
                            action={`${formAction.current}/search`}
                            method='get'
                            className={cx('form')}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <input
                                ref={inputMobileRef}
                                name={inputNames.search}
                                type='text'
                                placeholder={placeholders.search}
                                autoComplete='off'
                                defaultValue={query}
                                className={cx('input')}
                            />
                        </form>
                    </Col>
                </Row>
            </div>
        </header>
    );
}

export default Header;
