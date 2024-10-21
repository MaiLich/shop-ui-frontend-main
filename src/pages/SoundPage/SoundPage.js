import classNames from 'classnames/bind';
import styles from './SoundPage.module.scss';
import Product from '~/components/Products';
import config from '~/config';
import * as SoundService from '~/services/SoundService';
import * as SeriesService from '~/services/SeriesService';
import { useState, useEffect } from 'react';
import TitleTab from '~/components/TitleTab';

const cx = classNames.bind(styles);

function SoundPage() {
    const [data, setData] = useState({ title: 'Âm thanh' });
    const path = window.location.pathname;
    useEffect(() => {
        SeriesService.getTitle({ name: 'Âm thanh', path: path.slice(1, path.length) })
            .then((res) => {
                setData({ title: res.title === undefined ? 'Âm thanh' : res.title });
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
                nameService={SoundService}
                directive={true}
                title={data.title}
                idName="Âm thanh"
                path={config.routes.soundpage}
                onChangeView={handleView}
            />
        </div>
    );
}

export default SoundPage;
