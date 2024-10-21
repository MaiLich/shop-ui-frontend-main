import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import config from '~/config';
import TitleTab from '~/components/TitleTab';

const cx = classNames.bind(styles);

function Account() {
    const [View, setView] = useState({ Component: config.viewUser.account });

    const handleView = (e) => {
        setView({ Component: e });
    };

    const [data, setData] = useState({ title: 'Tài khoản của tôi' });

    const handleTitle = (newData) => {
        setData(newData);
    };

    useEffect(() => {
        const pathName = window.location.pathname;
        let index = Object.values(config.routes).findIndex((e) => e === pathName);
        const key = Object.keys(config.routes)[index];
        index = Object.keys(config.viewUser).findIndex((e) => e === key);
        setView({ Component: Object.values(config.viewUser)[index] });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <TitleTab title={data.title} />
            <div className={cx('collumns')}>
                <Sidebar handleView={handleView} handleTitle={handleTitle} />
                <View.Component />
            </div>
        </div>
    );
}

export default Account;
