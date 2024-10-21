import classNames from 'classnames/bind';
import styles from './InfoAccount.module.scss';
import { useEffect, useState } from 'react';
import * as DataUserService from '~/services/DataUserService';
import { isEmptyObject } from 'jquery';

const cx = classNames.bind(styles);

function InfoAccount() {
    const [checkChangePassword, setCheckChangePassword] = useState(false);
    const [checkChangeEmail, setCheckChangeEmail] = useState(false);
    const [data, setData] = useState({});
    const [newData, setNewData] = useState({});
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');
    const [newDay, setNewDay] = useState('');
    const [newMonth, setNewMonth] = useState('');
    const [newYear, setNewYear] = useState('');
    const [checkUpload, setCheckUpload] = useState(false);
    const [checkUploadPassword, setCheckUploadPassword] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        DataUserService.getUser({ id: token })
            .then((res) => {
                setData(res[0].dataUser);
                setNewEmail(res[0].dataUser.email);
                const nameUser = res[0].dataUser.firstName;
                let i = nameUser.length - 1;
                while (nameUser[i] !== ' ') {
                    i -= 1;
                }
                const x = nameUser.slice(0, i);
                const y = nameUser.slice(i + 1, nameUser.length);
                setFirstname(x);
                setLastname(y);
                setNewDay(res[0].dataUser.day);
                setNewMonth(res[0].dataUser.month);
                setNewYear(res[0].dataUser.year);
            })
            .catch((error) => {
                return error;
            });
    }, []);

    useEffect(() => {
        setNewData({
            ...data,
            firstName: `${firstname.trim()} ${lastname.trim()}`,
            email: newEmail,
            birthday: `${newDay}/${newMonth}/${newYear}`,
            day: newDay,
            month: newMonth,
            year: newYear,
        });
    }, [data, firstname, lastname, newDay, newEmail, newMonth, newYear]);

    useEffect(() => {
        if (checkUploadPassword && newPassword !== '') {
            setNewData({ ...data, password: newPassword });
            setNewConfirmPassword('');
            setNewPassword('');
        }
    }, [checkUploadPassword, data, newPassword]);

    useEffect(() => {
        if (!isEmptyObject(newData) && (checkUpload || checkUploadPassword)) {
            const token = localStorage.getItem('token');
            DataUserService.putData({ id: token, dataUser: newData }).catch((error) => {
                return error;
            });
        }
    }, [checkUpload, checkUploadPassword, newData]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-title-wrapper')}>
                <h1 className={cx('page-title')}>
                    <span className={cx('base')} data-ui-id="page-title-wrapper">
                        Thông tin tài khoản
                    </span>
                </h1>
                <div className={cx('des')}>Bạn có thể cập nhật thông tin của mình ở trang này</div>
            </div>
            <div className={cx('box-account-information')}>
                <div className={cx('login-information')}>
                    <form className={cx('form-edit-account')}>
                        <fieldset className={cx('fieldset', 'info')}>
                            <input name="form_key" type="hidden" value="XH79YeNbqR4hTC9J" />
                            <legend className={cx('legend')}>
                                <span>Thông tin đăng nhập</span>
                            </legend>
                            <div className={cx('box-information')}>
                                <p>
                                    <span>Email:</span>
                                    <strong>{data.email}</strong>
                                </p>
                                <p>
                                    <span>Số điện thoại:</span>
                                    <strong>{data.phone}</strong>
                                </p>
                            </div>
                            <div className={cx('field', 'choice')}>
                                <input
                                    type="checkbox"
                                    name="change_password"
                                    id="change-password"
                                    data-role="change-password"
                                    value="1"
                                    title="Thay đổi mật khẩu"
                                    className={cx('checkbox')}
                                    style={{ display: 'block' }}
                                    onChange={(e) => {
                                        setCheckChangePassword(e.target.checked);
                                    }}
                                />
                                <label className={cx('label')} htmlFor="change-password">
                                    <span>Thay đổi mật khẩu</span>
                                </label>
                            </div>
                        </fieldset>

                        <fieldset
                            className={cx('fieldset', 'password')}
                            data-container="change-email-password"
                            style={{ display: checkChangePassword ? 'block' : 'none' }}
                        >
                            <div
                                className={cx('field', 'new', 'password', 'required')}
                                data-container="new-password"
                                style={{ display: 'block' }}
                            >
                                <label className={cx('label')} htmlFor="password2">
                                    <span>Mật khẩu mới</span>
                                </label>
                                <div className={cx('control')}>
                                    <input
                                        type="password"
                                        className={cx('input-text')}
                                        name="password"
                                        id="password2"
                                        value={newPassword}
                                        data-password-min-length="6"
                                        data-password-min-character-sets="3"
                                        data-input="new-password"
                                        autoComplete="off"
                                        aria-required="true"
                                        data-validate="{required:true, 'validate-customer-password':true, 'password-not-equal-to-user-name':'undefined'}"
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                        }}
                                    />
                                    <div
                                        id="password-strength-meter-container"
                                        data-role="password-strength-meter"
                                        aria-live="polite"
                                    >
                                        <div id="password-strength-meter" className={cx('password-strength-meter')}>
                                            Độ mạnh mật khẩu:
                                            <span
                                                id="password-strength-meter-label"
                                                data-role="password-strength-meter-label"
                                            >
                                                Không có mật khẩu
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={cx('field', 'confirmation', 'password', 'required')}
                                data-container="confirm-password"
                                style={{ display: 'block' }}
                            >
                                <label className={cx('label')} htmlFor="password-confirmation2">
                                    <span>Nhập lại mật khẩu mới</span>
                                </label>
                                <div className={cx('control')}>
                                    <input
                                        value={newConfirmPassword}
                                        type="password"
                                        className={cx('input-text')}
                                        name="password_confirmation"
                                        id="password-confirmation2"
                                        data-input="confirm-password"
                                        autoComplete="off"
                                        aria-required="true"
                                        data-validate='{required:true, equalTo:"[data-input=new-password]"}'
                                        onChange={(e) => {
                                            setNewConfirmPassword(e.target.value);
                                        }}
                                    />
                                    <div
                                        htmlFor="password-confirmation2"
                                        generated="true"
                                        className={cx('mage-error')}
                                        id="password-confirmation2-error"
                                        style={{ display: newConfirmPassword !== newPassword ? 'block' : 'none' }}
                                    >
                                        Vui lòng nhập lại cùng giá trị của mật khẩu
                                    </div>
                                </div>
                            </div>
                            <div className={cx('actions-toolbar')}>
                                <div className={cx('primary')}>
                                    <button
                                        type="submit"
                                        className={cx('action', 'save', 'primary')}
                                        title="Cập nhật"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (newConfirmPassword === newPassword) {
                                                setCheckUploadPassword(true);
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 500);
                                            }
                                        }}
                                    >
                                        <span>Cập nhật</span>
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className={cx('personal-information')}>
                    <form className={cx('form-edit-account')}>
                        <fieldset className={cx('fieldset', 'info')}>
                            <legend className={cx('legend')}>
                                <span>Thông tin cá nhân</span>
                            </legend>
                            <div className={cx('field-group-name')}>
                                <div className={cx('field', 'field-name-lastname', 'required')}>
                                    <label className={cx('label')} htmlFor="lastname">
                                        <span>Họ</span>
                                    </label>
                                    <div className={cx('control')}>
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            value={firstname}
                                            title="Họ"
                                            className={cx('input-text', 'required-entry')}
                                            data-validate="{required:true}"
                                            aria-required="true"
                                            onChange={(e) => {
                                                setFirstname(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={cx('field', 'field-name-lastname', 'required')}>
                                    <label className={cx('label')} htmlFor="firstname">
                                        <span>Tên</span>
                                    </label>
                                    <div className={cx('control')}>
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                            value={lastname}
                                            title="Tên"
                                            className={cx('input-text', 'required-entry')}
                                            data-validate="{required:true}"
                                            aria-required="true"
                                            onChange={(e) => {
                                                setLastname(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className={cx('fieldset', 'password', 'fieldset-change-email')}
                                data-container="change-email-password"
                                style={{ display: 'block' }}
                            >
                                <div
                                    className={cx('field', 'email', 'required')}
                                    data-container="change-email"
                                    style={{ display: 'block' }}
                                >
                                    <label className={cx('label')} htmlFor="email2">
                                        <span>Email</span>
                                    </label>
                                    <div className={cx('control')}>
                                        <input
                                            type="checkbox"
                                            name="change_email"
                                            id="change-email"
                                            defaultValue={'1'}
                                            title="Thay đổi Email"
                                            className={cx('checkbox')}
                                            aria-required="true"
                                            onChange={(e) => {
                                                setCheckChangeEmail(e.target.checked);
                                            }}
                                        />
                                        <label className={cx('label')} htmlFor="change-email">
                                            <span
                                                className={cx('change')}
                                                style={{ display: !checkChangeEmail ? 'block' : 'none' }}
                                            >
                                                Thay đổi
                                            </span>
                                            <span
                                                className={cx('cancel')}
                                                style={{ display: checkChangeEmail ? 'block' : 'none' }}
                                            >
                                                Hủy
                                            </span>
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            id="email2"
                                            autoComplete="email"
                                            value={newEmail}
                                            title="Email"
                                            className={cx('input-text', 'disabled')}
                                            style={{ pointerEvents: checkChangeEmail ? 'auto' : 'none' }}
                                            onChange={(e) => {
                                                setNewEmail(e.target.value);
                                            }}
                                            disabled={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('field', 'field-telephone', 'required')}>
                                <label className={cx('label')} htmlFor="telephone2">
                                    <span>Số điện thoại</span>
                                </label>
                                <div className={cx('control')}>
                                    <input
                                        type="text"
                                        id="telephone2"
                                        name="telephone"
                                        value={data.phone}
                                        title=""
                                        className={cx('input-text')}
                                        disabled={data.phone !== '' ? true : false}
                                        aria-required="true"
                                    />
                                </div>
                            </div>
                            <div className={cx('field', 'field-gender', 'gender')}>
                                <label className={cx('label')} htmlFor="gender">
                                    <span>Giới tính</span>
                                </label>
                                <div className={cx('control')}>
                                    <label className={cx('label', 'gender-option-1')} htmlFor="gender-option-1">
                                        <input
                                            type="radio"
                                            className={cx('radio')}
                                            id="gender-option-1"
                                            name="gender"
                                            data-selector="gender"
                                            checked={data.gender === 'M' ? 'checked' : undefined}
                                            defaultValue={'M'}
                                        />
                                        <span>Nam</span>
                                    </label>

                                    <label className={cx('label', 'gender-option-2')} htmlFor="gender-option-2">
                                        <input
                                            type="radio"
                                            className={cx('radio')}
                                            id="gender-option-2"
                                            name="gender"
                                            data-selector="gender"
                                            checked={data.gender === 'F' ? 'checked' : undefined}
                                            defaultValue={'F'}
                                        />
                                        <span>Nữ</span>
                                    </label>
                                </div>
                            </div>
                            <div className={cx('field', 'field-birthday')}>
                                <label className={cx('label')} htmlFor="birthday">
                                    <span>Sinh nhật</span>
                                </label>
                                <div className={cx('label-note')}>
                                    Thông tin ngày sinh sẽ không thay đổi được sau khi nhập. Vui lòng nhập đúng thông
                                    tin.
                                </div>
                                <div className={cx('control')}>
                                    <select
                                        className={cx('days')}
                                        name="days"
                                        disabled={data.day !== '' ? true : false}
                                        onChange={(e) => {
                                            setNewDay(e.target.value);
                                        }}
                                    >
                                        <option value="">{data.day}</option>
                                        <option value="1">01</option>
                                        <option value="2">02</option>
                                        <option value="3">03</option>
                                        <option value="4">04</option>
                                        <option value="5">05</option>
                                        <option value="6">06</option>
                                        <option value="7">07</option>
                                        <option value="8">08</option>
                                        <option value="9">09</option>
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
                                        className={cx('month')}
                                        name="month"
                                        disabled={data.month !== '' ? true : false}
                                        onChange={(e) => {
                                            setNewMonth(e.target.value);
                                        }}
                                    >
                                        <option value="">{data.month}</option>
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
                                        className={cx('year')}
                                        name="year"
                                        disabled={data.year !== '' ? true : false}
                                        onChange={(e) => {
                                            setNewYear(e.target.value);
                                        }}
                                    >
                                        <option value="">{data.year}</option>
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
                            </div>
                        </fieldset>
                        <div className={cx('actions-toolbar')}>
                            <div className={cx('primary')}>
                                <button
                                    type="submit"
                                    className={cx('action', 'save', 'primary')}
                                    title="Cập nhập thông tin"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCheckUpload(true);
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 500);
                                    }}
                                >
                                    <span>Cập nhập thông tin</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InfoAccount;
