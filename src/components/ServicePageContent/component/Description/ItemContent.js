import classNames from 'classnames/bind';
import styles from './ItemContent.module.scss';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function ItemContent({ title, content }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            {content.map((res, index) => (
                <p key={index} className={cx('content')}>
                    {res}
                </p>
            ))}

            <p className={cx('space')}></p>
        </div>
    );
}

ItemContent.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
};

export default ItemContent;
