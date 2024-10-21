import classNames from 'classnames/bind';
import styles from './CartUser.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import CartDetail from './component/CartDetail';
import CheckBilling from './component/CheckBilling';
import CartFooter from './component/CartFooter';
import Loader from '~/components/Loader';
import { useEffect, useState } from 'react';
import TitleTab from '~/components/TitleTab';

const cx = classNames.bind(styles);

function CartUser() {
    const [data, setData] = useState([]);
    const [dataItems, setDataItems] = useState(localStorage.getItem('dataItems'));
    const [totalAll, setTotalAll] = useState(0);
    const [loading, setLoading] = useState(0);
    const [billing, setBilling] = useState({});
    const [userLogin, setUserLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            setUserLogin(true);
        }

        window.addEventListener('storage', handleLocalStorageChange);
        return () => {
            window.removeEventListener('storage', handleLocalStorageChange);
        };
    }, []);

    useEffect(() => {
        if (dataItems !== null) {
            const JSONData = JSON.parse(dataItems);
            setData(JSONData);

            let total = 0;
            let quantity = 0;
            JSONData.forEach((element) => {
                total += element.totalItem;
                quantity += element.quantity;
            });
            setTotalAll(total);
            localStorage.setItem('quantity', JSON.stringify(quantity));
        } else {
            localStorage.removeItem('quantity');
        }
        if (localStorage.getItem('clickButton') !== null) {
            window.location.reload();
            localStorage.removeItem('clickButton');
        }
    }, [dataItems]);

    const handleView = (e) => {
        setDataItems(e);
    };

    const handleLoading = (e) => {
        setLoading(e);
    };

    const handleBilling = (e) => {
        setBilling(e);
    };

    const handleLocalStorageChange = (event) => {
        if (event.key === 'token') {
            const token = localStorage.getItem('token');
            if (token !== null) {
                setUserLogin(true);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <TitleTab title={'Giỏ hàng'} />
            {loading === 1 && <Loader />}
            <Breadcrumb directive={true} title="Giỏ hàng" />
            <div className={cx('inner')}>
                {dataItems === null ? (
                    <div className={cx('no-data')}>Giỏ hàng của bạn đang trống!</div>
                ) : (
                    <div className={cx('order-content')}>
                        <div className={cx('form')}>
                            <div className={cx('shoping-cart-inf')}>
                                <CartDetail dataItems={data} handleView={handleView} handleLoading={handleLoading} />
                                <CheckBilling handleBilling={handleBilling} userLogin={userLogin} />
                            </div>
                            <div className={cx('row')}>
                                <CartFooter
                                    totalAll={totalAll}
                                    billing={billing}
                                    data={data}
                                    handleLoading={handleLoading}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartUser;
