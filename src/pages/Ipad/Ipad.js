import classNames from 'classnames/bind';
import styles from './Ipad.module.scss';
import Product from '~/components/Products';
import config from '~/config';
import * as IpadService from '~/services/IpadService';
import * as SeriesService from '~/services/SeriesService';
import { useState, useEffect } from 'react';
import TitleTab from '~/components/TitleTab';

const cx = classNames.bind(styles);

function Ipad() {
    const [data, setData] = useState({ title: 'iPad' });
    const path = window.location.pathname;
    useEffect(() => {
        SeriesService.getTitle({ name: 'iPad', path: path.slice(1, path.length) })
            .then((res) => {
                setData({ title: res.title === undefined ? 'iPad' : res.title });
            })
            .catch((error) => {
                return error;
            });
    }, [path]);
    const handleView = (newData) => {
        setData(newData);
    };
    return (
        <div className={cx('wrapper')}>
            <TitleTab title={data.title} />
            <Product
                nameService={IpadService}
                directive={true}
                title={data.title}
                idName="iPad"
                path={config.routes.ipad}
                onChangeView={handleView}
            />
        </div>
    );
}

export default Ipad;
