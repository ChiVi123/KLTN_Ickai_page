import cx from 'classnames';
import PropTypes from 'prop-types';

const mapping = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    text1: 'span',
    text2: 'span',
    text3: 'span',
    text4: 'span',
    para1: 'p',
    para2: 'p',
    para3: 'p',
    para4: 'p',
};

function Typography({
    children,
    component,
    variant,
    clamp,
    center,
    classes,
    ...passProps
}) {
    const Component = component || mapping[variant];
    const props = { ...passProps };

    return (
        <Component
            className={cx(variant, {
                [`line-clamp-${clamp}`]: clamp,
                center,
                [classes]: classes,
            })}
            {...props}
        >
            {children}
        </Component>
    );
}

Typography.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(Object.keys(mapping)),
    clamp: PropTypes.number,
    center: PropTypes.bool,
    classes: PropTypes.string,
};

export default Typography;
