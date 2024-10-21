import classNames from 'classnames/bind';
import styles from './FooterNewLetter.module.scss';

const cx = classNames.bind(styles);
function FooterNewLetter() {
    return (
        <div className={cx('footer-newletter')}>
            <div className={cx('heading-newletter')}>Đăng kí nhận tin</div>
            <p>Thông tin sản phẩm mới nhất và chương trình khuyến mãi</p>
            <div className={cx('newsletter-sub')}>
                <input
                    className={cx('newsletter-subscribe-text')}
                    placeholder="Email của bạn"
                    aria-label="Đăng ký nhận bản tin của chúng tôi"
                    type="email"
                    name="NewsletterEmail"
                />
                <button type="button" className={cx('newsletter-subscribe-button')}>
                    Đăng ký
                </button>
            </div>
        </div>
    );
}

export default FooterNewLetter;
