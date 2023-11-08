import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { contextPage, directions, lists } from '~/common';
import { Typography } from '~/components';
import { userActions, userSelector } from '~/redux';
import styles from '~/scss/layouts/sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const user = useSelector(userSelector.selectInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(userActions.resetUser());
        navigate(directions.signIn);
    };

    return (
        <nav className={`section ${cx('wrapper')}`}>
            <Link to={directions.dashboard} className={cx('logo')}>
                <Typography
                    variant='h1'
                    component='p'
                    classes={cx('logo-text')}
                >
                    {contextPage.textLogo}
                </Typography>
            </Link>

            <Typography variant='h3' component='h2'>
                {'Xin chào '}
                {user.name}
            </Typography>

            <ul className={cx('sidebar')}>
                {lists.sidebar.map((item, index) => (
                    <li key={index} className={cx('item')}>
                        <NavLink
                            to={item.navTo}
                            className={({ isActive }) =>
                                cx('link', { active: isActive })
                            }
                        >
                            <FontAwesomeIcon
                                icon={item.icon}
                                className={cx('font-icon')}
                            />
                            <span className={cx('context')}>
                                {item.context}
                            </span>
                        </NavLink>
                    </li>
                ))}
                <li className={cx('item')}>
                    <button className={cx('link')} onClick={handleLogout}>
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className={cx('font-icon')}
                        />
                        <span className={cx('context')}>
                            {contextPage.signOut}
                        </span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
