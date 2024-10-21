import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import Image from '~/components/Image';
import imgage from '~/assets/images';
import config from '~/config';
import ButtonHeader from '~/layouts/components/ButtonHeader';
import { useEffect, useState } from 'react';
import * as DataUserService from '~/services/DataUserService';

const cx = classNames.bind(styles);

function Header() {
    const [badge, setBadge] = useState(0);
    const [JSONQuantity, setJSONQuantity] = useState(localStorage.getItem('quantity'));
    const [checkLogin, setCheckLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (JSONQuantity !== null) {
            setBadge(JSON.parse(JSONQuantity));
        }
        if (token !== null) {
            setCheckLogin(true);
            DataUserService.getUser({ token })
                .then((res) => {
                    setUserName(res[0].dataUser.firstName);
                })
                .catch((error) => {
                    return error;
                });
        }
        window.addEventListener('storage', handleLocalStorageChange);
        return () => {
            window.removeEventListener('storage', handleLocalStorageChange);
        };
    }, [JSONQuantity, token]);

    const handleLocalStorageChange = (event) => {
        if (event.key === 'quantity') {
            setJSONQuantity(localStorage.getItem('quantity'));
        }
        if (event.key === 'token') {
            setToken(localStorage.getItem('token'));
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.clear();
        setCheckLogin(false);
        const linkUrl = event.currentTarget.getAttribute('href');
        window.location.href = linkUrl;
    };

    const handleUser = (event) => {
        event.preventDefault();
        const linkUrl = event.currentTarget.getAttribute('href');
        window.location.href = linkUrl;
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link className={cx('logo')} to={config.routes.home} reloadDocument>
                    <Image className={cx('logo-item')} src={ imgage.shopLogo} alt="Shop" />
                </Link>
                <div className={cx('button-list')}>
                    <ButtonHeader path={config.routes.iphone}>iPhone</ButtonHeader>
                    <ButtonHeader path={config.routes.ipad}>iPad</ButtonHeader>
                    <ButtonHeader path={config.routes.mac}>Mac</ButtonHeader>
                    <ButtonHeader path={config.routes.watch}>Watch</ButtonHeader>
                    <ButtonHeader path={config.routes.soundpage}>Âm thanh</ButtonHeader>
                    <ButtonHeader path={config.routes.accessorypage}>Phụ kiện</ButtonHeader>
                    <Tippy
                        interactive
                        offset={[0, 0]}
                        placement="bottom-start"
                        render={(props) => (
                            <div className={cx('menu-sevice')} tabIndex="-1" {...props}>
                                <div className={cx('menu-box')}>
                                    <div className={cx('menu-item')}>
                                        <span>Bảo hành uỷ quyền Apple (Shop Care)</span>
                                    </div>
                                    <div className={cx('menu-item')}>
                                        <span>Trả góp</span>
                                    </div>
                                    <div className={cx('menu-item')}>
                                        <span>Thu cũ đổi mới</span>
                                    </div>
                                    <div className={cx('menu-item')}>
                                        <span>WorkShop</span>
                                    </div>
                                    <div className={cx('menu-item')}>
                                        <span>MBTI</span>
                                    </div>
                                    <div className={cx('menu-item')}>
                                        <span>Sim thẻ</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <ButtonHeader path={config.routes.servicepage}>Dịch vụ</ButtonHeader>
                    </Tippy>
                </div>
                <div className={cx('button-user')}>
                    <div className={cx('search-icon')}></div>
                    <Link className={cx('cart')} to={config.routes.cart} reloadDocument>
                        <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping} />
                        <span className={cx('badge')}>{badge}</span>
                    </Link>

                    <Tippy
                        interactive
                        offset={[60, -74]}
                        delay={[0, 600]}
                        placement="bottom-end"
                        render={(props) => (
                            <div className={cx('menu-user')} tabIndex="-1" {...props}>
                                <div className={cx('menu-box-user')}>
                                    {!checkLogin && (
                                        <>
                                            <div className={cx('menu-item-user')}>
                                                <Link className={cx('register')} to={config.routes.register}>
                                                    Tạo tài khoản ngay
                                                </Link>
                                            </div>
                                            <div className={cx('menu-item-user')}>
                                                <Link className={cx('login')} to={config.routes.login}>
                                                    Đăng nhập
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                    {checkLogin && (
                                        <>
                                            <div className={cx('menu-item-user')}>
                                                <Link
                                                    className={cx('user-name')}
                                                    to={config.routes.account}
                                                    reloadDocument
                                                >
                                                    {userName}
                                                </Link>
                                            </div>
                                            <div className={cx('menu-item-user')}>
                                                <Link
                                                    className={cx('wishlist')}
                                                    to={config.routes.favoriteProducts}
                                                    reloadDocument
                                                >
                                                    Danh sách yêu thích
                                                </Link>
                                            </div>
                                            <div className={cx('menu-item-user')}>
                                                <Link className={cx('cart')} to={config.routes.cart}>
                                                    Giỏ hàng
                                                </Link>
                                            </div>
                                            <div className={cx('menu-item-user', 'item-bottom')}>
                                                <Link
                                                    className={cx('logout')}
                                                    to={config.routes.home}
                                                    onClick={handleLogout}
                                                >
                                                    Đăng xuất
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    >
                        <Link to={!checkLogin ? config.routes.login : config.routes.account} onClick={handleUser}>
                            <FontAwesomeIcon className={cx('user-icon')} icon={faUser} />
                        </Link>
                    </Tippy>
                </div>
            </div>
        </header>
    );
}

export default Header;
