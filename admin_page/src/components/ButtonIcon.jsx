import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

function ButtonIcon({
    children,
    to,
    navTo,
    href,
    color = 'primary',
    size = 'md',
    full,
    disabled = false,
    type = 'button',
    classes,
    onClick,
    ...passProps
}) {
    let Component = 'button';
    const props = { onClick, ...passProps };

    if (to) {
        props.to = to;
        Component = Link;
    } else if (navTo) {
        props.to = navTo;
        Component = NavLink;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }
    return (
        <Component
            type={type}
            className={cx('btn-icon', {
                [`btn-icon--${color}`]: color,
                [`btn-icon--${size}`]: size,
                full,
                disabled,
                [classes]: classes,
            })}
            {...props}
        >
            {children}
        </Component>
    );
}

ButtonIcon.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
    navTo: PropTypes.string,
    href: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'second', 'third', '']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    full: PropTypes.bool,
    type: PropTypes.string,
    classes: PropTypes.string,
    onClick: PropTypes.func,
};

export default ButtonIcon;
