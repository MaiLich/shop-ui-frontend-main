import classNames from 'classnames/bind';
import styles from './GiftYour.module.scss';

const cx = classNames.bind(styles);

function GiftYour() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-title-wrapper')}>
                <h1 className={cx('page-title')}>
                    <span className={cx('base')} data-ui-id="page-title-wrapper">
                        Ưu đãi của bạn
                    </span>
                </h1>
                <div className={cx('des')}>Bạn có thể cập nhật thông tin của mình ở trang này</div>
            </div>
            <div>Bạn không có bất kỳ ưu đãi nào.</div>
        </div>
    );
}

export default GiftYour;
