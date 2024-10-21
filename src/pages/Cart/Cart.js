import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import CartUser from '~/components/CartUser';

const cx = classNames.bind(styles);

function Cart() {
    return (
        <div className={cx('wrapper')}>
            <CartUser />
        </div>
    );
}

export default Cart;
