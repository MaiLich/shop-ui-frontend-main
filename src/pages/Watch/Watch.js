import classNames from 'classnames/bind';
import styles from './Watch.module.scss';
import Product from '~/components/Products';
import config from '~/config';
import * as WatchService from '~/services/WatchService';
import * as SeriesService from '~/services/SeriesService';
import { useState, useEffect } from 'react';
import TitleTab from '~/components/TitleTab';

const cx = classNames.bind(styles);

function Watch() {
    const [data, setData] = useState({ title: 'Watch' });
    const path = window.location.pathname;
    useEffect(() => {
        SeriesService.getTitle({ name: 'Watch', path: path.slice(1, path.length) })
            .then((res) => {
                setData({ title: res.title === undefined ? 'Watch' : res.title });
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
                nameService={WatchService}
                directive={true}
                title={data.title}
                idName="Watch"
                path={config.routes.watch}
                onChangeView={handleView}
            />
        </div>
    );
}

export default Watch;
