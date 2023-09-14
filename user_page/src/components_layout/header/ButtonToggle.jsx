import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { SunShine } from '~/icons';
import styles from '~/scss/layouts/button-toggle.module.scss';

const cx = classNames.bind(styles);

function ButtonToggle({
    component = 'span',
    handleTheme = () => {},
    dark = false,
    ...passProps
}) {
    const Component = component;
    const props = { ...passProps };

    return (
        <Component
            className={cx('btn', {
                'btn--checked': dark,
            })}
            onClick={handleTheme}
            {...props}
        >
            <FontAwesomeIcon
                icon={faMoon}
                className={cx('btn-icon', 'btn-icon--moon')}
            />
            <span>icon sun light</span>
            <SunShine classes={cx('btn-icon')} />
        </Component>
    );
}

export default ButtonToggle;
