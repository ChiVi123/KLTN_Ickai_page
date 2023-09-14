import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function TextLink({
    children,
    to,
    center,
    reset,
    onClick,
    classes,
    ...passProps
}) {
    let Component = 'button';
    const props = { ...passProps };

    if (to) {
        props.to = to;
        Component = Link;
    }

    if (onClick && !to) {
        props.onClick = onClick;
    }

    return (
        <Component
            className={cx({
                link: !reset,
                'link--center': center,
                [classes]: classes,
            })}
            {...props}
        >
            {children}
        </Component>
    );
}

TextLink.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
    center: PropTypes.bool,
};

export default TextLink;
