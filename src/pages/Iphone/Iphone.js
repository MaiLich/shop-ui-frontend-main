import classNames from 'classnames/bind';
import styles from './Iphone.module.scss';
import Product from '~/components/Products';
import config from '~/config';
import * as IphoneService from '~/services/IphoneService';
import * as SeriesService from '~/services/SeriesService';
import { useState, useEffect } from 'react';
import TitleTab from '~/components/TitleTab';

const cx = classNames.bind(styles);

function Iphone() {
    const [data, setData] = useState({ title: 'iPhone' });
    const path = window.location.pathname;
    useEffect(() => {
        SeriesService.getTitle({ name: 'iPhone', path: path.slice(1, path.length) })
            .then((res) => {
                setData({ title: res.title === undefined ? 'iPhone' : res.title });
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
                nameService={IphoneService}
                directive={true}
                title={data.title}
                idName="iPhone"
                path={config.routes.iphone}
                onChangeView={handleView}
            />
        </div>
    );
}

export default Iphone;
