import classNames from 'classnames/bind';
import styles from './FavoriteProducts.module.scss';

const cx = classNames.bind(styles);

function FavoriteProducts() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-title-wrapper')}>
                <h1 className={cx('page-title')}>
                    <span className={cx('base')} data-ui-id="page-title-wrapper">
                        Sản phẩm yêu thích
                    </span>
                </h1>
                <div className={cx('des')}>Bạn có thể cập nhật thông tin của mình ở trang này</div>
            </div>
        </div>
    );
}

export default FavoriteProducts;
