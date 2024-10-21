import classNames from 'classnames/bind';
import styles from './User.module.scss';
import Account from '~/components/Account';
import Breadcrumb from '~/components/Breadcrumb';

const cx = classNames.bind(styles);

function User() {
    return (
        <div className={cx('wrapper')}>
            <Breadcrumb directive={true} title="Tài khoản của tôi" />
            <Account />
        </div>
    );
}

export default User;
