import classNames from 'classnames/bind';
import styles from './CartFooter.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as BillingService from '~/services/BillingService';
import $ from 'jquery';

const cx = classNames.bind(styles);

function CartFooter({ totalAll, billing, data, handleLoading }) {
    const [total, setTotal] = useState('0');
    const [checkout, setCheckout] = useState(false);
    const [note, setNote] = useState(false);
    const [reloading, setReloading] = useState(false);
    useEffect(() => {
        let totalString = totalAll.toString();
        let x = '';
        let totalResult = '';
        let i = totalString.length;
        while (totalString !== '') {
            if (x !== '') {
                totalResult = '.' + totalResult;
            }
            if (i < 3) {
                x = totalString.slice(0, i);
                totalString = '';
            } else {
                x = totalString.slice(i - 3, i);
                i -= 3;
                totalString = totalString.slice(0, i);
            }

            totalResult = x + totalResult;
        }
        totalResult = totalResult + '₫';
        setTotal(totalResult);
    }, [totalAll]);
    useEffect(() => {
        if (checkout === true) {
            setCheckout(false);
            const sessionID = JSON.parse(localStorage.getItem('sessionID'));
            BillingService.post({ dataUser: billing, dataProduct: data, total: total, sessionID: sessionID }).catch(
                (error) => {
                    return error;
                },
            );
        }
    }, [billing, checkout, data, total]);
    const handleReload = () => {
        if (!reloading) {
            setReloading(true);
            handleLoading(1);
            setTimeout(() => {
                if ($('#termsofservice').is(':checked')) {
                    setCheckout(true);
                    setNote(false);
                    localStorage.removeItem('dataItems');
                    localStorage.removeItem('quantity');
                    window.location.reload();
                } else {
                    setNote(true);
                    handleLoading(0);
                    setReloading(false);
                }
            }, 2000);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar-cart')}>
                <div className={cx('collaterals')}>
                    <div className={cx('deal')}>
                        <div className={cx('coupon-box')}>
                            <div className={cx('title')}>
                                <strong>Mã giảm giá</strong>
                            </div>
                            <div className={cx('hint')}>Nhập phiếu giảm giá của bạn tại đây</div>
                            <div className={cx('coupon-code')}>
                                <input
                                    name="discountcouponcode"
                                    id="discountcouponcode"
                                    placeholder="Mã giảm giá"
                                    type="text"
                                    className={cx('discount-coupon-code')}
                                    aria-label="Nhập mã phiếu giảm giá"
                                />
                                <button
                                    type="submit"
                                    name="applydiscountcouponcode"
                                    id="applydiscountcouponcode"
                                    className={cx('apply-discount-coupon-code-button')}
                                >
                                    Áp dụng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('totals')}>
                    <div className={cx('total-info')}>
                        <table className={cx('cart-total')}>
                            <tbody>
                                <tr className={cx('order-subtotal')}>
                                    <td className={cx('cart-total-left')}>
                                        <label>Tổng phụ:</label>
                                    </td>
                                    <td className={cx('cart-total-right')}>
                                        <span className={cx('value-summary')}>{total}</span>
                                    </td>
                                </tr>
                                <tr className={cx('order-total')}>
                                    <td className={cx('cart-total-left')}>
                                        <label>Tổng cộng:</label>
                                    </td>
                                    <td className={cx('cart-total-right')}>
                                        <span className={cx('value-summary')}>{total}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={cx('terms-of-service')}>
                        <div className={cx('d-flex')}>
                            <div>
                                <input
                                    id="termsofservice"
                                    type="checkbox"
                                    name="termsofservice"
                                    style={{
                                        display: 'block',
                                        marginRight: '10px',
                                        padding: '0px',
                                        width: '18px',
                                        height: '18px',
                                        color: '#1d1d1f',
                                        verticalAlign: 'middle',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <label
                                htmlFor="termsofservice"
                                style={{
                                    color: '#1d1d1f',
                                    marginBottom: '0.5rem',
                                    display: 'inline-block',
                                }}
                            >
                                <span className={cx('rule-web')}>Tôi đã đọc và đồng ý với</span>
                                <Link className={cx('read')}>điều khoản và điều kiện</Link>
                                <span className={cx('rule-web')}>của website</span>
                            </label>
                        </div>
                    </div>
                    <div className={cx('checkout-buttons')}>
                        <button
                            type="submit"
                            id="checkout"
                            name="checkout"
                            value="checkout"
                            className={cx('checkout-button')}
                            onClick={() => {
                                handleReload();
                            }}
                        >
                            Tiến hành đặt hàng
                        </button>
                    </div>
                    {note && (
                        <div className={cx('note-ck')}>
                            (*) Quý khách vui lòng đồng ý với điều khoản và dịch vụ của website.
                        </div>
                    )}
                    <div className={cx('note-ck')}>(*) Phí phụ thu sẽ được tính khi bạn tiến hành thanh toán.</div>
                    <div className={cx('addon-buttons')}></div>
                </div>
            </div>
        </div>
    );
}

export default CartFooter;
