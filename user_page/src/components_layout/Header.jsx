import {
    faList,
    faMagnifyingGlass,
    faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import {
    contextPage,
    directions,
    inputNames,
    keys,
    placeholders,
} from '~/common';
import { Col, Row } from '~/components';
import { useModal } from '~/hooks';
import { createObjectParams } from '~/utils/funcs';
import Actions from './header/Actions';
import ModalMenu from './header/ModalMenu';

import styles from '~/scss/layouts/header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get(keys.query) || '';
    const { pathname } = useLocation();
    const [inputSearch, setInputSearch] = useState(query);
    const [inputSearchMobile, setInputSearchMobile] = useState(query);
    const { isOpenModal, handleCloseModal, handleOpenModal } = useModal(false);
    const navigate = useNavigate();
    const queryParam = '/search';

    useEffect(() => {
        if (pathname !== queryParam) {
            setInputSearch('');
            setInputSearchMobile('');
        } else {
            setInputSearch(query);
            setInputSearchMobile(query);
        }
        return () => {};
    }, [pathname, query]);

    function handleInputSearch({ target }) {
        setInputSearch(target.value);
    }
    function handleInputSearchMobile({ target }) {
        setInputSearchMobile(target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (pathname === queryParam) {
            setSearchParams((prev) => ({
                ...createObjectParams(prev),
                query: inputSearch,
            }));
        } else {
            navigate(`${directions.search}?query=${inputSearch}`);
        }
    }
    function handleSubmitMobile(event) {
        event.preventDefault();
        if (pathname === queryParam) {
            setSearchParams((prev) => ({
                ...createObjectParams(prev),
                query: inputSearch,
            }));
        } else {
            navigate(`${directions.search}?query=${inputSearch}`);
        }
    }

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
                        <form className={cx('form')} onSubmit={handleSubmit}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <input
                                name={inputNames.search}
                                type='text'
                                value={inputSearch}
                                placeholder={placeholders.search}
                                autoComplete='off'
                                className={cx('input')}
                                onChange={handleInputSearch}
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
                            className={cx('form')}
                            onSubmit={handleSubmitMobile}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <input
                                name={inputNames.search}
                                type='text'
                                value={inputSearchMobile}
                                placeholder={placeholders.search}
                                autoComplete='off'
                                className={cx('input')}
                                onChange={handleInputSearchMobile}
                            />
                        </form>
                    </Col>
                </Row>
            </div>
        </header>
    );
}

export default Header;
