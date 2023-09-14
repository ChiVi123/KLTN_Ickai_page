import {
    faMagnifyingGlass,
    faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { contextPage, directions, inputNames, placeholders } from '~/common';
import { Col, Row } from '~/components';
import styles from '~/scss/layouts/header.module.scss';

import Actions from './header/Actions';

const cx = classNames.bind(styles);

function Header() {
    // const dispatch = useDispatch();

    // Handle event
    // const handleClickMenu = () => dispatch(modalActions.open());

    return (
        <header className={cx('wrap')}>
            <div className='container'>
                <Row>
                    <Col baseCols={2}>
                        <div className={cx('logo')}>
                            <Link
                                to={directions.home}
                                className={cx('logo-wrap')}
                            >
                                <FontAwesomeIcon
                                    icon={faMicrochip}
                                    className={cx('logo-image')}
                                />
                            </Link>
                            <p className={cx('logo-text')}>
                                {contextPage.textLogo}
                            </p>
                        </div>
                    </Col>
                    <Col baseCols={6} offset={1}>
                        <div className={cx('form')}>
                            <form
                                action=''
                                method='get'
                                className={cx('form-inner')}
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <input
                                    name={inputNames.search}
                                    type='text'
                                    placeholder={placeholders.search}
                                    className={cx('input')}
                                />
                                <div className={cx('separate')}></div>
                                <button
                                    type='submit'
                                    className={cx('btn-submit')}
                                >
                                    {contextPage.textButtonSearch}
                                </button>
                            </form>
                        </div>
                    </Col>
                    <Col baseCols={3}>
                        <Actions />
                    </Col>
                </Row>
            </div>
        </header>
    );
}

export default Header;
