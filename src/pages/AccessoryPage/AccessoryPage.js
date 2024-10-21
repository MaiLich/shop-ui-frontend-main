import classNames from 'classnames/bind';
import styles from './AccessoryPage.module.scss';
import Product from '~/components/Products';
import config from '~/config';
import * as AccessoryService from '~/services/AccessoryService';
import * as SeriesService from '~/services/SeriesService';
import { useState, useEffect } from 'react';
import TitleTab from '~/components/TitleTab';

const cx = classNames.bind(styles);

function SoundPage() {
    const [data, setData] = useState({ title: 'Phụ kiện' });
    const path = window.location.pathname;
    useEffect(() => {
        SeriesService.getTitle({ name: 'Phụ kiện', path: path.slice(1, path.length) })
            .then((res) => {
                setData({ title: res.title === undefined ? 'Phụ kiện' : res.title });
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
                nameService={AccessoryService}
                directive={true}
                title={data.title}
                idName="Phụ kiện"
                path={config.routes.accessorypage}
                onChangeView={handleView}
            />
        </div>
    );
}

export default SoundPage;
