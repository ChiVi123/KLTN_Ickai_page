import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { contextPage, lists } from '~/common';
import { Typography } from '~/components';
import styles from '~/scss/layouts/user-dropdown.module.scss';

const cx = classNames.bind(styles);

function UserDropdown({
    children,
    dark = false,
    handleLogOut = () => {},
    handleTheme = () => {},
}) {
    return (
        <div className={cx('menu')}>
            {/* Link */}
            {lists.menuAccount.map((item) => (
                <Link key={item.to} to={item.to} className={cx('item')}>
                    <Typography variant='text1'>{item.context}</Typography>
                </Link>
            ))}

            {/* Theme */}
            <span className={cx('item')} onClick={handleTheme}>
                <Typography variant='text1'>
                    {dark ? contextPage.dark : contextPage.light}
                </Typography>
                {children}
            </span>

            {/* Log Out */}
            <span
                className={cx('item', 'item--separate')}
                onClick={handleLogOut}
            >
                <Typography variant='text1'>{contextPage.signOut}</Typography>
            </span>
        </div>
    );
}

export default UserDropdown;
