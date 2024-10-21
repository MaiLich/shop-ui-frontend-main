import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Registration from './Registration';
import config from '~/config';
import * as DataUserService from '~/services/DataUserService';

const cx = classNames.bind(styles);

function Register() {
    const [checkCapcha, setCheckCapcha] = useState(false);
    const [referralCode, setReferralCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gender, setGender] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dataUser, setDataUser] = useState({});
    const [checkSub, setCheckSub] = useState(false);

    useEffect(() => {
        if (checkCapcha === true) {
            setCheckCapcha(false);
            const onloadCallbackcaptcha_1522297611 = () => {
                window.grecaptcha.render('captcha_1522297611', {
                    sitekey: '6LcXUmEkAAAAAKzfE5n-_q9I4ojdMDPuf0M1_peS',
                    theme: 'light',
                });
            };
            onloadCallbackcaptcha_1522297611();
        }
    }, [checkCapcha]);

    useEffect(() => {
        if (checkSub) {
            DataUserService.post({ dataUser: dataUser }).catch((error) => {
                return error;
            });
        }
    }, [dataUser, checkSub]);

    const handleSub = () => {
        if (
            firstName.trim() !== '' &&
            email.trim() !== '' &&
            phone.trim() !== '' &&
            userName.trim() !== '' &&
            password.trim() !== '' &&
            password === confirmPassword
        ) {
            setDataUser({
                firstName: firstName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                userName: userName.trim(),
                password: password.trim(),
                gender: gender,
                birthday: `${day}/${month}/${year}`,
                day: day,
                month: month,
                year: year,
            });
            setReferralCode('');
            setFirstName('');
            setGender('');
            setDay('');
            setMonth('');
            setYear('');
            setEmail('');
            setPhone('');
            setUserName('');
            setPassword('');
            setConfirmPassword('');
            setCheckSub(true);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Breadcrumb directive={true} title="Đăng ký" />
            {!checkSub && (
                <div className={cx('page-register')}>
                    <div className={cx('page-body')}>
                        <div className={cx('customer-blocks')}>
                            <div className={cx('new-wrapper')}>
                                <div className={cx('topic-block')}>
                                    <div className={cx('topic-block-body')}>
                                        <p>
                                            <Image
                                                className={cx('img')}
                                                src="https://shopdunk.com/images/uploaded/banner/TND_M402_010%201.jpeg"
                                                alt=""
                                                width="793px"
                                                height="467px"
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <form>
                                <div className={cx('fieldset')}>
                                    <div className={cx('page-title')}>
                                        <h1>Đăng ký</h1>
                                    </div>
                                    <div className={cx('form-fields')}>
                                        <div className={cx('first_name')}>
                                            <label htmlFor="ReferralCode">Mã giới thiệu:</label>
                                            <input
                                                type="text"
                                                id="ReferralCode"
                                                name="ReferralCode"
                                                value={referralCode}
                                                onChange={(e) => {
                                                    setReferralCode(e.target.value);
                                                }}
                                            />
                                            <span
                                                className={cx('field-validation-valid')}
                                                data-valmsg-for="ReferralCode"
                                                data-valmsg-replace="true"
                                            ></span>
                                        </div>
                                        <div className={cx('first_name')}>
                                            <label htmlFor="FirstName">Tên, Họ:</label>
                                            <input
                                                type="text"
                                                data-val="true"
                                                data-val-required="Trường bắt buộc."
                                                id="FirstName"
                                                name="FirstName"
                                                value={firstName}
                                                onChange={(e) => {
                                                    setFirstName(e.target.value);
                                                }}
                                            />
                                            <span
                                                className={cx('required')}
                                                style={{ display: firstName === '' ? 'block' : 'none' }}
                                            >
                                                *
                                            </span>
                                            <span
                                                className={cx('field-validation-valid')}
                                                data-valmsg-for="FirstName"
                                                data-valmsg-replace="true"
                                            ></span>
                                        </div>
                                        <div className={cx('gender', 'inputs')}>
                                            <label htmlFor="gender">Giới tính:</label>
                                            <div id="gender" className={cx('gender')}>
                                                <span className={cx('male')}>
                                                    <input
                                                        type="radio"
                                                        value="M"
                                                        id="gender-male"
                                                        name="Gender"
                                                        onChange={(e) => {
                                                            setGender(e.target.value);
                                                        }}
                                                    />
                                                    <label className={cx('forcheckbox')} htmlFor="gender-male">
                                                        Nam
                                                    </label>
                                                </span>
                                                <span className={cx('female')}>
                                                    <input
                                                        type="radio"
                                                        value="F"
                                                        id="gender-female"
                                                        name="Gender"
                                                        onChange={(e) => {
                                                            setGender(e.target.value);
                                                        }}
                                                    />
                                                    <label className={cx('forcheckbox')} htmlFor="gender-female">
                                                        Nữ
                                                    </label>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('date-of-birth', 'inputs')}>
                                            <label>Ngày sinh:</label>
                                            <div className={cx('date-picker-wrapper')}>
                                                <select
                                                    name="DateOfBirthDay"
                                                    onChange={(e) => {
                                                        setDay(e.target.value);
                                                    }}
                                                >
                                                    <option value="0">ngày</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                    <option value="25">25</option>
                                                    <option value="26">26</option>
                                                    <option value="27">27</option>
                                                    <option value="28">28</option>
                                                    <option value="29">29</option>
                                                    <option value="30">30</option>
                                                    <option value="31">31</option>
                                                </select>
                                                <select
                                                    name="DateOfBirthMonth"
                                                    onChange={(e) => {
                                                        setMonth(e.target.value);
                                                    }}
                                                >
                                                    <option value="0">tháng</option>
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="03">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                                <select
                                                    name="DateOfBirthYear"
                                                    onChange={(e) => {
                                                        setYear(e.target.value);
                                                    }}
                                                >
                                                    <option value="0">Năm</option>
                                                    <option value="1913">1913</option>
                                                    <option value="1914">1914</option>
                                                    <option value="1915">1915</option>
                                                    <option value="1916">1916</option>
                                                    <option value="1917">1917</option>
                                                    <option value="1918">1918</option>
                                                    <option value="1919">1919</option>
                                                    <option value="1920">1920</option>
                                                    <option value="1921">1921</option>
                                                    <option value="1922">1922</option>
                                                    <option value="1923">1923</option>
                                                    <option value="1924">1924</option>
                                                    <option value="1925">1925</option>
                                                    <option value="1926">1926</option>
                                                    <option value="1927">1927</option>
                                                    <option value="1928">1928</option>
                                                    <option value="1929">1929</option>
                                                    <option value="1930">1930</option>
                                                    <option value="1931">1931</option>
                                                    <option value="1932">1932</option>
                                                    <option value="1933">1933</option>
                                                    <option value="1934">1934</option>
                                                    <option value="1935">1935</option>
                                                    <option value="1936">1936</option>
                                                    <option value="1937">1937</option>
                                                    <option value="1938">1938</option>
                                                    <option value="1939">1939</option>
                                                    <option value="1940">1940</option>
                                                    <option value="1941">1941</option>
                                                    <option value="1942">1942</option>
                                                    <option value="1943">1943</option>
                                                    <option value="1944">1944</option>
                                                    <option value="1945">1945</option>
                                                    <option value="1946">1946</option>
                                                    <option value="1947">1947</option>
                                                    <option value="1948">1948</option>
                                                    <option value="1949">1949</option>
                                                    <option value="1950">1950</option>
                                                    <option value="1951">1951</option>
                                                    <option value="1952">1952</option>
                                                    <option value="1953">1953</option>
                                                    <option value="1954">1954</option>
                                                    <option value="1955">1955</option>
                                                    <option value="1956">1956</option>
                                                    <option value="1957">1957</option>
                                                    <option value="1958">1958</option>
                                                    <option value="1959">1959</option>
                                                    <option value="1960">1960</option>
                                                    <option value="1961">1961</option>
                                                    <option value="1962">1962</option>
                                                    <option value="1963">1963</option>
                                                    <option value="1964">1964</option>
                                                    <option value="1965">1965</option>
                                                    <option value="1966">1966</option>
                                                    <option value="1967">1967</option>
                                                    <option value="1968">1968</option>
                                                    <option value="1969">1969</option>
                                                    <option value="1970">1970</option>
                                                    <option value="1971">1971</option>
                                                    <option value="1972">1972</option>
                                                    <option value="1973">1973</option>
                                                    <option value="1974">1974</option>
                                                    <option value="1975">1975</option>
                                                    <option value="1976">1976</option>
                                                    <option value="1977">1977</option>
                                                    <option value="1978">1978</option>
                                                    <option value="1979">1979</option>
                                                    <option value="1980">1980</option>
                                                    <option value="1981">1981</option>
                                                    <option value="1982">1982</option>
                                                    <option value="1983">1983</option>
                                                    <option value="1984">1984</option>
                                                    <option value="1985">1985</option>
                                                    <option value="1986">1986</option>
                                                    <option value="1987">1987</option>
                                                    <option value="1988">1988</option>
                                                    <option value="1989">1989</option>
                                                    <option value="1990">1990</option>
                                                    <option value="1991">1991</option>
                                                    <option value="1992">1992</option>
                                                    <option value="1993">1993</option>
                                                    <option value="1994">1994</option>
                                                    <option value="1995">1995</option>
                                                    <option value="1996">1996</option>
                                                    <option value="1997">1997</option>
                                                    <option value="1998">1998</option>
                                                    <option value="1999">1999</option>
                                                    <option value="2000">2000</option>
                                                    <option value="2001">2001</option>
                                                    <option value="2002">2002</option>
                                                    <option value="2003">2003</option>
                                                    <option value="2004">2004</option>
                                                    <option value="2005">2005</option>
                                                    <option value="2006">2006</option>
                                                    <option value="2007">2007</option>
                                                    <option value="2008">2008</option>
                                                    <option value="2009">2009</option>
                                                    <option value="2010">2010</option>
                                                    <option value="2011">2011</option>
                                                    <option value="2012">2012</option>
                                                    <option value="2013">2013</option>
                                                    <option value="2014">2014</option>
                                                    <option value="2015">2015</option>
                                                    <option value="2016">2016</option>
                                                    <option value="2017">2017</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                </select>
                                            </div>
                                            <span
                                                className={cx('field-validation-valid')}
                                                data-valmsg-for="DateOfBirthDay"
                                                data-valmsg-replace="true"
                                            ></span>
                                            <span
                                                className={cx('field-validation-valid')}
                                                data-valmsg-for="DateOfBirthMonth"
                                                data-valmsg-replace="true"
                                            ></span>
                                            <span
                                                className={cx('field-validation-valid')}
                                                data-valmsg-for="DateOfBirthYear"
                                                data-valmsg-replace="true"
                                            ></span>
                                        </div>
                                        <div className={cx('inputs')}>
                                            <label htmlFor="Email">E-mail:</label>
                                            <input
                                                type="email"
                                                data-val="true"
                                                data-val-email="Email sai"
                                                data-val-required="Trường bắt buộc."
                                                id="Email"
                                                name="Email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                            <span
                                                className={cx('required')}
                                                style={{ display: email === '' ? 'block' : 'none' }}
                                            >
                                                *
                                            </span>
                                            <span
                                                className={cx('field-validation-valid')}
                                                data-valmsg-for="Email"
                                                data-valmsg-replace="true"
                                            ></span>
                                        </div>
                                        <div className={cx('inputs')}>
                                            <label htmlFor="Phone">Điện thoại:</label>
                                            <input
                                                type="tel"
                                                data-val="true"
                                                data-val-required="Trường bắt buộc."
                                                id="Phone"
                                                name="Phone"
                                                value={phone}
                                                onChange={(e) => {
                                                    setPhone(e.target.value);
                                                }}
                                            />
                                            <span
                                                className={cx('required')}
                                                style={{ display: phone === '' ? 'block' : 'none' }}
                                            >
                                                *
                                            </span>
                                            <span
                                                className={cx('field-validation-valid')}
                                                data-valmsg-for="Phone"
                                                data-valmsg-replace="true"
                                            ></span>
                                        </div>
                                        <div className={cx('inputs')}>
                                            <label htmlFor="Username">Username:</label>
                                            <input
                                                type="text"
                                                data-val="true"
                                                data-val-required="Tên người dùng là bắt buộc."
                                                id="Username"
                                                name="Username"
                                                value={userName}
                                                onChange={(e) => {
                                                    setUserName(e.target.value);
                                                }}
                                            />
                                            <span
                                                className={cx('required')}
                                                style={{ display: userName === '' ? 'block' : 'none' }}
                                            >
                                                *
                                            </span>
                                            <span
                                                className={cx('field-validation-valid')}
                                                data-valmsg-for="Username"
                                                data-valmsg-replace="true"
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('fieldset')}>
                                    <div className={cx('form-fields')}>
                                        <div className={cx('inputs')}>
                                            <label htmlFor="Password">Mật khẩu:</label>
                                            <input
                                                type="password"
                                                data-val="true"
                                                data-val-regex="<p>phải đáp ứng các quy tắc sau: </p><ul><li>phải có ít nhất 8 ký tự</li><li>Phải có ít nhất 8 ký tự trong đó có đặc biệt (ví dụ: #?!@$%^&amp;*-)</li></ul>"
                                                data-val-regex-pattern="^(?=.*?[#?!@$%^&amp;*-]).{8,}$"
                                                data-val-required="Yêu cầu mật khẩu."
                                                id="Password"
                                                name="Password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                            <span
                                                className={cx('required')}
                                                style={{ display: password === '' ? 'block' : 'none' }}
                                            >
                                                *
                                            </span>
                                            <span
                                                className={cx('field-validation-valid')}
                                                data-valmsg-for="Password"
                                                data-valmsg-replace="true"
                                            ></span>
                                        </div>
                                        <label className={cx('luu_y')}>
                                            Lưu ý: Mật khẩu phải có tối thiểu 8 ký tự bao gồm chữ, số và các ký tự đặc
                                            biệt
                                        </label>
                                        <div className={cx('inputs')}>
                                            <label htmlFor="ConfirmPassword">Xác nhận mật khẩu:</label>
                                            <input
                                                type="password"
                                                data-val="true"
                                                data-val-equalto="Mật khẩu và mật khẩu xác nhận không khớp."
                                                data-val-equalto-other="*.Password"
                                                data-val-required="Yêu cầu mật khẩu."
                                                id="ConfirmPassword"
                                                name="ConfirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                }}
                                            />
                                            <span
                                                className={cx('required')}
                                                style={{
                                                    display:
                                                        (confirmPassword === '' || confirmPassword !== password) &&
                                                        password !== ''
                                                            ? 'block'
                                                            : 'none',
                                                }}
                                            >
                                                *
                                            </span>
                                            <span
                                                className={cx('field-validation-valid')}
                                                data-valmsg-for="ConfirmPassword"
                                                data-valmsg-replace="true"
                                            ></span>
                                        </div>
                                        <div className={cx('captcha-box')}>
                                            <div id="captcha_1522297611">
                                                <div style={{ width: '304px', height: '78px' }}>
                                                    <div>
                                                        <iframe
                                                            title="reCAPTCHA"
                                                            src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LcXUmEkAAAAAKzfE5n-_q9I4ojdMDPuf0M1_peS&amp;co=aHR0cHM6Ly9zaG9wZHVuay5jb206NDQz&amp;hl=vi&amp;v=iRvKkcsnpNcOYYwhqaQxPITz&amp;theme=light&amp;size=normal&amp;cb=lo1cxv861vq2"
                                                            width="304"
                                                            height="78"
                                                            role="presentation"
                                                            name="a-4j1klxu4gvrn"
                                                            frameBorder="0"
                                                            scrolling="no"
                                                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                                                            onClick={() => {
                                                                setCheckCapcha(true);
                                                            }}
                                                        ></iframe>
                                                    </div>
                                                    <textarea
                                                        id="g-recaptcha-response"
                                                        name="g-recaptcha-response"
                                                        className={cx('g-recaptcha-response')}
                                                        style={{
                                                            width: '250px',
                                                            height: '40px',
                                                            border: '1px solid rgb(193, 193, 193)',
                                                            margin: '10px 25px',
                                                            padding: '0px',
                                                            resize: 'none',
                                                            display: 'none',
                                                        }}
                                                    ></textarea>
                                                </div>
                                                <iframe title="Embedded content" style={{ display: 'none' }}></iframe>
                                            </div>
                                            <script
                                                async=""
                                                defer=""
                                                src="https://www.google.com/recaptcha/api.js?onload=onloadCallbackcaptcha_1522297611&amp;render=explicit&amp;hl=vi"
                                            ></script>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('buttons')}>
                                    <button
                                        type="submit"
                                        name="register-button"
                                        id="register-button"
                                        className={cx('register-next-step-button')}
                                        onClick={handleSub}
                                    >
                                        Đăng ký
                                    </button>
                                </div>
                                <div className={cx('buttons-forgot')}>
                                    <label> Bạn đã có tài khoản? </label>
                                    <Link to={config.routes.login} className={cx('link_access')}>
                                        đăng nhập ngay
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {checkSub && <Registration />}
        </div>
    );
}

export default Register;
