import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import imgage from '~/assets/images';
import config from '~/config';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-upper')}>
                <div className={cx('follow-us')}>
                    <div className={cx('logo')}>
                        <Link to={config.routes.home} reloadDocument>
                            <Image className={cx('image')} src={imgage.shopLogo} alt="logo" />
                        </Link>
                    </div>
                    <div className={cx('topic')}>
                        <p className={cx('ft_gioithieu')}>
                            Năm 2020, Shop trở thành đại lý ủy quyền của Apple. Chúng tôi phát triển chuỗi cửa hàng tiêu
                            chuẩn và Apple Mono Store nhằm mang đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của
                            Apple cho người dùng Việt Nam.
                        </p>
                    </div>
                    <div className={cx('social')}>
                        <Link className={cx('icon')}>
                            <Image src="https://shopdunk.com/Themes/SD/Content/images/Face.png" />
                        </Link>
                        <Link className={cx('icon')}>
                            <Image src="https://shopdunk.com/Themes/SD/Content/images/Youtube.png" />
                        </Link>
                        <Link className={cx('icon')}>
                            <Image src="https://shopdunk.com/Themes/SD/Content/images/Zalo.png" />
                        </Link>
                    </div>
                </div>
                <div className={cx('information')}>
                    <div className={cx('title')}>
                        <strong>Thông tin</strong>
                    </div>
                    <ul className={cx('list')}>
                        <li>
                            <Link className={cx('inf-list')}>Tin Tức</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Giới thiệu </Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Check IMEI</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Phương thức thanh toán</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Thuê điểm bán lẻ</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Bảo hành và sửa chữa</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Tuyển dụng</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Đánh giá chất lượng, khiếu nại</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('customer-service')}>
                    <div className={cx('title')}>
                        <strong>Chính sách</strong>
                    </div>
                    <ul className={cx('list')}>
                        <li>
                            <Link className={cx('inf-list')}>Thu cũ đổi mới</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Giao hàng</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Giao hàng (ZaloPay)</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Huỷ giao dịch</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Đổi trả</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Bảo hành</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Dịch vụ</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Giải quyết khiếu nại</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Bảo mật thông tin</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('my-account')}>
                    <div className={cx('title')}>
                        <strong>Địa chỉ & Liên hệ</strong>
                    </div>
                    <ul className={cx('list')}>
                        <li>
                            <Link className={cx('inf-list')}>Tài khoản của tôi</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Đơn đặt hàng</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Hệ thống của hàng</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Tìm Store trên Google Map</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Mua Hàng</Link>
                        </li>
                        <li>
                            <Link className={cx('inf-list')}>Doanh nghiệp</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('footer-lower')}>
                <div className={cx('inf-lower')}>
                    <span className={cx('footer-disclaimer')}>
                        © 2016 Công ty Cổ Phần HESMAN Việt Nam GPDKKD: 0107465657 do Sở KH &amp; ĐT TP. Hà Nội cấp ngày
                        08/06/2016.
                        <br /> Địa chỉ: Số 76 Thái Hà, phường Trung Liệt, quận Đống Đa, thành phố Hà Nội, Việt Nam
                        <br /> ĐT: 0247.306.9999 | Email: lienhe@shop.com
                    </span>
                    <a href="http://online.gov.vn/(X(1)S(jfktnnku5rui3vjf5pnk4sgc))/Home/WebDetails/34144?AspxAutoDetectCookieSupport=1">
                        <Image
                            className={cx('f-image')}
                            src="https://shopdunk.com/images/uploaded-source/Trang%20ch%E1%BB%A7/Bocongthuong.png"
                            alt=""
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
