import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import { useEffect, useState } from 'react';

import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

import * as BannerHome from '~/services/BannerHomeService';

const cx = classNames.bind(styles);
var timeOut;

function Banner() {
    const [item, setItem] = useState(1);
    const [linkItem, setLinkItem] = useState(
        'https://shopdunk.com/images/uploaded/Home%20banner%20T7%202023/banner%20iphone%2014%20Pro%20Max%20PC7.jpg',
    );

    useEffect(() => {
        BannerHome.getBannerHome({ id: item })
            .then((data) => {
                setLinkItem(data[0].link);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [item]);

    const handleViewLeft = () => {
        if (item > 1) {
            setItem(item - 1);
        } else {
            setItem(6);
        }
    };

    const handleViewRight = () => {
        if (item < 6) {
            setItem(item + 1);
        } else {
            setItem(1);
        }
    };

    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        if (item < 6) {
            setItem(item + 1);
        } else {
            setItem(1);
        }
    }, 5000);

    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon className={cx('left-btn')} onClick={handleViewLeft} icon={faCircleChevronLeft} />
            <Image className={cx('image')} src={linkItem} />
            <FontAwesomeIcon className={cx('right-btn')} onClick={handleViewRight} icon={faCircleChevronRight} />
        </div>
    );
}

export default Banner;
