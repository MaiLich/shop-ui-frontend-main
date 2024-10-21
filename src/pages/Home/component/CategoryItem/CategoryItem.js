import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import { Link } from 'react-router-dom';

import Item from './Item';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const PAGE_INIT = 1;
const LIMIT_INIT = 4;

function CategoryItem({ nameService, title, path }) {
    const [result, setResult] = useState([]);
    useEffect(() => {
        nameService
            .get({ _page: PAGE_INIT, _limit: LIMIT_INIT })
            .then((data) => {
                setResult(data);
            })
            .catch((error) => {
                return error;
            });
    }, [nameService]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('category-name')}>
                <Link className={cx('category-link')} to={path} reloadDocument>
                    {title}
                </Link>
            </div>

            <div className={cx('category-box')}>
                {result.map((data, index) => (
                    <div key={index} className={cx('item-box')}>
                        <Item data={data} namePath={title} />
                    </div>
                ))}
            </div>

            <div className={cx('show-all')}>
                <Link className={cx('show-btn')} to={path} reloadDocument>
                    Xem tất cả {title}
                    <FontAwesomeIcon className={cx('show-icon')} icon={faChevronRight} />
                </Link>
            </div>
        </div>
    );
}

export default CategoryItem;
