import classNames from 'classnames/bind';
import styles from './Description.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import ItemContent from './ItemContent';
import * as BlogService from '~/services/BlogService';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Description({ name }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        BlogService.get({ name })
            .then((res) => {
                setData(res[0].blogPage);
            })
            .catch((error) => {
                return error;
            });
    }, [name]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('read-more-container')}>
                <input type="checkbox" id="read-more-box" className={cx('read-more-input')} />
                <section className={cx('read-more-content')}>
                    {data.map((res, index) => (
                        <ItemContent key={index} title={res.title} content={res.content} />
                    ))}
                </section>
                <label htmlFor="read-more-box" className={cx('read-more-btn')}>
                    <span className={cx('see-more')}>
                        Tìm hiểu thêm <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
                    </span>
                    <span className={cx('see-less')}>
                        Thu gọn <FontAwesomeIcon className={cx('icon')} icon={faChevronUp} />
                    </span>
                </label>
            </div>
        </div>
    );
}

Description.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Description;
