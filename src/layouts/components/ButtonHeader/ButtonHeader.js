import classNames from 'classnames/bind';
import styles from './ButtonHeader.module.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const ButtonHeader = forwardRef(({ children, path }, ref) => {
    return (
        <Link className={cx('wrapper')} to={path} ref={ref} reloadDocument>
            {children}
        </Link>
    );
});

ButtonHeader.propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
};

export default ButtonHeader;
