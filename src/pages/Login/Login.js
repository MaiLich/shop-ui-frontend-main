import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as DataUserService from '~/services/DataUserService';
import config from '~/config';

const cx = classNames.bind(styles);

function Login() {
    const [checkLogin, setCheckLogin] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [checkSubmit, setCheckSubmit] = useState(false);
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState('');
    useEffect(() => {
        if (checkSubmit && userName !== '' && password !== '') {
            if (userName === 'admin123' && password === 'admin@123') {
                // Điều kiện đăng nhập admin
                setSuccess(true);
                setToken('admin-token'); // Hoặc bất kỳ giá trị token nào bạn muốn
                return;
            }
            DataUserService.getLogin({ userName: userName, password: password })
                .then((res) => {
                    if (!res) {
                        setCheckLogin(true);
                    } else {
                        setSuccess(true);
                        setToken(String(res[0]._id));
                    }
                })
                .catch((error) => {
                    return error;
                });
        }
    }, [checkSubmit, password, userName]);

    const handleLogin = (e) => {
        e.preventDefault();
        const linkUrl = e.currentTarget.getAttribute('href');
        if (success) {
            localStorage.setItem('token', token);
            setSuccess(false);
            if (userName === 'admin123' && password === 'admin@123') {
                window.location.href = '/Admin';
            } else {
                window.location.href = linkUrl;
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Breadcrumb directive={true} title="Đăng nhập" />
            <div className={cx('login-page', 'page')}>
                <div className={cx('page-body')}>
                    <div className={cx('customer-blocks')}>
                        <div className={cx('new-wrapper')}>
                            <div className={cx('topic-block')}>
                                <div className={cx('topic-block-body')}>
                                    <p>
                                        <Image
                                            className={cx('img')}
                                            src="https://shopdunk.com/images/uploaded/banner/VNU_M492_08%201.jpeg"
                                            alt=""
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('returning-wrapper')}>
                            <form>
                                {checkLogin && (
                                    <div className={cx('validation-summary-errors')}>
                                        Thông tin đăng nhập không đúng. Vui lòng thử lại.
                                        <ul>
                                            <li>Tài khoản không hoạt động</li>
                                        </ul>
                                    </div>
                                )}
                                <div className={cx('page-title')}>
                                    <h1>Đăng nhập</h1>
                                </div>
                                <div className={cx('form-fields')}>
                                    <div className={cx('inputs')}>
                                        <label htmlFor="Username">Tên đăng nhập:</label>
                                        <input
                                            className={cx('username')}
                                            autoFocus=""
                                            type="text"
                                            id="Username"
                                            name="Username"
                                            value={userName}
                                            onChange={(e) => {
                                                setUserName(e.target.value);
                                            }}
                                        />
                                        <span
                                            className={cx('field-validation-valid')}
                                            data-valmsg-for="Username"
                                            data-valmsg-replace="true"
                                        ></span>
                                    </div>
                                    <div className={cx('inputs')}>
                                        <label htmlFor="Password">Mật khẩu:</label>
                                        <input
                                            className={cx('password')}
                                            type="password"
                                            id="Password"
                                            name="Password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                        />
                                        <span
                                            className={cx('field-validation-valid')}
                                            data-valmsg-for="Password"
                                            data-valmsg-replace="true"
                                        ></span>
                                    </div>
                                    <div className={cx('inputs', 'reversed')}>
                                        <input
                                            type="checkbox"
                                            data-val="true"
                                            data-val-required="The Nhớ mật khẩu field is required."
                                            id="RememberMe"
                                            name="RememberMe"
                                            value="true"
                                        />
                                        <label htmlFor="RememberMe">Nhớ mật khẩu</label>
                                        <span className={cx('forgot-password')}>
                                            <Link className={cx('link-forgot-password')}>Quên mật khẩu?</Link>
                                        </span>
                                    </div>
                                    <div className={cx('buttons')}>
                                        <Link to={config.routes.home} onClick={handleLogin}>
                                            <button
                                                type="submit"
                                                className={cx('login-button')}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCheckSubmit(true);
                                                }}
                                            >
                                                Đăng nhập
                                            </button>
                                        </Link>
                                    </div>
                                    <div className={cx('buttons-forgot')}>
                                        <label> Bạn chưa có tài khoản? </label>
                                        <Link to={config.routes.register}>
                                            <button type="button" className={cx('register-button')}>
                                                Tạo tài khoản ngay
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
