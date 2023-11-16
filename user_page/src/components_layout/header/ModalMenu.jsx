import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { contextPage, contextParams, directions } from '~/common';
import { menuModal } from '~/common/lists';
import { Typography } from '~/components';
import { useLogout } from '~/hooks';
import { categoriesSelector, userSelector } from '~/redux';
import styles from '~/scss/layouts/modal-menu.module.scss';
import ButtonToggle from './ButtonToggle';

const cx = classNames.bind(styles);

function ModalMenu({ onClose = () => {} }) {
    const initDark = JSON.parse(localStorage.getItem('isDark'));
    const [isDark, setIsDark] = useState(initDark);
    const user = useSelector(userSelector.selectInfo);
    const categories = useSelector(categoriesSelector.selectItems);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        localStorage.setItem('isDark', JSON.stringify(isDark));

        return () => {};
    }, [isDark]);

    const handleLogOut = useLogout();
    const handleToggle = () => setIsDark((prev) => !prev);

    return (
        <Fragment>
            <div className='flex flex-start space-between gap-3'>
                <div className='flex align-center gap-1'>
                    {user?.avatar && (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className={cx('avatar')}
                        />
                    )}
                    <div>
                        <p className={cx('text-logo')}>
                            {contextPage.textLogo}
                        </p>
                        <Typography variant='text1'>
                            {contextParams.hello(user?.name)}
                        </Typography>
                    </div>
                </div>
                <button
                    type='button'
                    onClick={onClose}
                    className={cx('flex', 'flex-start', 'btn-close')}
                >
                    <FontAwesomeIcon icon={faXmark} size='xl' />
                </button>
            </div>

            <div className={cx('body')}>
                <Typography variant='h3' classes={cx('heading')}>
                    Menu
                </Typography>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        cx('item', { 'item--active': isActive })
                    }
                >
                    {contextPage.home}
                </NavLink>
                {user.name &&
                    menuModal.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                cx('item', { 'item--active': isActive })
                            }
                        >
                            {item.context}
                        </NavLink>
                    ))}
                {!user.name && (
                    <NavLink
                        to={directions.signIn}
                        className={({ isActive }) =>
                            cx('item', { 'item--active': isActive })
                        }
                    >
                        {contextPage.signIn}
                    </NavLink>
                )}
                {user.name && (
                    <span className={cx('item')} onClick={handleLogOut}>
                        {contextPage.signOut}
                    </span>
                )}
                <span className={cx('item')} onClick={handleToggle}>
                    {isDark ? contextPage.dark : contextPage.light}
                    <ButtonToggle component='span' dark={isDark} />
                </span>

                {/* Category */}
                <Typography variant='h3' classes={cx('heading')}>
                    {contextPage.category}
                </Typography>
                {categories.map((item) => (
                    <NavLink
                        key={item.name}
                        to={`${directions.search}/${item.id}`}
                        className={({ isActive }) =>
                            cx('item', { 'item--active': isActive })
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </Fragment>
    );
}

export default ModalMenu;
