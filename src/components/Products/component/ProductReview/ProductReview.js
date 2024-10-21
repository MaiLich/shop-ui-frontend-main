import classNames from 'classnames/bind';
import styles from './ProductReview.module.scss';

import AllRatingList from './AllRatingList';
import AllReviewList from './AllReviewList';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ProductReview({ title }) {
    const [data, setData] = useState([]);
    const putOutData = (childData) => {
        setData(childData);
    };
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Đánh giá danh mục</p>
            <div className={cx('container')}>
                <AllRatingList title={title} sendChildData={putOutData} />
                <AllReviewList data={data} />
            </div>
        </div>
    );
}

export default ProductReview;
