import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Rating } from 'react-simple-star-rating';
import { others } from '~/common';

function StarRating({
    initialValue = 0,
    iconsCount = 5,
    classes = '',
    size = 'lg',
    transition = false,
    allowFraction = false,
    readonly = false,
    onClick = () => {},
}) {
    return (
        <Rating
            initialValue={initialValue}
            iconsCount={iconsCount}
            transition={transition}
            allowFraction={allowFraction}
            readonly={readonly}
            className={classes}
            emptyIcon={<FontAwesomeIcon icon={faEmptyStar} size={size} />}
            fillIcon={<FontAwesomeIcon icon={faStar} size={size} />}
            fillColor={others.starColor}
            onClick={onClick}
        />
    );
}

StarRating.propTypes = {
    initialValue: PropTypes.number,
    iconsCount: PropTypes.number,
    size: PropTypes.string,
    transition: PropTypes.bool,
    allowFraction: PropTypes.bool,
    readonly: PropTypes.bool,
    onClick: PropTypes.func,
};

export default StarRating;
