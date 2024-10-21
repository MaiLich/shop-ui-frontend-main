/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './DeliveryAddress.module.scss';
import { Link } from 'react-router-dom';
import * as DataUserService from '~/services/DataUserService';
import * as AddressService from '~/services/AddressService';
import { useEffect, useState } from 'react';
import { isEmptyObject } from 'jquery';
import config from '~/config';

const cx = classNames.bind(styles);

function DeliveryAddress() {
    const [dataAddress, setDataAddress] = useState([]);
    const [newDataAddress, setNewDataAddress] = useState([]);
    const [shippingAddress, setShippingAddress] = useState(0);
    const [deleteAddress, setDeleteAddress] = useState(0);
    const [popupAddress, setPopupAddress] = useState(false);
    const [dataPopup, setDataPopup] = useState({});
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [provinceData, setProvinceData] = useState([]);
    const [districtData, setDistrictData] = useState(undefined);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        DataUserService.getAddress({ id: token })
            .then((res) => {
                setDataAddress(res);
            })
            .catch((error) => {
                return error;
            });
    }, []);

    useEffect(() => {
        if (shippingAddress !== 0) {
            let data = dataAddress;
            let index = data.findIndex((obj) => obj.setShipping === true);
            if (index !== -1) {
                data[index].setShipping = false;
            }
            if (index === -1 || data[index].id !== shippingAddress) {
                index = data.findIndex((obj) => obj.id === shippingAddress);
                data[index].setShipping = true;
            }
            setNewDataAddress(data);
        }
    }, [dataAddress, shippingAddress]);

    useEffect(() => {
        if (deleteAddress !== 0) {
            let newData = dataAddress.filter((obj) => obj.id !== deleteAddress);
            setNewDataAddress(newData);
        }
    }, [dataAddress, deleteAddress]);

    useEffect(() => {
        if (!isEmptyObject(dataPopup)) {
            if (
                dataPopup.id !== '' &&
                dataPopup.firstName !== '' &&
                dataPopup.lastName !== '' &&
                dataPopup.phoneNumber !== '' &&
                dataPopup.addrStreet !== '' &&
                dataPopup.addrCity !== '' &&
                dataPopup.addrDistrict !== ''
            ) {
                let data = dataAddress;
                let index = data.findIndex((obj) => obj.id === dataPopup.id);
                if (index !== -1) {
                    data[index] = dataPopup;
                    setNewDataAddress(data);
                } else {
                    data.push(dataPopup);
                    setNewDataAddress(data);
                }
            }
        }
    }, [dataAddress, dataPopup]);

    useEffect(() => {
        const handleAddress = async () => {
            if (shippingAddress !== 0 || deleteAddress !== 0 || confirm) {
                const token = localStorage.getItem('token');
                await DataUserService.putAddress({ id: token, deliveryAddress: newDataAddress }).catch((error) => {
                    return error;
                });
                await DataUserService.getAddress({ id: token })
                    .then((res) => {
                        setDataAddress(res);
                    })
                    .catch((error) => {
                        return error;
                    });
                setShippingAddress(0);
                setDeleteAddress(0);
                setConfirm(false);
            }
        };
        handleAddress();
    }, [confirm, deleteAddress, newDataAddress, shippingAddress]);

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-title-wrapper')}>
                <h1 className={cx('page-title')}>
                    <span className={cx('base')} data-ui-id="page-title-wrapper">
                        Địa chỉ giao hàng
                    </span>
                </h1>
                <div className={cx('des')}>Quản lý thông tin địa chỉ giao hàng</div>
            </div>
            <div className={cx('box-address-list')}>
                <div className={cx('block-title')}>
                    <strong>Thêm lối vào địa chỉ</strong>
                </div>
                <div className={cx('box-content')}>
                    <div className={cx('additional-addresses')}>
                        <table
                            className={cx('data', 'table-additional-addresses-items', 'history')}
                            id="additional-addresses-table"
                        >
                            <caption className={cx('table-caption')}>Additional addresses</caption>
                            <thead>
                                <tr>
                                    <th scope="col" className={cx('col', 'firstname')}>
                                        Tên
                                    </th>
                                    <th scope="col" className={cx('col', 'streetaddress')}>
                                        Địa chỉ
                                    </th>
                                    <th scope="col" className={cx('col', 'actions')}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataAddress !== undefined &&
                                    dataAddress.map((data, index) => (
                                        <tr key={index}>
                                            <td data-th="Tên" className={cx('col', 'firstname')}>
                                                {`${data.firstName} ${data.lastName}`}
                                            </td>

                                            <td data-th="Địa chỉ" className={cx('col', 'streetaddress')}>
                                                {`${data.addrStreet}, ${data.addrDistrict}, ${data.addrCity}`}
                                                <div className={cx('phone')}>{data.phoneNumber}</div>
                                            </td>

                                            <td data-th="Thao tác" className={cx('col', 'actions')}>
                                                <div className={cx('addresses-actions')}>
                                                    <div className={cx('set-shipping')}>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    shippingAddress === 0
                                                                        ? data.setShipping
                                                                            ? true
                                                                            : false
                                                                        : shippingAddress === data.id
                                                                        ? true
                                                                        : false
                                                                }
                                                                className={cx('checked-default-address')}
                                                                value={data.id}
                                                                style={{ display: 'block' }}
                                                                onChange={() => {
                                                                    setShippingAddress(data.id);
                                                                }}
                                                            />
                                                            <span>Mặc định</span>
                                                        </label>
                                                    </div>
                                                    <div className={cx('actions-edit')}>
                                                        <a
                                                            className={cx('action', 'edit', 'open-modal-edit-address')}
                                                            data-address={data.id}
                                                            data-addr-name={data.firstName}
                                                            data-addr-telephone={data.phoneNumber}
                                                            data-last-name={data.lastName}
                                                            data-addr-street={data.addrStreet}
                                                            data-addr-city={data.addrCity}
                                                            data-addr-district={data.addrDistrict}
                                                            onClick={() => {
                                                                setPopupAddress(true);
                                                                setFirstName(data.firstName);
                                                                setLastName(data.lastName);
                                                                setPhone(data.phoneNumber);
                                                                setStreet(data.addrStreet);
                                                                setProvince(data.addrCity);
                                                                setDistrict(data.addrDistrict);
                                                                setDataPopup({
                                                                    ...data,
                                                                    firstName: data.firstName,
                                                                    lastName: data.lastName,
                                                                    phoneNumber: data.phoneNumber,
                                                                    addrStreet: data.addrStreet,
                                                                    addrCity: data.addrCity,
                                                                    addrDistrict: data.addrDistrict,
                                                                });
                                                            }}
                                                        >
                                                            <span>Chỉnh sửa</span>
                                                        </a>
                                                        <a
                                                            className={cx('action', 'delete')}
                                                            href="#"
                                                            data-address={data.id}
                                                            onClick={() => {
                                                                setDeleteAddress(data.id);
                                                                setTimeout(() => {
                                                                    window.location.reload();
                                                                }, 500);
                                                            }}
                                                        >
                                                            <span>Xóa</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={cx('customer-addresses-toolbar', 'toolbar', 'bottom')}></div>
                </div>
                <div className={cx('actions-toolbar')}>
                    <div className={cx('primary')}>
                        <button
                            type="button"
                            id="open_modal_add_address"
                            title="Thêm địa chỉ mới"
                            className={cx('action', 'primary', 'add')}
                            onClick={() => {
                                setPopupAddress(true);
                                setFirstName('');
                                setLastName('');
                                setPhone('');
                                setStreet('');
                                setProvince('');
                                setDistrict('');
                                setDataPopup({
                                    id: Math.floor(Math.random() * 10 ** 6),
                                    firstName: '',
                                    lastName: '',
                                    phoneNumber: '',
                                    addrStreet: '',
                                    addrCity: '',
                                    addrDistrict: '',
                                    setShipping: false,
                                });
                            }}
                        >
                            <span>Thêm địa chỉ mới</span>
                        </button>
                    </div>
                </div>
            </div>
            <aside className={cx('modal-popup')} style={{ display: popupAddress ? 'block' : 'none' }}>
                <div className={cx('modal-inner-wrap')}>
                    <header className={cx('modal-header')}>
                        <h1 id="modal-title-93" className={cx('modal-title')} data-role="title">
                            Địa chỉ giao hàng
                        </h1>

                        <button
                            className={cx('action-close')}
                            data-role="closeBtn"
                            type="button"
                            onClick={() => {
                                setPopupAddress(false);
                            }}
                        >
                            <span>Đóng</span>
                        </button>
                    </header>
                    <div className={cx('modal-content')}>
                        <form className={cx('form-address-edit')}>
                            <fieldset className={cx('fieldset')}>
                                <legend className={cx('legend')}>
                                    <span>Thông tin liên hệ</span>
                                </legend>
                                <br />
                                <input name="form_key" type="hidden" defaultValue="XH79YeNbqR4hTC9J" />
                                <input type="hidden" name="success_url" defaultValue="" />
                                <input type="hidden" name="error_url" defaultValue="" />
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
                                                value={firstName}
                                                title="Họ"
                                                className={cx('input-text ', 'required-entry')}
                                                data-validate="{required:true}"
                                                autoComplete="off"
                                                aria-required="true"
                                                onChange={(e) => {
                                                    setFirstName(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className={cx('field', 'field-name-firstname', 'required')}>
                                        <label className={cx('label')} htmlFor="firstname">
                                            <span>Tên</span>
                                        </label>
                                        <div className={cx('control')}>
                                            <input
                                                type="text"
                                                id="firstname"
                                                name="firstname"
                                                value={lastName}
                                                title="Tên"
                                                className={cx('input-text ', 'required-entry')}
                                                data-validate="{required:true}"
                                                autoComplete="off"
                                                aria-required="true"
                                                onChange={(e) => {
                                                    setLastName(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className={cx('fieldset')} id="telephone-address">
                                <div className={cx('field', 'telephone', 'required')}>
                                    <label className={cx('label')} htmlFor="telephone">
                                        <span>Số điện thoại </span>
                                    </label>
                                    <div className={cx('control')}>
                                        <input
                                            type="tel"
                                            name="telephone"
                                            id="telephone"
                                            value={phone}
                                            title="Số điện thoại"
                                            className={cx('input-text', 'validate-phone', 'required-entry')}
                                            data-validate="{required:true, 'validate-telephone-require': true}"
                                            aria-required="true"
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className={cx('message-wrapper')}>
                                        <span
                                            className={cx('otp-result-message')}
                                            id="otp-result-message-register"
                                        ></span>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className={cx('fieldset')}>
                                <legend className={cx('legend')}>
                                    <span>Địa chỉ</span>
                                </legend>
                                <div className={cx('field', 'street', 'required')}>
                                    <label className={cx('label')} htmlFor="street_1">
                                        <span>Địa chỉ</span>
                                    </label>
                                    <div className={cx('control')}>
                                        <input
                                            type="text"
                                            name="street[]"
                                            value={street}
                                            title="Địa chỉ"
                                            placeholder=""
                                            id="street_1"
                                            data-validate="{required:true}"
                                            autoComplete="off"
                                            aria-required="true"
                                            onChange={(e) => {
                                                setStreet(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={cx('field', 'city', 'required')}>
                                    <label className={cx('label')} htmlFor="city_id">
                                        <span>Tỉnh/Thành phố</span>
                                    </label>
                                    <div className={cx('control')}>
                                        <select
                                            id="city_id"
                                            name="city_id"
                                            title="Tỉnh/Thành phố"
                                            className={cx('validate-select', 'district_id')}
                                            required=""
                                            aria-required="true"
                                            onChange={(e) => {
                                                setProvince(e.target.value);
                                            }}
                                        >
                                            <option value="0">
                                                {dataPopup.addrCity !== ''
                                                    ? dataPopup.addrCity
                                                    : 'Chọn tỉnh, thành phố'}
                                            </option>
                                            {provinceData.map((res, index) => (
                                                <option key={index} value={res.name}>
                                                    {res.name}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            name="city"
                                            style={{ display: 'none' }}
                                            defaultValue=""
                                            title="Tỉnh/Thành phố"
                                            placeholder="Tỉnh/Thành phố"
                                            className={cx('input-text', 'required-entry')}
                                            id="city"
                                            autoComplete="off"
                                            aria-required="true"
                                        />
                                    </div>
                                </div>
                                <div className={cx('field', 'district', 'required')}>
                                    <label className={cx('label')} htmlFor="district_id">
                                        <span>Quận/Huyện</span>
                                    </label>
                                    <div className={cx('control')}>
                                        <select
                                            id="district_id"
                                            name="district_id"
                                            title="Quận/Huyện"
                                            className={cx('validate-select', 'district_id')}
                                            required=""
                                            aria-required="true"
                                            onChange={(e) => {
                                                setDistrict(e.target.value);
                                            }}
                                        >
                                            {districtData !== undefined && (
                                                <>
                                                    <option value="0">
                                                        {dataPopup.addrDistrict !== ''
                                                            ? dataPopup.addrDistrict
                                                            : 'Mời bạn chọn quận/huyện'}
                                                    </option>
                                                    {districtData.map((res, index) => (
                                                        <option key={index} value={res.name}>
                                                            {res.name}
                                                        </option>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                        <input
                                            type="text"
                                            id="district"
                                            name="district"
                                            style={{ display: 'none' }}
                                            defaultValue=""
                                            title="Quận/Huyện"
                                            placeholder="Quận/Huyện"
                                            className={cx('input-text')}
                                            autoComplete="off"
                                            aria-required="true"
                                        />
                                    </div>
                                </div>
                            </fieldset>
                            <div className={cx('actions-toolbar')}>
                                <Link className={cx('primary')} to={config.routes.deliveryAddress}>
                                    <button
                                        type="submit"
                                        className={cx('action', 'save', 'primary')}
                                        data-action="save-address"
                                        id="save-address-my-account"
                                        data-address="13501"
                                        title="Xác nhận địa chỉ"
                                        onClick={() => {
                                            if (
                                                firstName.trim() !== '' &&
                                                lastName.trim() !== '' &&
                                                phone.trim() !== '' &&
                                                street.trim() !== ''
                                            ) {
                                                setDataPopup({
                                                    ...dataPopup,
                                                    firstName: firstName,
                                                    lastName: lastName,
                                                    phoneNumber: phone,
                                                    addrStreet: street,
                                                    addrCity: province,
                                                    addrDistrict: district,
                                                });
                                                setConfirm(true);
                                                setFirstName('');
                                                setLastName('');
                                                setPhone('');
                                                setStreet('');
                                                setProvince('');
                                                setDistrict('');
                                                setPopupAddress(false);
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 500);
                                            }
                                        }}
                                    >
                                        <span>Xác nhận địa chỉ</span>
                                    </button>
                                </Link>
                                <div className={cx('secondary')} style={{ display: 'none' }}>
                                    <Link className={cx('action', 'back')}>
                                        <span>Quay lại</span>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default DeliveryAddress;
