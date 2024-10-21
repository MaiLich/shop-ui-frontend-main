import classNames from 'classnames/bind';
import styles from './CheckBilling.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as AddressService from '~/services/AddressService';
import $ from 'jquery';
import config from '~/config';

const cx = classNames.bind(styles);

function CheckBilling({ handleBilling, userLogin }) {
    const [dataUser, setDataUser] = useState({});
    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [phoneUser, setPhoneUser] = useState('');
    const [receive, setReceive] = useState('0');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [shop, setShop] = useState('');
    const [provinceData, setProvinceData] = useState([]);
    const [districtData, setDistrictData] = useState(undefined);
    const [shopData, setShopData] = useState(undefined);
    const [addressUser, setAddressUser] = useState('');
    const [checkBillCompany, setCheckBillCompany] = useState(false);
    const [nameCompany, setNameCompany] = useState('');
    const [addressCompany, setAddressCompany] = useState('');
    const [taxCompany, setTaxCompany] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Payments.VietQr');

    useEffect(() => {
        if (
            nameUser !== '' &&
            emailUser !== '' &&
            phoneUser !== '' &&
            province !== '' &&
            district !== '' &&
            (shop !== '' || addressUser !== '') &&
            paymentMethod !== ''
        ) {
            handleBilling(dataUser);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressUser, dataUser, district, emailUser, nameUser, paymentMethod, phoneUser, province, shop]);

    useEffect(() => {
        if (
            nameUser.trim() !== '' &&
            emailUser.trim() !== '' &&
            phoneUser.trim() !== '' &&
            province !== '' &&
            district !== '' &&
            (shop !== '' || addressUser.trim() !== '') &&
            paymentMethod !== ''
        ) {
            setDataUser({
                nameUser: nameUser.trim(),
                emailUser: emailUser.trim(),
                phoneUser: phoneUser.trim(),
                province: province,
                district: district,
                shop: shop,
                addressUser: addressUser.trim(),
                nameCompany: nameCompany.trim(),
                addressCompany: addressCompany.trim(),
                taxCompany: taxCompany.trim(),
                paymentMethod: paymentMethod,
            });
        }
    }, [
        addressCompany,
        addressUser,
        district,
        emailUser,
        nameCompany,
        nameUser,
        paymentMethod,
        phoneUser,
        province,
        shop,
        taxCompany,
    ]);

    useEffect(() => {
        AddressService.getAll()
            .then((res) => {
                setProvinceData(res);
            })
            .catch((error) => {
                return error;
            });
    }, []);

    useEffect(() => {
        AddressService.get({ name: province })
            .then((res) => {
                setDistrictData(res[0].district);
            })
            .catch((error) => {
                return error;
            });
    }, [province]);

    useEffect(() => {
        let data = undefined;
        if (districtData !== undefined) {
            data = districtData.find((d) => {
                return d.name === district;
            });
        }
        if (data !== undefined) {
            setShopData(data.shop);
        }
    }, [district, districtData]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Thông tin thanh toán</div>
            {!userLogin && (
                <div className={cx('content-not-login')}>
                    <p>
                        Đăng nhập ngay để nhận được “điểm thưởng” hấp dẫn khi mua hàng thành công các sản phẩm tại Shop
                    </p>
                    <Link className={cx('login-link-btn')} to={config.routes.login}>
                        Đăng nhập ngay
                    </Link>
                </div>
            )}
            <div className={cx('all-checkout')}>
                <div className={cx('checkout-billing-load')}>
                    <div className={cx('checkout-data')}>
                        <div className={cx('enter-address')}>
                            <div className={cx('inputs', 'input-name')}>
                                <input
                                    placeholder="Tên"
                                    type="text"
                                    id="BillingNewAddress_FirstName"
                                    name="BillingNewAddress.FirstName"
                                    value={nameUser}
                                    onChange={(e) => {
                                        setNameUser(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={cx('inputs', 'input-phone-number')}>
                                <input
                                    placeholder="Số điện thoại"
                                    type="tel"
                                    id="BillingNewAddress_PhoneNumber"
                                    name="BillingNewAddress.PhoneNumber"
                                    value={phoneUser}
                                    onChange={(e) => {
                                        setPhoneUser(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={cx('inputs', 'input-email')}>
                                <input
                                    placeholder="Email"
                                    type="email"
                                    id="BillingNewAddress_Email"
                                    name="BillingNewAddress.Email"
                                    value={emailUser}
                                    onChange={(e) => {
                                        setEmailUser(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={cx('title-receive-method')}>Hình thức nhận hàng</div>
                            <div className={cx('inputs', 'receive-method')}>
                                <input
                                    type="radio"
                                    id="receive-store"
                                    name="receive"
                                    value="0"
                                    defaultChecked
                                    onChange={(e) => {
                                        setReceive(e.target.value);
                                    }}
                                />
                                <label htmlFor="receive-store">Nhận tại cửa hàng</label>
                                <span className={cx('space')}></span>
                                <input
                                    type="radio"
                                    id="receive-home"
                                    name="receive"
                                    value="1"
                                    onChange={(e) => {
                                        setReceive(e.target.value);
                                    }}
                                />
                                <label htmlFor="receive-home">Giao tận nơi</label>
                            </div>
                            <div className={cx('inputs', 'province')}>
                                <label htmlFor="BillingNewAddress_StateProvinceId">Tỉnh, thành phố:</label>
                                <select
                                    data-trigger="state-select"
                                    data-county="#BillingNewAddress_CountyId"
                                    data-loading="#states-loading-progress"
                                    id="BillingNewAddress_StateProvinceId"
                                    name="BillingNewAddress.StateProvinceId"
                                    onChange={(e) => {
                                        setProvince(e.target.value);
                                    }}
                                >
                                    <option value="0">Chọn tỉnh, thành phố</option>
                                    {provinceData.map((res, index) => (
                                        <option key={index} value={res.name}>
                                            {res.name}
                                        </option>
                                    ))}
                                </select>
                                <span
                                    id="states-loading-progress"
                                    style={{ display: 'none' }}
                                    className={cx('please-wait')}
                                >
                                    Chờ đợi...
                                </span>
                                <span></span>
                            </div>
                            <div className={cx('inputs', 'district')}>
                                <label htmlFor="BillingNewAddress_CountyId">Quận, huyện:</label>
                                <select
                                    data-trigger="county-select"
                                    id="BillingNewAddress_CountyId"
                                    name="BillingNewAddress.CountyId"
                                    onChange={(e) => {
                                        setDistrict(e.target.value);
                                    }}
                                >
                                    {districtData !== undefined && (
                                        <>
                                            <option value="0">Mời bạn chọn quận/huyện</option>
                                            {districtData.map((res, index) => (
                                                <option key={index} value={res.name}>
                                                    {res.name}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                                <span
                                    id="states-loading-progress"
                                    style={{ display: 'none' }}
                                    className={cx('please-wait')}
                                >
                                    Chờ đợi...
                                </span>
                                <span></span>
                            </div>
                            <div
                                className={cx('all-receive-store')}
                                style={{ display: receive === '0' ? 'block' : 'none' }}
                            >
                                <div className={cx('choose-area-store')}>
                                    <div className={cx('select-receive-store')}>
                                        <select
                                            autoComplete="on"
                                            name="select_receive_store"
                                            id="js__apply_now"
                                            onChange={(e) => {
                                                setShop(e.target.value);
                                            }}
                                        >
                                            {shopData !== undefined && (
                                                <>
                                                    <option value="0">Mời bạn chọn địa chỉ cửa hàng</option>
                                                    {shopData.map((res, index) => (
                                                        <option key={index} value={res.name}>
                                                            {res.name}
                                                        </option>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={cx('all-receive-home')}
                                style={{ display: receive === '0' ? 'none' : 'block' }}
                            >
                                <div className={cx('inputs', 'home')}>
                                    <label htmlFor="BillingNewAddress_Address1">Địa chỉ cụ thể:</label>
                                    <input
                                        type="text"
                                        id="BillingNewAddress_Address1"
                                        name="BillingNewAddress.Address1"
                                        value={addressUser}
                                        onChange={(e) => setAddressUser(e.target.value)}
                                    />
                                    <span></span>
                                </div>
                            </div>
                            <div className={cx('bill-company')}>
                                <div className={cx('checkbox-bill-company')}>
                                    <input
                                        id="sl_bill_company"
                                        type="checkbox"
                                        name="sl_bill_company"
                                        style={{
                                            display: 'block',
                                            marginRight: '10px',
                                            padding: '0px',
                                            width: '16px',
                                            height: '16px',
                                            color: '#1d1d1f',
                                            verticalAlign: 'middle',
                                            boxSizing: 'border-box',
                                        }}
                                        onChange={() => {
                                            $('#sl_bill_company').is(':checked')
                                                ? setCheckBillCompany(true)
                                                : setCheckBillCompany(false);
                                        }}
                                    />
                                    <label
                                        htmlFor="sl_bill_company"
                                        style={{
                                            color: '#1d1d1f',
                                            marginBottom: '0.5rem',
                                            display: 'inline-block',
                                        }}
                                    >
                                        Xuất hoá đơn công ty
                                    </label>
                                </div>
                                <fieldset
                                    className={cx('answer')}
                                    style={{ display: checkBillCompany ? 'block' : 'none' }}
                                >
                                    <input
                                        type="text"
                                        id="fn_company"
                                        name="fn_company"
                                        placeholder="Tên công ty"
                                        value={nameCompany}
                                        onChange={(e) => {
                                            setNameCompany(e.target.value);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        id="f_add_company"
                                        name="f_add_company"
                                        placeholder="Địa chỉ công ty"
                                        value={addressCompany}
                                        onChange={(e) => {
                                            setAddressCompany(e.target.value);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        id="f_tax_company"
                                        name="f_tax_company"
                                        placeholder="Mã số thuế"
                                        value={taxCompany}
                                        onChange={(e) => {
                                            setTaxCompany(e.target.value);
                                        }}
                                    />
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('checkout-payment-load')}>
                    <div className={cx('payment-method')}>
                        <div className={cx('title-payment')}>Thông tin thanh toán</div>
                        <div className={cx('notice-payment')} style={{ textAlign: 'left' }}>
                            Quý khách vui lòng lựa chọn các hình thức thanh toán dưới đây:
                        </div>
                        <ul className={cx('method-list')}>
                            <li style={{ display: 'block' }}>
                                <div className={cx('method-name')}>
                                    <div className={cx('payment-detail')}>
                                        <div className={cx('align-items-center')}>
                                            <input
                                                id="paymentmethod_0"
                                                type="radio"
                                                name="paymentmethod"
                                                value="Payments.Kredivo"
                                                onChange={(e) => {
                                                    setPaymentMethod(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className={cx('payment-logo')}>
                                            <label htmlFor="paymentmethod_0">
                                                <img
                                                    src="https://shopdunk.com/Plugins/Payments.Kredivo/logo.jpg"
                                                    alt="Thanh toán Kredivo"
                                                    width="36px"
                                                    height="36px"
                                                />
                                            </label>
                                        </div>
                                        <div className={cx('item_paymentmethod')} style={{ width: '100%' }}>
                                            <label htmlFor="paymentmethod_0">Thanh toán Kredivo</label>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li style={{ display: 'block' }}>
                                <div className={cx('method-name')}>
                                    <div className={cx('payment-detail')}>
                                        <div className={cx('align-items-center')}>
                                            <input
                                                id="paymentmethod_0"
                                                type="radio"
                                                name="paymentmethod"
                                                value="Payments..Onepay"
                                                onChange={(e) => {
                                                    setPaymentMethod(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className={cx('payment-logo')}>
                                            <label htmlFor="paymentmethod_0">
                                                <img
                                                    src="https://shopdunk.com/Plugins/Payments.Onepay/logo.jpg"
                                                    alt="Thanh toán OnePay"
                                                    width="36px"
                                                    height="36px"
                                                />
                                            </label>
                                        </div>
                                        <div className={cx('item_paymentmethod')} style={{ width: '100%' }}>
                                            <label htmlFor="paymentmethod_0">Thanh toán OnePay</label>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li style={{ display: 'block' }}>
                                <div className={cx('method-name')}>
                                    <div className={cx('payment-detail')}>
                                        <div className={cx('align-items-center')}>
                                            <input
                                                id="paymentmethod_0"
                                                type="radio"
                                                name="paymentmethod"
                                                value="Payments.Payoo"
                                                onChange={(e) => {
                                                    setPaymentMethod(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className={cx('payment-logo')}>
                                            <label htmlFor="paymentmethod_0">
                                                <img
                                                    src="https://shopdunk.com/Plugins/Payments.Payoo/logo.jpg"
                                                    alt="Thanh toán Payoo"
                                                    width="36px"
                                                    height="36px"
                                                />
                                            </label>
                                        </div>
                                        <div className={cx('item_paymentmethod')} style={{ width: '100%' }}>
                                            <label htmlFor="paymentmethod_0">Thanh toán Payoo</label>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li style={{ display: 'block' }}>
                                <div className={cx('method-name')}>
                                    <div className={cx('payment-detail')}>
                                        <div className={cx('align-items-center')}>
                                            <input
                                                id="paymentmethod_0"
                                                type="radio"
                                                name="paymentmethod"
                                                value="Payments.VietQr"
                                                onChange={(e) => {
                                                    setPaymentMethod(e.target.value);
                                                }}
                                                defaultChecked
                                            />
                                        </div>
                                        <div className={cx('payment-logo')}>
                                            <label htmlFor="paymentmethod_0">
                                                <img
                                                    src="https://shopdunk.com/Plugins/Payments.VietQr/logo.jpg"
                                                    alt="Chuyển khoản ngân hàng"
                                                    width="36px"
                                                    height="36px"
                                                />
                                            </label>
                                        </div>
                                        <div className={cx('item_paymentmethod')} style={{ width: '100%' }}>
                                            <label htmlFor="paymentmethod_0">Chuyển khoản ngân hàng</label>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckBilling;
