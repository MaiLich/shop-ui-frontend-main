import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Sidebar({ handleView, handleTitle }) {
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.clear();
        const linkUrl = event.currentTarget.getAttribute('href');
        window.location.href = linkUrl;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('account-page-title')}>
                <span>Tài khoản của bạn</span>
            </div>
            <div className={cx('box')}>
                <div className={cx('info-box')}>
                    <div className={cx('block-title')}>
                        <strong className={cx('customer-name')}>Thông tin</strong>
                    </div>
                    <div className={cx('box-content')}>
                        <ul className={cx('items')}>
                            <li className={cx('item')}>
                                <NavLink
                                    className={(nav) => cx('item-title', { active: nav.isActive })}
                                    to={config.routes.account}
                                    onClick={() => {
                                        handleView(config.viewUser.account);
                                        handleTitle({ title: 'Tài khoản của tôi' });
                                    }}
                                    reloadDocument
                                >
                                    <span>Thông tin tài khoản</span>
                                    <strong>Thông tin tài khoản</strong>
                                </NavLink>
                            </li>
                            <li className={cx('item')}>
                                <NavLink
                                    className={(nav) => cx('item-title', { active: nav.isActive })}
                                    to={config.routes.orderHistory}
                                    onClick={() => {
                                        handleView(config.viewUser.orderHistory);
                                        handleTitle({ title: 'Lịch sử mua hàng' });
                                    }}
                                    reloadDocument
                                >
                                    <span>Lịch sử mua hàng</span>
                                    <strong>Lịch sử mua hàng</strong>
                                </NavLink>
                            </li>
                            <li className={cx('item')}>
                                <NavLink
                                    className={(nav) => cx('item-title', { active: nav.isActive })}
                                    to={config.routes.deliveryAddress}
                                    onClick={() => {
                                        handleView(config.viewUser.deliveryAddress);
                                        handleTitle({ title: 'Địa chỉ giao hàng' });
                                    }}
                                    reloadDocument
                                >
                                    <span>Địa chỉ giao hàng</span>
                                    <strong>Địa chỉ giao hàng</strong>
                                </NavLink>
                            </li>
                            <li className={cx('item')}>
                                <NavLink
                                    className={(nav) => cx('item-title', { active: nav.isActive })}
                                    to={config.routes.favoriteProducts}
                                    onClick={() => {
                                        handleView(config.viewUser.favoriteProducts);
                                        handleTitle({ title: 'Sản phẩm yêu thích' });
                                    }}
                                    reloadDocument
                                >
                                    <span>Sản phẩm yêu thích</span>
                                    <strong>Sản phẩm yêu thích</strong>
                                </NavLink>
                            </li>
                            <li className={cx('item')}>
                                <NavLink
                                    className={(nav) => cx('item-title', { active: nav.isActive })}
                                    to={config.routes.giftYour}
                                    onClick={() => {
                                        handleView(config.viewUser.giftYour);
                                        handleTitle({ title: 'Ưu đãi của bạn' });
                                    }}
                                    reloadDocument
                                >
                                    <span>Ưu đãi của bạn</span>
                                    <strong>Ưu đãi của bạn</strong>
                                </NavLink>
                            </li>
                            <li className={cx('item')}>
                                <span className={cx('delimiter')}></span>
                            </li>
                            <li className={cx('item')}>
                                <Link className={cx('item-title')} to={config.routes.home} onClick={handleLogout}>
                                    <span>Đăng xuất</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
