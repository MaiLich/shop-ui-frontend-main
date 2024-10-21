import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import styles from './BannerSmall.module.scss';
import { useEffect, useState } from 'react';
import * as BannerSmallService from '~/services/BannerSmallHomeService';

const cx = classNames.bind(styles);

function BannerSmall() {
    const [dataResult, setDataResult] = useState([]);
    useEffect(() => {
        BannerSmallService.getBannerSmallHome()
            .then((data) => {
                setDataResult(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className={cx('wrapper')}>
            {dataResult.map((data) => (
                <Link key={data.id} className={cx('banner-link')} to={data.path}>
                    <Image className={cx('banner-img')} src={data.link} alt="" />
                </Link>
            ))}
        </div>
    );
}

export default BannerSmall;
