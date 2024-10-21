import classNames from 'classnames/bind';
import styles from './OrderHistory.module.scss';

const cx = classNames.bind(styles);

function OrderHistory() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-title-wrapper')}>
                <h1 className={cx('page-title')}>
                    <span className={cx('base')} data-ui-id="page-title-wrapper">
                        Lịch sử mua hàng
                    </span>
                </h1>
                <div className={cx('des')}>
                    Bạn có thể xem lịch sử mua hàng và trạng thái đơn hàng trực tuyến của Routine tại đây.
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;
