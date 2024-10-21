import classNames from 'classnames/bind';
import styles from './Registration.module.scss';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Registration() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('registration-result-page')}>
                <div className={cx('order-completed_icon')}>
                    <Image
                        classNames={cx('img')}
                        src="https://shopdunk.com/images/uploaded/icon/complate_icon.png"
                        alt="icon"
                        style={{ width: '80px', height: '80px', verticalAlign: 'middle', borderStyle: 'none' }}
                    />
                </div>
                <div className={cx('page-body')}>
                    <div className={cx('result')}>
                        Bạn đã đăng ký thành công. Bạn sẽ nhận được email với hướng dẫn kích hoạt tài khoản.
                    </div>
                    <div className={cx('page-completed_title')}>Chúc bạn tìm được sản phẩm ưng ý tại ShopDunk</div>
                    <div className={cx('continue_shoping')}>
                        <Link to={config.routes.home} className={cx('register-continue-button')}>
                            Tiếp tục mua hàng
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
