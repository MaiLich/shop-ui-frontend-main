import classNames from 'classnames/bind';
import styles from './Mac.module.scss';
import Product from '~/components/Products';
import config from '~/config';
import * as MacService from '~/services/MacService';
import * as SeriesService from '~/services/SeriesService';
import { useEffect, useState } from 'react';
import TitleTab from '~/components/TitleTab';

const cx = classNames.bind(styles);

function Mac() {
    const [data, setData] = useState({ title: 'Mac' });
    const path = window.location.pathname;
    useEffect(() => {
        SeriesService.getTitle({ name: 'Mac', path: path.slice(1, path.length) })
            .then((res) => {
                setData({ title: res.title === undefined ? 'Mac' : res.title });
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
                nameService={MacService}
                directive={true}
                title={data.title}
                idName="Mac"
                path={config.routes.mac}
                onChangeView={handleView}
            />
        </div>
    );
}

export default Mac;
