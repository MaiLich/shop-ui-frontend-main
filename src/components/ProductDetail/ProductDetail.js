import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

import Breadcrumb from '~/components/Breadcrumb';
import ProductReview from './component/ProductReview';
import Comments from './component/Comments';
import ProductAssential from './component/ProductAssential';
import OverView from './component/OverView';
import CrossSells from './component/CrossSells';
import TabDetail from './component/TabDetail';
import Description from './component/Description';
import { useEffect, useState } from 'react';
import Loader from '~/components/Loader';
import TitleTab from '~/components/TitleTab';

const cx = classNames.bind(styles);

function ProductDetail({ directive, title, item }) {
    const [imgs, setImgs] = useState([]);
    const [colorNew, setColorNew] = useState('');
    const [userReview, setUserReview] = useState(0);
    const [loading, setLoading] = useState(0);

    useEffect(() => {
        let colorUse = item.colorPopular;
        if (colorNew !== '') {
            colorUse = colorNew;
        }
        const dataImgs = item.color.listColor.find((data) => data.colorName === colorUse);
        setImgs(dataImgs.img);
    }, [item.color.listColor, item.colorPopular, colorNew]);
    const handleImg = (colorNew) => {
        setColorNew(colorNew);
    };
    const handleUserReview = (x) => {
        setUserReview(x);
    };

    const handleLoading = (e) => {
        setLoading(e);
    };

    return (
        <div className={cx('wrapper')}>
            <TitleTab title={title} />
            {loading === 1 && <Loader />}
            <Breadcrumb directive={directive} title={title} />
            <div className={cx('inner')}>
                <div className={cx('assential')}>
                    <ProductAssential className={cx('review-img')} dataImg={imgs} />
                    <OverView
                        className={cx('review-content')}
                        data={item}
                        colorNew={handleImg}
                        userReview={userReview}
                        handleLoading={handleLoading}
                    />
                </div>
                <CrossSells />
                <TabDetail />
                <Description name={item.nameBlog} />
                <ProductReview title={title} newUserReview={handleUserReview} />
                <Comments title={title} />
            </div>
        </div>
    );
}

export default ProductDetail;
