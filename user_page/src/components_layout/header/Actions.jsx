import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { avatarDefault } from '~/assets/images';
import { contextPage, directions } from '~/common';
import { Button, Typography } from '~/components';
import { useLogout } from '~/hooks';
import { CartIcon } from '~/icons';
import { cartSelector, userSelector } from '~/redux';
import styles from '~/scss/layouts/actions-header.module.scss';

import ButtonToggle from './ButtonToggle';
import UserDropdown from './UserDropdown';

const cx = classNames.bind(styles);
const buttons = [
    {
        to: directions.signIn,
        ariaLabel: contextPage.signIn,
        variant: 'outlined',
        color: 'primary',
        size: 'sm',
        context: contextPage.signIn,
        classes: 'btn-sign-in',
    },
    {
        to: directions.signUp,
        ariaLabel: contextPage.signUp,
        variant: 'contained',
        color: 'primary',
        size: 'sm',
        context: contextPage.signUp,
        classes: '',
    },
];

function Actions() {
    const initDark = JSON.parse(localStorage.getItem('isDark'));

    const [isDark, setIsDark] = useState(initDark);
    const { avatar, name } = useSelector(userSelector.selectInfo);
    const totalProduct = useSelector(cartSelector.selectTotalProduct);

    const handleLogOut = useLogout();
    const handleToggle = () => setIsDark((prev) => !prev);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        localStorage.setItem('isDark', JSON.stringify(isDark));

        return () => {};
    }, [isDark]);

    return (
        <div className={cx('wrap')}>
            {!name &&
                buttons.map((item) => (
                    <Button
                        key={item.context}
                        to={item.to}
                        aria-label={item.ariaLabel}
                        variant={item.variant}
                        color={item.color}
                        size={item.size}
                        classes={cx(item.classes)}
                    >
                        {item.context}
                    </Button>
                ))}

            {!name && (
                <ButtonToggle
                    component='button'
                    handleTheme={handleToggle}
                    dark={isDark}
                    tabIndex={-1}
                    classes={cx('btn-toggle')}
                />
            )}

            {name && (
                <div>
                    <Tippy
                        content={
                            <UserDropdown
                                dark={isDark}
                                handleLogOut={handleLogOut}
                                handleTheme={handleToggle}
                            >
                                <ButtonToggle component='span' dark={isDark} />
                            </UserDropdown>
                        }
                        placement='bottom-end'
                        trigger='click'
                        interactive='true'
                    >
                        <button type='button' className={cx('btn-account')}>
                            <img
                                src={avatar || avatarDefault}
                                alt={name}
                                width={30}
                                height={30}
                                className={cx('btn-account__avatar')}
                            />
                            <Typography variant='text2'>{name}</Typography>
                        </button>
                    </Tippy>
                </div>
            )}

            {name && (
                <Link to={directions.cart} className={cx('cart')}>
                    <CartIcon />
                    <span>{totalProduct}</span>
                </Link>
            )}
        </div>
    );
}

export default Actions;
