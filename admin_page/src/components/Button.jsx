import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

function Button({
    children,
    to,
    navTo,
    href,
    variant,
    color,
    size,
    full,
    disabled = false,
    type = 'button',
    classes,
    onClick,
    ...passProps
}) {
    let Component = 'button';
    const props = { onClick, ...passProps };
    const infix = variant === 'contained' || !variant ? '' : `-${variant}`;

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
            className={cx('btn', {
                [`btn${infix}-${color}`]: color,
                [`btn-${size}`]: size,
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

Button.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
    navTo: PropTypes.string,
    href: PropTypes.string,
    variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
    color: PropTypes.oneOf(['primary', 'second']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    full: PropTypes.bool,
    type: PropTypes.string,
    classes: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
